"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

export async function createShipment(orderId: string, data: { courier?: string; trackingNumber?: string }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const exists = await prisma.order.findUnique({ where: { id: orderId } });
		if (!exists) return fail("Order not found");
		const shipment = await prisma.shipment.create({ data: { orderId, courier: data.courier, trackingNumber: data.trackingNumber } });
		return ok(shipment, "Shipment created");
	} catch (err) {
		return fail("Create shipment failed", err);
	}
}

export async function updateTracking(shipmentId: string, trackingNumber: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const sh = await prisma.shipment.update({ where: { id: shipmentId }, data: { trackingNumber } });
		return ok(sh, "Tracking updated");
	} catch (err) {
		return fail("Update tracking failed", err);
	}
}

export async function markShipped(shipmentId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const shipped = await prisma.shipment.update({ where: { id: shipmentId }, data: { shippedAt: new Date() } });
		// update order status
		await prisma.order.update({ where: { id: shipped.orderId }, data: { status: "SHIPPED" } });
		return ok(shipped, "Marked shipped");
	} catch (err) {
		return fail("Mark shipped failed", err);
	}
}

export async function markDelivered(shipmentId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const delivered = await prisma.shipment.update({ where: { id: shipmentId }, data: { deliveredAt: new Date() } });
		await prisma.order.update({ where: { id: delivered.orderId }, data: { status: "DELIVERED" } });
		return ok(delivered, "Marked delivered");
	} catch (err) {
		return fail("Mark delivered failed", err);
	}
}

export async function getShipment(orderIdOrId: string) {
	try {
		const s = await prisma.shipment.findFirst({ where: { OR: [{ id: orderIdOrId }, { orderId: orderIdOrId }] }, include: { order: true } });
		if (!s) return fail("Not found");
		return ok(s);
	} catch (err) {
		return fail("Get shipment failed", err);
	}
}