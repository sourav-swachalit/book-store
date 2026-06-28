"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

export async function createInventory(bookId: string, data: { stock: number; sku: string }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const inv = await prisma.inventory.create({ data: { bookId, stock: data.stock, sku: data.sku } });
		return ok(inv, "Inventory created");
	} catch (err) {
		return fail("Create inventory failed", err);
	}
}

export async function updateInventory(id: string, data: { stock?: number; sku?: string }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const updated = await prisma.inventory.update({ where: { id }, data });
		return ok(updated, "Inventory updated");
	} catch (err) {
		return fail("Update inventory failed", err);
	}
}

export async function increaseStock(bookId: string, amount: number) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const inv = await prisma.inventory.findUnique({ where: { bookId } });
		if (!inv) return fail("Inventory not found");
		const updated = await prisma.inventory.update({ where: { id: inv.id }, data: { stock: inv.stock + Math.max(0, amount) } });
		return ok(updated, "Stock increased");
	} catch (err) {
		return fail("Increase stock failed", err);
	}
}

export async function decreaseStock(bookId: string, amount: number) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const inv = await prisma.inventory.findUnique({ where: { bookId } });
		if (!inv) return fail("Inventory not found");
		const newStock = Math.max(0, inv.stock - Math.max(0, amount));
		const updated = await prisma.inventory.update({ where: { id: inv.id }, data: { stock: newStock } });
		return ok(updated, "Stock decreased");
	} catch (err) {
		return fail("Decrease stock failed", err);
	}
}

export async function reserveStock(bookId: string, quantity: number) {
	try {
		const inv = await prisma.inventory.findUnique({ where: { bookId } });
		if (!inv) return fail("Inventory not found");
		if (inv.stock - inv.reserved < quantity) return fail("Insufficient available stock to reserve");
		const updated = await prisma.inventory.update({ where: { id: inv.id }, data: { reserved: inv.reserved + quantity } });
		return ok(updated, "Stock reserved");
	} catch (err) {
		return fail("Reserve stock failed", err);
	}
}

export async function releaseReservedStock(bookId: string, quantity: number) {
	try {
		const inv = await prisma.inventory.findUnique({ where: { bookId } });
		if (!inv) return fail("Inventory not found");
		const newReserved = Math.max(0, inv.reserved - quantity);
		const updated = await prisma.inventory.update({ where: { id: inv.id }, data: { reserved: newReserved } });
		return ok(updated, "Reserved stock released");
	} catch (err) {
		return fail("Release reserved stock failed", err);
	}
}

export async function getInventory(bookId?: string) {
	try {
		if (bookId) {
			const inv = await prisma.inventory.findUnique({ where: { bookId } });
			return ok(inv);
		}
		const all = await prisma.inventory.findMany({ include: { book: true } });
		return ok(all);
	} catch (err) {
		return fail("Get inventory failed", err);
	}
}