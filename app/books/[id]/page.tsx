'use client';

import Image from 'next/image';
import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { MOCK_BOOKS } from '@/lib/constants';
import { Heart, ShoppingCart, Share2, Package, TrendingUp } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useWishlistStore } from '@/lib/store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const book = MOCK_BOOKS.find((b) => b.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistBooks, setWishlistBooks] = useState<string[]>([]);

  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Book Not Found</h1>
          <p className="text-muted-foreground">The book you&apos;re looking for doesn&apos;t exist.</p>
          <Button className="mt-4" asChild>
            <a href="/books">Back to Books</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(book, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book.id);
    }
    setIsInWishlist(!isInWishlist);
  };

  const relatedBooks = MOCK_BOOKS.filter(
    (b) => b.genre === book.genre && b.id !== book.id
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
              {book.originalPrice && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-lg">
                  {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-primary font-medium mb-2">{book.genre}</p>
                <h1 className="text-4xl font-bold text-foreground">{book.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">by {book.author}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-2xl',
                        i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-muted-foreground'
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{book.rating}</p>
                  <p className="text-sm text-muted-foreground">({book.reviewCount} reviews)</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              {book.pages && (
                <div>
                  <p className="text-sm text-muted-foreground">Pages</p>
                  <p className="font-semibold text-foreground">{book.pages}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Format</p>
                <p className="font-semibold text-foreground">{book.format}</p>
              </div>
              {book.publishDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="font-semibold text-foreground">
                    {new Date(book.publishDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {book.isbn && (
                <div>
                  <p className="text-sm text-muted-foreground">ISBN</p>
                  <p className="font-semibold text-foreground text-sm">{book.isbn}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <div>
                <span className="text-4xl font-bold text-primary">${book.price}</span>
                {book.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through ml-3">
                    ${book.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">
                {book.inStock ? 'In Stock - Ships Today' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold text-foreground min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {quantity > 1 ? `$${(book.price * quantity).toFixed(2)}` : ''}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                  className={cn('flex-1 transition-all', isAdded ? 'bg-green-600 hover:bg-green-700' : '')}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAdded ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={toggleWishlist}
                  className="px-4"
                >
                  <Heart
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isInWishlist ? 'fill-destructive text-destructive' : ''
                    )}
                  />
                </Button>
              </div>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share This Book
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Free shipping on all orders</span>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Easy 30-day returns</span>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-12 border-y border-border mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Sarah Anderson',
                rating: 5,
                text: 'An absolutely captivating read from start to finish. Highly recommend!',
              },
              {
                name: 'James Chen',
                rating: 4,
                text: 'Great book, very well written. Couldn\'t put it down.',
              },
            ].map((review, i) => (
              <div key={i} className="border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className={cn(
                          'text-lg',
                          j < review.rating ? 'text-yellow-400' : 'text-muted-foreground'
                        )}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
