"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail } from "./_helpers";

export async function createReview(bookId: string, rating: number, comment?: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		rating = Math.max(1, Math.min(5, Math.floor(rating)));

		// prevent duplicate via unique constraint
		const existing = await prisma.review.findUnique({ where: { userId_bookId: { userId, bookId } } }).catch(() => null);
		if (existing) return fail("User has already reviewed this book");

		const review = await prisma.review.create({ data: { userId, bookId, rating, comment } });
		return ok(review, "Review added");
	} catch (err) {
		return fail("Create review failed", err);
	}
}

export async function updateReview(reviewId: string, rating?: number, comment?: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const existing = await prisma.review.findUnique({ where: { id: reviewId } });
		if (!existing || existing.userId !== userId) return fail("Not found or access denied");
		const data: any = {};
		if (rating !== undefined) data.rating = Math.max(1, Math.min(5, Math.floor(rating)));
		if (comment !== undefined) data.comment = comment;
		const updated = await prisma.review.update({ where: { id: reviewId }, data });
		return ok(updated, "Review updated");
	} catch (err) {
		return fail("Update review failed", err);
	}
}

export async function deleteReview(reviewId: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");
		const existing = await prisma.review.findUnique({ where: { id: reviewId } });
		if (!existing) return fail("Not found");
		if (existing.userId !== userId) return fail("Access denied");
		await prisma.review.delete({ where: { id: reviewId } });
		return ok(null, "Review deleted");
	} catch (err) {
		return fail("Delete review failed", err);
	}
}

export async function getReviewsByBook(bookId: string) {
	try {
		const reviews = await prisma.review.findMany({ where: { bookId }, include: { user: true }, orderBy: { createdAt: "desc" } });
		return ok(reviews);
	} catch (err) {
		return fail("Get reviews failed", err);
	}
}

export async function getUserReviews(userId?: string) {
	try {
		const uid = userId ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");
		const reviews = await prisma.review.findMany({ where: { userId: uid }, include: { book: true }, orderBy: { createdAt: "desc" } });
		return ok(reviews);
	} catch (err) {
		return fail("Get user reviews failed", err);
	}
}