"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail } from "./_helpers";

export async function addWishlist(bookId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		// prevent duplicate
		const existing = await prisma.wishlist.findUnique({ where: { userId_bookId: { userId, bookId } } }).catch(() => null);
		if (existing) return fail("Already in wishlist");
		const w = await prisma.wishlist.create({ data: { userId, bookId } });
		return ok(w, "Added to wishlist");
	} catch (err) {
		return fail("Add wishlist failed", err);
	}
}

export async function removeWishlist(bookId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		await prisma.wishlist.deleteMany({ where: { userId, bookId } });
		return ok(null, "Removed from wishlist");
	} catch (err) {
		return fail("Remove wishlist failed", err);
	}
}

export async function getWishlist(userId?: string) {
	try {
		const uid = userId ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");
		const items = await prisma.wishlist.findMany({ where: { userId: uid }, include: { book: { include: { images: true, inventory: true } } } });
		return ok(items);
	} catch (err) {
		return fail("Get wishlist failed", err);
	}
}