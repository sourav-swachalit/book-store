'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { MOCK_BOOKS, GENRES } from '@/lib/constants';
import { ArrowRight, Sparkles, Zap, Award } from 'lucide-react';
import { useState } from 'react';
import { useWishlistStore } from '@/lib/store';
import { WhyChooseSection } from '@/components/WhyChooseSection';

export default function Home() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  const toggleWishlist = (bookId: string) => {
    if (wishlist.includes(bookId)) {
      setWishlist(wishlist.filter((id) => id !== bookId));
      removeFromWishlist(bookId);
    } else {
      setWishlist([...wishlist, bookId]);
      addToWishlist(bookId);
    }
  };

  const featuredBooks = MOCK_BOOKS.slice(0, 6);
  const bestsellingBooks = MOCK_BOOKS.slice(6, 12);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Welcome to BookStore
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                Discover Your Next Great Read
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl text-pretty">
                Explore thousands of books across all genres. From bestsellers to hidden gems, find your perfect story today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Bestsellers
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Books Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">100K+</p>
                <p className="text-sm text-muted-foreground">Happy Readers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">Fast</p>
                <p className="text-sm text-muted-foreground">Free Shipping</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <Image
                src="https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=700&fit=crop"
                alt="Hero books"
                fill
                className="object-cover"
                priority
              />
              {/* Floating cards effect */}
              <div className="absolute bottom-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 bg-gradient-to-br from-primary to-secondary rounded flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">Featured Pick</p>
                    <p className="text-xs text-muted-foreground">Curated for you</p>
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <WhyChooseSection />

      {/* Featured Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Books</h2>
            <p className="text-muted-foreground mt-2">Explore our hand-picked selection</p>
          </div>
          <Link href="/books">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isInWishlist={wishlist.includes(book.id)}
              onWishlistToggle={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Bestselling Books</h2>
            <p className="text-muted-foreground mt-2">What readers are loving right now</p>
          </div>
          <Link href="/bestsellers">
            <Button variant="outline">
              Explore More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellingBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isInWishlist={wishlist.includes(book.id)}
              onWishlistToggle={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Browse by Category</h2>
          <p className="text-muted-foreground mt-2">Find books in your favorite genres</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {GENRES.slice(0, 8).map((genre) => (
            <Link key={genre} href={`/books?genre=${genre}`}>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border border-border rounded-lg p-6 text-center cursor-pointer transition-all hover:shadow-md">
                <p className="font-semibold text-foreground">{genre}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 md:p-12 text-center text-background space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Next Favorite Book?</h2>
          <p className="text-lg text-background/90 max-w-2xl mx-auto">
            Join thousands of readers discovering new books and saving on their favorite authors.
          </p>
          <Link href="/books">
            <Button size="lg" variant="secondary" className="mt-4">
              Start Exploring Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
