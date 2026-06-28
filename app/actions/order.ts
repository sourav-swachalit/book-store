"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, toDecimal, isAdmin } from "./_helpers";

type CreateOrderInput = { addressId: string; paymentMethod: string; couponCode?: string };

export async function createOrder(input: CreateOrderInput) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		// fetch cart
		const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { book: { include: { inventory: true } } } } } });
		if (!cart || cart.items.length === 0) return fail("Cart empty");

		// validate address
		const address = await prisma.address.findUnique({ where: { id: input.addressId } });
		if (!address || address.userId !== userId) return fail("Invalid address");

		// validate items and calculate totals
		let total = 0;
		for (const it of cart.items) {
			const book = it.book;
			if (!book) return fail("Book not found");
			const inv = book.inventory;
			if (inv && inv.stock < it.quantity) return fail(`Out of stock: ${book.title}`);
			const price = Number(book.discountPrice ?? book.price);
			total += price * it.quantity;
		}

		let discount = 0;
		let coupon = null as any;
		if (input.couponCode) {
			coupon = await prisma.coupon.findUnique({ where: { code: input.couponCode } });
			if (!coupon) return fail("Invalid coupon");
			if (!coupon.active) return fail("Coupon inactive");
			if (coupon.expiry < new Date()) return fail("Coupon expired");
			discount = Number(coupon.discount);
		}

		const finalAmount = Math.max(0, total - discount);

		// transaction: create order, items, payment, deduct inventory, clear cart
		const result = await prisma.$transaction(async (tx) => {
			const order = await tx.order.create({
				data: {
					userId,
					addressId: input.addressId,
					couponId: coupon?.id ?? null,
					total: String(total),
					discount: String(discount),
					finalAmount: String(finalAmount),
				},
			});

			const items = [] as any[];
			for (const it of cart.items) {
				const price = String(Number(it.book.discountPrice ?? it.book.price));
				const oi = await tx.orderItem.create({ data: { orderId: order.id, bookId: it.bookId, quantity: it.quantity, price } });
				items.push(oi);

				// deduct inventory
				const inv = await tx.inventory.findUnique({ where: { bookId: it.bookId } });
				if (inv) {
					if (inv.stock < it.quantity) throw new Error(`Insufficient stock for ${it.bookId}`);
					await tx.inventory.update({ where: { id: inv.id }, data: { stock: inv.stock - it.quantity } });
				}
			}

			// create payment record pending
			const payment = await tx.payment.create({ data: { orderId: order.id, method: input.paymentMethod as any, status: "PENDING", amount: String(finalAmount) } });

			// clear cart
			await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

			return { order, items, payment };
		});

		return ok(result, "Order created");
	} catch (err: any) {
		return fail("Create order failed", err?.message ?? err);
	}
}

export async function getOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const order = await prisma.order.findUnique({ where: { id }, include: { items: { include: { book: true } }, payment: true, shipment: true, address: true } });
		if (!order) return fail("Not found");
		if (order.userId !== userId && !(await isAdmin(userId))) return fail("Access denied");
		return ok(order);
	} catch (err) {
		return fail("Get order failed", err);
	}
}

export async function getOrders({ page = 1, limit = 50 } = {}) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const take = Math.min(200, limit);
		const skip = (page - 1) * take;
		const [items, total] = await Promise.all([
			prisma.order.findMany({ skip, take, include: { items: true, payment: true, shipment: true }, orderBy: { createdAt: "desc" } }),
			prisma.order.count(),
		]);
		return ok({ items, total, page, limit: take });
	} catch (err) {
		return fail("Get orders failed", err);
	}
}

export async function getUserOrders(userId?: string) {
	try {
		const uid = userId ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");
		const orders = await prisma.order.findMany({ where: { userId: uid }, include: { items: { include: { book: true } }, payment: true, shipment: true }, orderBy: { createdAt: "desc" } });
		return ok(orders);
	} catch (err) {
		return fail("Get user orders failed", err);
	}
}

export async function cancelOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
		if (!order) return fail("Order not found");
		if (order.userId !== userId && !(await isAdmin(userId))) return fail("Access denied");
		if (order.status === "SHIPPED" || order.status === "DELIVERED") return fail("Cannot cancel shipped/delivered orders");

		await prisma.$transaction(async (tx) => {
			await tx.order.update({ where: { id }, data: { status: "CANCELLED" } });
			// refund payment if any
			await tx.payment.updateMany({ where: { orderId: id, status: "SUCCESS" }, data: { status: "REFUNDED" } });
			// restore inventory
			for (const it of order.items) {
				const inv = await tx.inventory.findUnique({ where: { bookId: it.bookId } });
				if (inv) await tx.inventory.update({ where: { id: inv.id }, data: { stock: inv.stock + it.quantity } });
			}
		});

		return ok(null, "Order cancelled");
	} catch (err) {
		return fail("Cancel order failed", err);
	}
}

export async function confirmOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const order = await prisma.order.update({ where: { id }, data: { status: "CONFIRMED" } });
		return ok(order, "Order confirmed");
	} catch (err) {
		return fail("Confirm order failed", err);
	}
}

export async function packOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const order = await prisma.order.update({ where: { id }, data: { status: "PACKED" } });
		return ok(order, "Order packed");
	} catch (err) {
		return fail("Pack order failed", err);
	}
}

export async function shipOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const order = await prisma.order.update({ where: { id }, data: { status: "SHIPPED" } });
		return ok(order, "Order shipped");
	} catch (err) {
		return fail("Ship order failed", err);
	}
}

export async function deliverOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const order = await prisma.order.update({ where: { id }, data: { status: "DELIVERED" } });
		return ok(order, "Order delivered");
	} catch (err) {
		return fail("Deliver order failed", err);
	}
}

export async function returnOrder(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const order = await prisma.order.findUnique({ where: { id } });
		if (!order) return fail("Order not found");
		if (order.userId !== userId && !(await isAdmin(userId))) return fail("Access denied");
		await prisma.order.update({ where: { id }, data: { status: "RETURNED" } });
		return ok(null, "Order marked returned");
	} catch (err) {
		return fail("Return order failed", err);
	}
}

export async function updateOrderStatus(id: string, status: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const updated = await prisma.order.update({ where: { id }, data: { status: status as any } });
		return ok(updated, "Order status updated");
	} catch (err) {
		return fail("Update order status failed", err);
	}
}