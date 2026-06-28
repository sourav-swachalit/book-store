"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
};

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    // better-auth returns { session, user }
    return (session?.user as any)?.id ?? (session?.session as any)?.userId ?? null;
  } catch (err) {
    return null;
  }
}

export function ok<T = any>(data: T, message = "Success"): ApiResponse<T> {
  return { success: true, message, data };
}

export function fail(message = "Failed", errors?: any): ApiResponse {
  return { success: false, message, errors };
}

export async function isAdmin(userId: string) {
  if (!userId) return false;
  const u = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  return u?.role === "ADMIN";
}

export function now() {
  return new Date();
}

export function toDecimal(n: number | string) {
  return typeof n === "number" ? String(n) : n;
}
