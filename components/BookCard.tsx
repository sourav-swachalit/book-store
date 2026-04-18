'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Book } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list';
  isInWishlist?: boolean;
  onWishlistToggle?: (bookId: string) => void;
}

export function BookCard({
  book,
  variant = 'grid',
  isInWishlist = false,
  onWishlistToggle,
}: BookCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(book, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // List view (kept for functionality, but optimized for the clean look)
  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
        <div className="relative w-24 h-32 flex-shrink-0 bg-[#F3F3F3] rounded-xl overflow-hidden">
          <Image src={book.cover} alt={book.title} fill className="object-contain p-2" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="font-bold text-base text-foreground">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">${book.price.toFixed(2)} USD</span>
            <Button size="sm" onClick={handleAddToCart} className={cn(isAdded && "bg-green-600")}>
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Matches the provided image)
  return (
    <div className="group flex flex-col bg-transparent">
      {/* Image Container */}
      <Link href={`/books/${book.id}`}>
        <div className="relative aspect-[4/3] w-full mb-3 overflow-hidden bg-[#F3F3F3] rounded-xl border border-transparent group-hover:border-slate-200 transition-all">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col space-y-1 px-1">
        <div className="flex justify-between items-start">
          <Link href={`/books/${book.id}`}>
            <h3 className="font-bold text-[15px] leading-tight text-foreground hover:underline decoration-1">
              {book.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
            <span className="text-orange-400 text-[12px]">★</span>
            <span>({book.rating.toFixed(1)})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-foreground">
            ${book.price.toFixed(2)} USD
          </span>
          {book.originalPrice && (
            <span className="text-[11px] text-muted-foreground line-through">
              ${book.originalPrice.toFixed(2)} USD
            </span>
          )}
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center gap-2 pt-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className={cn(
              "flex-1 h-9 text-xs font-semibold rounded-lg transition-all",
              isAdded ? "bg-green-600 text-white border-green-600 hover:bg-green-700" : "hover:bg-slate-900 hover:text-white"
            )}
          >
            {isAdded ? "Added" : "Add to Cart"}
          </Button>
          <button
            onClick={() => onWishlistToggle?.(book.id)}
            className={cn(
              "p-2 rounded-lg border transition-colors",
              isInWishlist ? "bg-red-50 border-red-100" : "bg-white border-slate-200 hover:bg-slate-50"
            )}
          >
            <Heart className={cn("w-4 h-4", isInWishlist ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>
        </div>
      </div>
    </div>
  );
}