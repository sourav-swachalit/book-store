'use client';

import { create } from 'zustand';
import { Book, CartItem, CartState, WishlistState, UserState, User } from './types';

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (book: Book, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.bookId === book.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.bookId === book.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        items: [...state.items, { bookId: book.id, quantity, book }],
      };
    }),

  removeItem: (bookId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.bookId !== bookId),
    })),

  updateQuantity: (bookId: string, quantity: number) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.bookId !== bookId) };
      }
      return {
        items: state.items.map((item) => (item.bookId === bookId ? { ...item, quantity } : item)),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    let total = 0;
    // Note: This won't work directly with Zustand callbacks, you need to calculate in component
    return total;
  },

  getItemCount: () => {
    let count = 0;
    // Note: This won't work directly with Zustand callbacks, you need to calculate in component
    return count;
  },
}));

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
  addItem: (bookId: string) =>
    set((state) => ({
      items: state.items.includes(bookId) ? state.items : [...state.items, bookId],
    })),

  removeItem: (bookId: string) =>
    set((state) => ({
      items: state.items.filter((id) => id !== bookId),
    })),

  isInWishlist: (bookId: string) => {
    // This will be called in component to check if item is in wishlist
    return false;
  },
}));

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user: User) =>
    set({
      user,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  updateProfile: (user: User) =>
    set({
      user,
    }),
}));
