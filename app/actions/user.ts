"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

export async function getUser(id?: string) {
	try {
		const uid = id ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");
		const user = await prisma.user.findUnique({ where: { id: uid }, select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, image: true } });
		if (!user) return fail("Not found");
		return ok(user);
	} catch (err) {
		return fail("Get user failed", err);
	}
}

export async function getUsers({ page = 1, limit = 50 } = {}) {
	try {
		const uid = await getCurrentUserId();
		if (!uid || !(await isAdmin(uid))) return fail("Unauthorized");
		const take = Math.min(200, limit);
		const skip = (page - 1) * take;
		const [items, total] = await Promise.all([
			prisma.user.findMany({ skip, take, select: { id: true, name: true, email: true, role: true, isActive: true } }),
			prisma.user.count(),
		]);
		return ok({ items, total, page, limit: take });
	} catch (err) {
		return fail("Get users failed", err);
	}
}

export async function updateProfile(data: { name?: string; phone?: string; image?: string }) {
	try {
		const uid = await getCurrentUserId();
		if (!uid) return fail("Unauthorized");
		const payload: any = {};
		if (data.name !== undefined) payload.name = data.name;
		if (data.phone !== undefined) payload.phone = data.phone;
		if (data.image !== undefined) payload.image = data.image;
		const updated = await prisma.user.update({ where: { id: uid }, data: payload, select: { id: true, name: true, email: true, phone: true, image: true } });
		return ok(updated, "Profile updated");
	} catch (err) {
		return fail("Update profile failed", err);
	}
}

export async function updateRole(userId: string, role: string) {
	try {
		const uid = await getCurrentUserId();
		if (!uid || !(await isAdmin(uid))) return fail("Unauthorized");
		const updated = await prisma.user.update({ where: { id: userId }, data: { role: role as any } });
		return ok(updated, "Role updated");
	} catch (err) {
		return fail("Update role failed", err);
	}
}

export async function deactivateUser(userId: string) {
	try {
		const uid = await getCurrentUserId();
		if (!uid || !(await isAdmin(uid))) return fail("Unauthorized");
		const updated = await prisma.user.update({ where: { id: userId }, data: { isActive: false } });
		return ok(updated, "User deactivated");
	} catch (err) {
		return fail("Deactivate user failed", err);
	}
}

export async function activateUser(userId: string) {
	try {
		const uid = await getCurrentUserId();
		if (!uid || !(await isAdmin(uid))) return fail("Unauthorized");
		const updated = await prisma.user.update({ where: { id: userId }, data: { isActive: true } });
		return ok(updated, "User activated");
	} catch (err) {
		return fail("Activate user failed", err);
	}
}

export async function softDeleteUser(userId: string) {
	try {
		const uid = await getCurrentUserId();
		if (!uid || !(await isAdmin(uid))) return fail("Unauthorized");
		const updated = await prisma.user.update({ where: { id: userId }, data: { deletedAt: new Date() } });
		return ok(updated, "User soft-deleted");
	} catch (err) {
		return fail("Soft delete user failed", err);
	}
}