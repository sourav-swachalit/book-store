"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, toDecimal } from "./_helpers";

type AddToCartInput = { bookId: string; quantity?: number };

export async function getCart(userId?: string) {
	try {
		const uid = userId ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");

		const cart = await prisma.cart.findUnique({
			where: { userId: uid },
			include: { items: { include: { book: { include: { images: true, inventory: true } } } } },
		});

		return ok(cart ?? { items: [] });
	} catch (err) {
		return fail("Get cart failed", err);
	}
}

export async function addToCart(payload: AddToCartInput) {
	try {
		const uid = await getCurrentUserId();
		if (!uid) return fail("Unauthorized");
		const qty = Math.max(1, Math.floor(payload.quantity ?? 1));

		const book = await prisma.book.findUnique({ where: { id: payload.bookId }, include: { inventory: true } });
		if (!book) return fail("Book not found");

		if (book.inventory && book.inventory.stock - book.inventory.reserved < qty) return fail("Insufficient stock");

		const cart = await prisma.cart.upsert({ where: { userId: uid }, create: { userId: uid }, update: {} });

		// merge quantities
		const existing = await prisma.cartItem.findUnique({ where: { cartId_bookId: { cartId: cart.id, bookId: payload.bookId } } }).catch(() => null);

		if (existing) {
			const newQty = existing.quantity + qty;
			await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: newQty } });
		} else {
			await prisma.cartItem.create({ data: { cartId: cart.id, bookId: payload.bookId, quantity: qty } });
		}

		return ok(null, "Added to cart");
	} catch (err) {
		return fail("Add to cart failed", err);
	}
}

export async function removeFromCart(bookId: string) {
	try {
		const uid = await getCurrentUserId();
		if (!uid) return fail("Unauthorized");

		const cart = await prisma.cart.findUnique({ where: { userId: uid } });
		if (!cart) return fail("Cart not found");

		await prisma.cartItem.deleteMany({ where: { cartId: cart.id, bookId } });
		return ok(null, "Removed from cart");
	} catch (err) {
		return fail("Remove from cart failed", err);
	}
}

export async function updateCartQuantity(bookId: string, quantity: number) {
	try {
		const uid = await getCurrentUserId();
		if (!uid) return fail("Unauthorized");
		const qty = Math.max(0, Math.floor(quantity));

		const cart = await prisma.cart.findUnique({ where: { userId: uid } });
		if (!cart) return fail("Cart not found");

		const item = await prisma.cartItem.findUnique({ where: { cartId_bookId: { cartId: cart.id, bookId } } });
		if (!item) return fail("Item not found in cart");

		if (qty === 0) {
			await prisma.cartItem.delete({ where: { id: item.id } });
			return ok(null, "Item removed");
		}

		// check inventory
		const book = await prisma.book.findUnique({ where: { id: bookId }, include: { inventory: true } });
		if (!book) return fail("Book not found");
		if (book.inventory && book.inventory.stock - book.inventory.reserved < qty) return fail("Insufficient stock");

		await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: qty } });
		return ok(null, "Quantity updated");
	} catch (err) {
		return fail("Update cart quantity failed", err);
	}
}

export async function clearCart() {
	try {
		const uid = await getCurrentUserId();
		if (!uid) return fail("Unauthorized");
		const cart = await prisma.cart.findUnique({ where: { userId: uid } });
		if (!cart) return ok(null, "Cart already empty");
		await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
		return ok(null, "Cart cleared");
	} catch (err) {
		return fail("Clear cart failed", err);
	}
}