"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, isAdmin } from "./_helpers";

type BookInput = {
	title: string;
	slug: string;
	isbn: string;
	description?: string;
	price: number;
	discountPrice?: number;
	language?: string;
	pages?: number;
	publishYear?: number;
	categoryId: string;
	authorId: string;
	publisherId: string;
	images?: string[];
};

export async function createBook(data: BookInput) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		if (!data.title || !data.slug || !data.isbn) return fail("Missing fields");

		const created = await prisma.book.create({
			data: {
				title: data.title,
				slug: data.slug,
				isbn: data.isbn,
				description: data.description,
				price: String(data.price),
				discountPrice: data.discountPrice ? String(data.discountPrice) : undefined,
				language: data.language,
				pages: data.pages,
				publishYear: data.publishYear,
				categoryId: data.categoryId,
				authorId: data.authorId,
				publisherId: data.publisherId,
			},
		});

		if (data.images?.length) {
			await prisma.bookImage.createMany({ data: data.images.map((url) => ({ url, bookId: created.id })) });
		}

		return ok(created, "Book created");
	} catch (err) {
		return fail("Create book failed", err);
	}
}

export async function updateBook(id: string, data: Partial<BookInput>) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		const payload: any = { ...data };
		if (data.price !== undefined) payload.price = String(data.price as any);
		if (data.discountPrice !== undefined) payload.discountPrice = data.discountPrice === null ? null : String(data.discountPrice as any);
		const updated = await prisma.book.update({ where: { id }, data: payload });
		return ok(updated, "Book updated");
	} catch (err) {
		return fail("Update book failed", err);
	}
}

export async function deleteBook(id: string) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		// soft delete by setting deletedAt
		const updated = await prisma.book.update({ where: { id }, data: { deletedAt: new Date() } });
		return ok(updated, "Book deleted");
	} catch (err) {
		return fail("Delete book failed", err);
	}
}

export async function getBookById(id: string) {
	try {
		const book = await prisma.book.findUnique({
			where: { id },
			include: { images: true, author: true, publisher: true, category: true, inventory: true, reviews: { include: { user: true } } },
		});
		if (!book) return fail("Not found");
		return ok(book);
	} catch (err) {
		return fail("Get book failed", err);
	}
}

export async function getBooks({ page = 1, limit = 20, filter = {}, search, sort }: any = {}) {
	try {
		const take = Math.min(100, limit);
		const skip = Math.max(0, (page - 1) * take);
		const where: any = { deletedAt: null };
		if (filter?.categoryId) where.categoryId = filter.categoryId;
		if (filter?.authorId) where.authorId = filter.authorId;
		if (filter?.publisherId) where.publisherId = filter.publisherId;
		if (search) where.OR = [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }, { isbn: { contains: search } }];

		const [items, total] = await Promise.all([
			prisma.book.findMany({ where, skip, take, include: { images: true, inventory: true }, orderBy: sort ?? { createdAt: "desc" } as any }),
			prisma.book.count({ where }),
		]);

		return ok({ items, total, page, limit: take });
	} catch (err) {
		return fail("Get books failed", err);
	}
}

export async function getBooksByCategory(categoryId: string, opts: any = {}) {
	return getBooks({ ...opts, filter: { ...(opts.filter || {}), categoryId } });
}

export async function searchBooks(query: string, opts: any = {}) {
	return getBooks({ ...opts, search: query });
}

export async function updateStock(bookId: string, delta: number) {
	try {
		// admin only
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");

		const inv = await prisma.inventory.findUnique({ where: { bookId } });
		if (!inv) return fail("Inventory not found");

		const newStock = Math.max(0, inv.stock + delta);
		const updated = await prisma.inventory.update({ where: { id: inv.id }, data: { stock: newStock } });
		return ok(updated, "Stock updated");
	} catch (err) {
		return fail("Update stock failed", err);
	}
}

export async function uploadBookImages(bookId: string, urls: string[]) {
	try {
		const userId = await getCurrentUserId();
		if (!userId || !(await isAdmin(userId))) return fail("Unauthorized");
		if (!urls?.length) return fail("No images provided");
		const data = urls.map((url) => ({ url, bookId }));
		const res = await prisma.bookImage.createMany({ data });
		return ok(res, "Images uploaded");
	} catch (err) {
		return fail("Upload images failed", err);
	}
}