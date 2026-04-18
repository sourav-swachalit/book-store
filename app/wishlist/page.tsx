'use client';

import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/lib/store';
import { MOCK_BOOKS } from '@/lib/constants';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const [localWishlist, setLocalWishlist] = useState(wishlistItems);

  const wishlistBooks = MOCK_BOOKS.filter((book) => wishlistItems.includes(book.id));

  const toggleWishlist = (bookId: string) => {
    if (localWishlist.includes(bookId)) {
      setLocalWishlist(localWishlist.filter((id) => id !== bookId));
      removeItem(bookId);
    } else {
      setLocalWishlist([...localWishlist, bookId]);
    }
  };

  if (wishlistBooks.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Wishlist</h1>

          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add books to your wishlist to save them for later.
            </p>
            <Link href="/books">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Books
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
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              You have {wishlistBooks.length} book{wishlistBooks.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          <Link href="/books">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isInWishlist={true}
              onWishlistToggle={toggleWishlist}
            />
          ))}
        </div>

        {/* CTA Section */}
        {wishlistBooks.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ready to order your wishlist items?
            </h2>
            <p className="text-muted-foreground mb-6">
              Check out all these amazing books and discover your next favorite read.
            </p>
            <Link href="/books">
              <Button size="lg">
                Explore All Books
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
