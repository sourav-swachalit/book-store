"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

export async function createCoupon(data: { code: string; discount: number; expiry: Date; active?: boolean }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const created = await prisma.coupon.create({ data: { code: data.code, discount: String(data.discount), expiry: data.expiry, active: data.active ?? true } });
		return ok(created, "Coupon created");
	} catch (err) {
		return fail("Create coupon failed", err);
	}
}

export async function updateCoupon(id: string, data: Partial<{ code: string; discount: number; expiry: Date; active: boolean }>) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const payload: any = {};
		if (data.code !== undefined) payload.code = data.code;
		if (data.discount !== undefined) payload.discount = String(data.discount);
		if (data.expiry !== undefined) payload.expiry = data.expiry;
		if (data.active !== undefined) payload.active = data.active;
		const updated = await prisma.coupon.update({ where: { id }, data: payload });
		return ok(updated, "Coupon updated");
	} catch (err) {
		return fail("Update coupon failed", err);
	}
}

export async function deleteCoupon(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		await prisma.coupon.delete({ where: { id } });
		return ok(null, "Coupon deleted");
	} catch (err) {
		return fail("Delete coupon failed", err);
	}
}

export async function getCoupon(codeOrId: string) {
	try {
		const c = await prisma.coupon.findFirst({ where: { OR: [{ id: codeOrId }, { code: codeOrId }] } });
		if (!c) return fail("Not found");
		return ok(c);
	} catch (err) {
		return fail("Get coupon failed", err);
	}
}

export async function getCoupons() {
	try {
		const items = await prisma.coupon.findMany({ orderBy: { expiry: "asc" } });
		return ok(items);
	} catch (err) {
		return fail("Get coupons failed", err);
	}
}

export async function validateCoupon(code: string) {
	try {
		const coupon = await prisma.coupon.findUnique({ where: { code } });
		if (!coupon) return fail("Invalid coupon");
		if (!coupon.active) return fail("Coupon inactive");
		if (coupon.expiry < new Date()) return fail("Coupon expired");
		// usage count
		const usage = await prisma.order.count({ where: { couponId: coupon.id } });
		return ok({ coupon, usage });
	} catch (err) {
		return fail("Validate coupon failed", err);
	}
}