'use client';

import { GENRES, FORMATS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  onFilterChange?: (filters: {
    genres: string[];
    formats: string[];
    priceRange: [number, number];
    ratings: number[];
  }) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['genres', 'formats', 'price', 'rating']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const toggleGenre = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updated);
    onFilterChange?.({
      genres: updated,
      formats: selectedFormats,
      priceRange,
      ratings: selectedRatings,
    });
  };

  const toggleFormat = (format: string) => {
    const updated = selectedFormats.includes(format)
      ? selectedFormats.filter((f) => f !== format)
      : [...selectedFormats, format];
    setSelectedFormats(updated);
    onFilterChange?.({
      genres: selectedGenres,
      formats: updated,
      priceRange,
      ratings: selectedRatings,
    });
  };

  const toggleRating = (rating: number) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updated);
    onFilterChange?.({
      genres: selectedGenres,
      formats: selectedFormats,
      priceRange,
      ratings: updated,
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const updated: [number, number] = type === 'min' ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(updated);
    onFilterChange?.({
      genres: selectedGenres,
      formats: selectedFormats,
      priceRange: updated,
      ratings: selectedRatings,
    });
  };

  const hasActiveFilters =
    selectedGenres.length > 0 ||
    selectedFormats.length > 0 ||
    selectedRatings.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50;

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedFormats([]);
    setPriceRange([0, 50]);
    setSelectedRatings([]);
    onFilterChange?.({
      genres: [],
      formats: [],
      priceRange: [0, 50],
      ratings: [],
    });
  };

  return (
    <div className="w-full md:w-64 space-y-6">
      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={resetFilters}
        >
          Clear Filters
        </Button>
      )}

      {/* Genres */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('genres')}
          className="w-full flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors"
        >
          Genres
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSections.includes('genres') ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.includes('genres') && (
          <div className="space-y-2 pl-2">
            {GENRES.map((genre) => (
              <label key={genre} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                  className="w-4 h-4 rounded border-border bg-background cursor-pointer accent-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {genre}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Formats */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('formats')}
          className="w-full flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors"
        >
          Format
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSections.includes('formats') ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.includes('formats') && (
          <div className="space-y-2 pl-2">
            {FORMATS.map((format) => (
              <label key={format} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => toggleFormat(format)}
                  className="w-4 h-4 rounded border-border bg-background cursor-pointer accent-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {format}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors"
        >
          Price Range
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSections.includes('price') ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-4 pl-2">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Minimum Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange('min', parseInt(e.target.value) || 0)}
                  className="flex-1 px-2 py-1 border border-border rounded text-sm bg-background outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">$</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Maximum Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange('max', parseInt(e.target.value) || 50)}
                  className="flex-1 px-2 py-1 border border-border rounded text-sm bg-background outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">$</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors"
        >
          Rating
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expandedSections.includes('rating') ? 'rotate-180' : ''
            )}
          />
        </button>
        {expandedSections.includes('rating') && (
          <div className="space-y-2 pl-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                  className="w-4 h-4 rounded border-border bg-background cursor-pointer accent-primary"
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-xs',
                        i < rating ? 'text-yellow-400' : 'text-muted-foreground'
                      )}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
