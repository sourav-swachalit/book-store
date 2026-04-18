'use client';

import { useState, useMemo } from 'react';
import { BookCard } from '@/components/BookCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { MOCK_BOOKS, SORT_OPTIONS, ITEMS_PER_PAGE } from '@/lib/constants';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store';
import { useState as useStateForWishlist } from 'react';

export default function BooksPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    genres: [] as string[],
    formats: [] as string[],
    priceRange: [0, 50] as [number, number],
    ratings: [] as number[],
  });
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

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let result = MOCK_BOOKS;

    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter((book) => filters.genres.includes(book.genre));
    }

    // Apply format filter
    if (filters.formats.length > 0) {
      result = result.filter((book) => filters.formats.includes(book.format));
    }

    // Apply price filter
    result = result.filter((book) => book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]);

    // Apply rating filter
    if (filters.ratings.length > 0) {
      result = result.filter((book) => filters.ratings.some((rating) => book.rating >= rating));
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime());
        break;
      case 'price-low':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">All Books</h1>
        <p className="text-muted-foreground">
          Showing {filteredBooks.length} books
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar onFilterChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex gap-2 border border-border rounded-lg p-1">
                  <Button
                    variant={layout === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('grid')}
                    className="px-3"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={layout === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('list')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-muted-foreground">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Books Grid/List */}
            {paginatedBooks.length > 0 ? (
              <div
                className={cn(
                  'gap-6',
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-4'
                )}
              >
                {paginatedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    variant={layout}
                    isInWishlist={wishlist.includes(book.id)}
                    onWishlistToggle={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No books found matching your filters.</p>
                <Button variant="outline" onClick={() => setFilters({ genres: [], formats: [], priceRange: [0, 50], ratings: [] })} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className="min-w-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
