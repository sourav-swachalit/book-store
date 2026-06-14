"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/lib/store";
import {
  User,
  Package,
  LogOut,
  LogIn,
  Edit2,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
// import { headers } from 'next/headers';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountPage() {
  const { user, isLoggedIn, login, logout } = useUserStore();
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "addresses"
  >("profile");

  // const session = await auth.api.getSession({
  //   headers: await headers()
  // });

  // const { session } = useSession();
  // console.log("Session from useSession hook:", session);
  
  const { data: session, isPending } = authClient.useSession();
  console.log("Session from useSession hook:", session);

  const router = useRouter();

  const handleLogin = () => {};

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground text-lg">
                Sign in to your account to view your orders and manage your
                profile.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <Button size="lg" onClick={handleLogin} className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to Your Account
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">
                    Don&apos;t have an account?
                  </span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/signup">Create an Account</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Demo mode: Click &quot;Sign In&quot; to see the account dashboard
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Account</h1>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <User className="w-4 h-4 mr-2 inline" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  activeTab === "orders"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Package className="w-4 h-4 mr-2 inline" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  activeTab === "addresses"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <MapPin className="w-4 h-4 mr-2 inline" />
                Addresses
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl">
                      👤
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {user?.name}
                      </h2>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="space-y-6 pt-6 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name.split(" ")[0]}
                        className="w-full px-4 py-2 border border-border rounded bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name.split(" ")[1] || ""}
                        className="w-full px-4 py-2 border border-border rounded bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 border border-border rounded bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 border border-border rounded bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button>Save Changes</Button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                {[
                  {
                    id: "#ORD-001",
                    date: "Jan 15, 2024",
                    total: "$45.99",
                    status: "Delivered",
                  },
                  {
                    id: "#ORD-002",
                    date: "Jan 10, 2024",
                    total: "$32.50",
                    status: "Shipped",
                  },
                  {
                    id: "#ORD-003",
                    date: "Jan 5, 2024",
                    total: "$58.25",
                    status: "Delivered",
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {order.id}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {order.total}
                        </p>
                        <p
                          className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}
                        >
                          {order.status}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Billing Address
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p>John Doe</p>
                        <p>123 Main Street</p>
                        <p>New York, NY 10001</p>
                        <p>USA</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Shipping Address
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p>John Doe</p>
                        <p>123 Main Street</p>
                        <p>New York, NY 10001</p>
                        <p>USA</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>

                <Button className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
