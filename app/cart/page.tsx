'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useMemo } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }, [items]);

  const tax = subtotal * 0.08;
  const shipping = items.length > 0 ? 0 : 0;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart.
            </p>
            <Link href="/books">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
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
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
          <span className="text-sm text-muted-foreground">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.bookId}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Book Image */}
                <div className="relative w-24 h-32 flex-shrink-0">
                  <Image
                    src={item.book.cover}
                    alt={item.book.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/books/${item.bookId}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {item.book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.book.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.book.format}</p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.bookId, Math.max(1, item.quantity - 1))
                        }
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 font-medium text-foreground min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        className="p-1 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.book.price} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.bookId)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (estimated)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/books">
                  Continue Shopping
                </Link>
              </Button>

              <div className="pt-4 border-t border-border space-y-2 text-xs text-muted-foreground">
                <p>✓ Free shipping on all orders</p>
                <p>✓ 30-day returns guaranteed</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
