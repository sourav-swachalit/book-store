"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// 1. Updated validation schema (removed the checkbox)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function CenteredLoginPage() {
  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const result =await loginAction(data);
    if (result) {
      console.log("Login successful! Response:", result);
      router.push("/");
      toast.success("Welcome back!");
    }
  };

  return (
    <div className="mt-15 mb-10 w-full bg-[#f4f5f6] flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      {/* Top Logo */}
      <div className="mb-8 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold tracking-tight">
          Book<span className="text-primary">Store.com</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-105 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              className={`border-gray-300 focus-visible:ring-slate-200 focus-visible:border-slate-900 ${
                errors.email
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-primary text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className={`border-gray-300 focus-visible:ring-slate-200 focus-visible:border-slate-900 ${
                errors.password
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-primary text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Primary Login Button */}
          <Button
            type="submit"
            className="w-full bg-[#18181b] hover:bg-[#18181b]/90 text-white font-medium py-2.5 rounded-md mt-2"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-slate-600 font-medium">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          className="w-full bg-gray-200 hover:bg-gray-300 text-black font-medium py-2.5 rounded-md mt-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>

      </div>

      {/* Footer Links */}
      <div className="mt-8 flex flex-col items-center gap-6 text-sm text-slate-600">
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            className="text-slate-900 font-medium underline underline-offset-4 hover:text-slate-700"
          >
            Signup
          </a>
        </p>

        {/* Decorative dotted line (optional, based on image bottom artifact) */}
        <div className="w-64 border-t border-dashed border-gray-300"></div>

        <a
          href="#"
          className="text-slate-900 font-medium underline underline-offset-4 hover:text-slate-700"
        >
          Reset Password
        </a>
      </div>
    </div>
  );
}
