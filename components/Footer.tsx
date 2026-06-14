"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Phone,
  Send,
  MapPin,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Heart,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full text-slate-900 pt-16 px-4 md:px-8 mx-auto font-sans">
      <footer className="w-full text-slate-900 pt-16 px-4 md:px-8 mx-auto font-sans">
        {/* SECTION 1: Newsletter */}
       

        {/* SECTION 2: Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <div className="border border-slate-200 rounded-xl p-5 flex items-start gap-4">
            <MessageSquare
              className="w-5 h-5 text-slate-700 shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <h4 className="font-semibold text-sm mb-1">Customer Support</h4>
              <p className="text-xs text-slate-500">Mon–Fri, 8am–7pm EST.</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 flex items-start gap-4">
            <Phone
              className="w-5 h-5 text-slate-700 shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <h4 className="font-semibold text-sm mb-1">Call Us</h4>
              <a
                href="tel:+18559874420"
                className="text-xs text-slate-500 hover:text-slate-800 underline-offset-2 hover:underline"
              >
                +1 855-987-4420 (toll-free)
              </a>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 flex items-start gap-4">
            <Send
              className="w-5 h-5 text-slate-700 shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <h4 className="font-semibold text-sm mb-1">Email Us</h4>
              <a
                href="mailto:support@lumiskin.co"
                className="text-xs text-slate-500 hover:text-slate-800 underline-offset-2 hover:underline"
              >
                support@lumiskin.co
              </a>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 flex items-start gap-4">
            <MapPin
              className="w-5 h-5 text-slate-700 shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <div>
              <h4 className="font-semibold text-sm mb-1">Address</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                125 Bloom Avenue, Suite 210, CA
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column - Brand & Config */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-black"
            >
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="hidden sm:inline">
                Book<span className="text-primary">Store.com</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed mb-8 mt-5">
              We design books that empower readers to explore new worlds and ideas through thoughtful storytelling, engaging narratives, and beautifully crafted publications.
            </p>

            <div className="mb-8">
              <Select defaultValue="english">
                <SelectTrigger className="w-35 h-9 text-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Badges (Placeholder representations) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50">
                amazon
              </div>
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50 flex items-center gap-1">
                 Pay
              </div>
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50">
                mastercard
              </div>
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50 text-blue-800 italic">
                PayPal
              </div>
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50 text-blue-900">
                VISA
              </div>
              <div className="px-2 py-1 text-[10px] font-bold border rounded bg-slate-50 text-orange-500">
                DISCOVER
              </div>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-sm">Shop</h4>
                <ChevronUp className="w-3 h-3 text-slate-400" />
              </div>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    New Launches
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Skin Type Routines
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Gifts & Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-semibold text-sm">Support</h4>
                <ChevronUp className="w-3 h-3 text-slate-400" />
              </div>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                  >
                    Returns & Exchanges
                  </a>
                </li>
              </ul>
            </div>

            {/* About & Socials */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-semibold text-sm">About</h4>
                  <ChevronUp className="w-3 h-3 text-slate-400" />
                </div>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                    >
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                    >
                      Ingredients
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                    >
                      Sustainability
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-slate-900 underline underline-offset-4 decoration-slate-300"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Icons positioned at bottom right */}
              <div className="flex items-center gap-3 mt-8">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center text-white hover:bg-black transition-colors"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center text-white hover:bg-black transition-colors"
                >
                  <Twitter className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center text-white hover:bg-black transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Copyright & Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 pb-12 border-t border-slate-100 gap-6">
          <p className="text-xs text-slate-500 flex items-center gap-1">
            © 2026 Made with{" "}
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500 mx-0.5" /> by
            bookstore.com
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Shipping Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Returns Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms Of Service
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
