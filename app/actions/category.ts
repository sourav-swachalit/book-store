"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

export async function createCategory(data: { name: string; slug: string; parentId?: string }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		if (!data?.name || !data?.slug) return fail("Missing name or slug");
		const cat = await prisma.category.create({ data });
		return ok(cat, "Category created");
	} catch (err) {
		return fail("Create category failed", err);
	}
}

export async function updateCategory(id: string, data: { name?: string; slug?: string; parentId?: string }) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const updated = await prisma.category.update({ where: { id }, data });
		return ok(updated, "Category updated");
	} catch (err) {
		return fail("Update category failed", err);
	}
}

export async function deleteCategory(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		await prisma.category.delete({ where: { id } });
		return ok(null, "Category deleted");
	} catch (err) {
		return fail("Delete category failed", err);
	}
}

export async function getCategory(id: string) {
	try {
		const cat = await prisma.category.findUnique({ where: { id }, include: { children: true, books: true } });
		if (!cat) return fail("Not found");
		return ok(cat);
	} catch (err) {
		return fail("Get category failed", err);
	}
}

export async function getCategories({ page = 1, limit = 50 } = {}) {
	try {
		const take = Math.min(200, limit);
		const skip = Math.max(0, (page - 1) * take);
		const [items, total] = await Promise.all([
			prisma.category.findMany({ skip, take, include: { children: true } }),
			prisma.category.count(),
		]);
		return ok({ items, total, page, limit: take });
	} catch (err) {
		return fail("Get categories failed", err);
	}
}

export async function getCategoryTree() {
	try {
		const cats = await prisma.category.findMany({ include: { children: true } });
		return ok(cats);
	} catch (err) {
		return fail("Get category tree failed", err);
	}
}