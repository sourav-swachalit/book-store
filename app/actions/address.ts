"use server";

import prisma from "@/lib/prisma";
import { getCurrentUserId, ok, fail, ApiResponse } from "./_helpers";

type AddressInput = {
	fullName: string;
	phone: string;
	address1: string;
	address2?: string;
	city: string;
	state: string;
	country: string;
	postalCode: string;
	isDefault?: boolean;
};

export async function createAddress(data: AddressInput): Promise<ApiResponse> {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		if (!data?.fullName || !data?.phone || !data?.address1) return fail("Missing required fields");

		return await prisma.$transaction(async (tx) => {
			if (data.isDefault) {
				await tx.address.updateMany({ where: { userId }, data: { isDefault: false } });
			}

			const address = await tx.address.create({ data: { ...data, userId } });
			return ok(address, "Address created");
		});
	} catch (err) {
		return fail("Create address failed", err);
	}
}

export async function updateAddress(id: string, data: Partial<AddressInput>): Promise<ApiResponse> {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		const existing = await prisma.address.findUnique({ where: { id } });
		if (!existing || existing.userId !== userId) return fail("Address not found or access denied");

		return await prisma.$transaction(async (tx) => {
			if (data.isDefault) {
				await tx.address.updateMany({ where: { userId }, data: { isDefault: false } });
			}
			const updated = await tx.address.update({ where: { id }, data });
			return ok(updated, "Address updated");
		});
	} catch (err) {
		return fail("Update address failed", err);
	}
}

export async function deleteAddress(id: string): Promise<ApiResponse> {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		const existing = await prisma.address.findUnique({ where: { id } });
		if (!existing || existing.userId !== userId) return fail("Address not found or access denied");

		await prisma.address.delete({ where: { id } });
		return ok(null, "Address deleted");
	} catch (err) {
		return fail("Delete address failed", err);
	}
}

export async function setDefaultAddress(id: string): Promise<ApiResponse> {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		const existing = await prisma.address.findUnique({ where: { id } });
		if (!existing || existing.userId !== userId) return fail("Address not found or access denied");

		await prisma.$transaction(async (tx) => {
			await tx.address.updateMany({ where: { userId }, data: { isDefault: false } });
			await tx.address.update({ where: { id }, data: { isDefault: true } });
		});

		return ok(null, "Default address set");
	} catch (err) {
		return fail("Set default address failed", err);
	}
}

export async function getAddress(id: string): Promise<ApiResponse> {
	try {
		const userId = await getCurrentUserId();
		if (!userId) return fail("Unauthorized");

		const address = await prisma.address.findUnique({ where: { id } });
		if (!address || address.userId !== userId) return fail("Not found or access denied");
		return ok(address);
	} catch (err) {
		return fail("Get address failed", err);
	}
}

export async function getAddresses(userId?: string): Promise<ApiResponse> {
	try {
		const uid = userId ?? (await getCurrentUserId());
		if (!uid) return fail("Unauthorized");
		const addresses = await prisma.address.findMany({ where: { userId: uid }, orderBy: { isDefault: "desc" } });
		return ok(addresses);
	} catch (err) {
		return fail("Get addresses failed", err);
	}
}