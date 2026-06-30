"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(data: any) {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: String(data.password),
        name: data.username,
      },
    });

    return result;
  } catch (error) {
    console.error("Signup error:", error);
  }
}

export async function loginAction(data: any) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return result;
  } catch (error) {
    console.error("Login error:", error);
  }
}

export async function logoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(), // Pass the request headers to maintain the session context
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
}
