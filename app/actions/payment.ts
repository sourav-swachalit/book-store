"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail } from "./_helpers";

// This is a simple payment abstraction. Integrations (Stripe/Razorpay) can be
// plugged in where noted.

export async function createPayment(orderId: string, method: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		const order = await prisma.order.findUnique({ where: { id: orderId } });
		if (!order || order.userId !== userId) return fail("Order not found or access denied");

		// create payment record
		const payment = await prisma.payment.create({ data: { orderId, method: method as any, amount: String(order.finalAmount), status: "PENDING" } });

		// Here you'd call external provider and return client data (clientSecret, redirectUrl, etc.)
		// For now we return the payment record and a placeholder clientPayload
		return ok({ payment, clientPayload: { provider: "mock", info: "use test provider" } });
	} catch (err) {
		return fail("Create payment failed", err);
	}
}

export async function updatePaymentStatus(orderId: string, status: string, transactionId?: string) {
	try {
		// called by webhook or server action after provider callback
		const payment = await prisma.payment.updateMany({ where: { orderId }, data: { status: status as any, transactionId } });
		if (status === "SUCCESS") {
			await prisma.order.update({ where: { id: orderId }, data: { status: "CONFIRMED" } });
		}
		return ok(payment, "Payment updated");
	} catch (err) {
		return fail("Update payment failed", err);
	}
}

export async function refundPayment(orderId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const order = await prisma.order.findUnique({ where: { id: orderId } });
		if (!order) return fail("Order not found");
		if (order.userId !== userId) return fail("Access denied");

		const payment = await prisma.payment.updateMany({ where: { orderId, status: "SUCCESS" }, data: { status: "REFUNDED" } });
		return ok(payment, "Refund processed (mock)");
	} catch (err) {
		return fail("Refund failed", err);
	}
}

export async function getPayment(orderId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const pm = await prisma.payment.findUnique({ where: { orderId } });
		if (!pm) return fail("Not found");
		return ok(pm);
	} catch (err) {
		return fail("Get payment failed", err);
	}
}