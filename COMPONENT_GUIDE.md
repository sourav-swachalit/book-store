# Component Usage Guide

## 🎨 Reusable Components

This guide explains how to use and customize the reusable components in the BookStore application.

---

## 1. BookCard Component

Displays a book with image, title, author, rating, price, and action buttons.

### Props

```typescript
interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list';
  isInWishlist?: boolean;
  onWishlistToggle?: (bookId: string) => void;
}
```

### Example Usage

#### Grid View (Default)
```tsx
<BookCard
  book={mockBook}
  variant="grid"
  isInWishlist={wishlist.includes(mockBook.id)}
  onWishlistToggle={handleToggleWishlist}
/>
```

#### List View
```tsx
<BookCard
  book={mockBook}
  variant="list"
  isInWishlist={wishlist.includes(mockBook.id)}
  onWishlistToggle={handleToggleWishlist}
/>
```

### Features
- ✅ Responsive image display
- ✅ Star rating with count
- ✅ Price with discount badge
- ✅ Add to cart button with feedback
- ✅ Wishlist toggle
- ✅ Hover animations
- ✅ Grid and list layout options

### Customization
```tsx
// Change discount badge color
// Edit the className in BookCard.tsx line ~38:
// className="bg-primary text-primary-foreground"

// Change button style
// Edit the Button component props on line ~159
```

---

## 2. FilterSidebar Component

Advanced filtering UI with multiple filter types.

### Props

```typescript
interface FilterSidebarProps {
  onFilterChange?: (filters: {
    genres: string[];
    formats: string[];
    priceRange: [number, number];
    ratings: number[];
  }) => void;
}
```

### Example Usage

```tsx
const [filters, setFilters] = useState({
  genres: [],
  formats: [],
  priceRange: [0, 50],
  ratings: [],
});

<FilterSidebar onFilterChange={setFilters} />
```

### Supported Filters
- **Genres**: Multiple selection from predefined genres
- **Formats**: Hardcover, Paperback, Ebook
- **Price Range**: Numeric input for min/max price
- **Rating**: Star rating filter (1-5 stars)

### Features
- ✅ Collapsible filter sections
- ✅ Clear filters button
- ✅ Real-time filter updates
- ✅ Visual filter indicators
- ✅ Mobile responsive

### Customization

**Add a new genre:**
```tsx
// In lib/constants.ts, update GENRES array:
export const GENRES = [
  'Fiction',
  'Science Fiction',
  'Your New Genre', // Add here
  // ...
];
```

**Change price range:**
```tsx
// In lib/constants.ts:
export const PRICE_RANGE = { min: 0, max: 100 }; // Update max
```

---

## 3. Navbar Component

Sticky navigation with search, cart, wishlist, and user menu.

### No Props Required

### Example Usage

```tsx
import { Navbar } from '@/components/Navbar';

<Navbar />
```

### Features
- ✅ Logo with brand name
- ✅ Navigation links (Home, Shop, Bestsellers)
- ✅ Search bar
- ✅ Cart badge with item count
- ✅ Wishlist badge
- ✅ User account link
- ✅ Mobile hamburger menu
- ✅ Sticky positioning

### Customization

**Change logo/brand:**
```tsx
// Line ~21:
<span className="hidden sm:inline">BookStore</span>
// Change to your store name
```

**Add navigation links:**
```tsx
// Line ~30-40, add more links:
<Link href="/new-route" className="...">
  New Link
</Link>
```

**Update colors:**
```tsx
// Edit className colors:
// bg-primary → bg-your-color
// text-primary-foreground → text-your-foreground
```

---

## 4. Footer Component

Multi-column footer with links and newsletter signup.

### No Props Required

### Example Usage

```tsx
import { Footer } from '@/components/Footer';

<Footer />
```

### Features
- ✅ Brand section
- ✅ Shop links
- ✅ Support links
- ✅ Newsletter signup
- ✅ Legal links (Privacy, Terms)
- ✅ Social media links
- ✅ Copyright information

### Customization

**Change brand copy:**
```tsx
// Line ~18-21:
<p className="text-sm text-background/80">
  Your custom description here
</p>
```

**Add footer columns:**
```tsx
// Add new column div after line ~45:
<div className="flex flex-col gap-4">
  <h3 className="font-semibold">New Column</h3>
  {/* Add links here */}
</div>
```

**Update social links:**
```tsx
// Line ~89-97, update href attributes:
<a href="https://your-twitter.com">Twitter</a>
```

---

## 5. Specialized Component: ProductDetailPage

Used on `/books/[id]` for displaying full product information.

### Features
- ✅ Large product image
- ✅ Full product details
- ✅ Quantity selector
- ✅ Add to cart
- ✅ Wishlist toggle
- ✅ Customer reviews
- ✅ Related products
- ✅ Stock status

### Key Sections
```tsx
// 1. Product Image with Discount Badge
<Image src={book.cover} />

// 2. Product Details
<h1>{book.title}</h1>
<p>{book.author}</p>

// 3. Rating Display
<StarRating rating={book.rating} count={book.reviewCount} />

// 4. Pricing
<span>${book.price}</span>

// 5. Quantity & Actions
<QuantitySelector />
<AddToCartButton />
<WishlistToggle />

// 6. Related Products
<RelatedProductsGrid />
```

---

## 🔧 Common Customizations

### Change Color Scheme

1. **Global colors** in `app/globals.css`:
```css
:root {
  --primary: oklch(0.4 0.14 29);      /* Change this */
  --secondary: oklch(0.75 0.1 48);    /* And this */
  /* ... */
}
```

2. **Apply to components**:
```tsx
className="bg-primary text-primary-foreground"
// Automatically uses your theme colors
```

### Adjust Spacing

Modify Tailwind spacing classes:
```tsx
// Instead of:
<div className="p-4">Content</div>

// Use:
<div className="p-8">Content</div>  // More space
<div className="p-2">Content</div>  // Less space
```

### Change Button Styles

Update `Button` component in `components/ui/button.tsx`:
```tsx
// Global button styles
className="rounded-lg"  // More rounded
className="rounded-none"  // Sharp corners
```

### Modify Grid Layouts

```tsx
// 3 columns on desktop, 2 on tablet, 1 on mobile (default)
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// 4 columns on desktop
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// 2 columns only
className="grid grid-cols-1 lg:grid-cols-2"
```

---

## 📱 Responsive Classes Reference

```tailwind
/* Mobile First - Mobile styles by default */
className="p-4"              /* Mobile: 1rem padding */

/* Tablet and up */
className="sm:p-6"           /* 640px and up: 1.5rem */

/* Tablet and up */
className="md:p-8"           /* 768px and up: 2rem */

/* Desktop and up */
className="lg:p-12"          /* 1024px and up: 3rem */

/* Large desktop and up */
className="xl:p-16"          /* 1280px and up: 4rem */
```

### Responsive Grid Example
```tsx
{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id}>{item}</div>
  ))}
</div>
```

---

## 🎯 Component Composition Example

Creating a custom section with multiple components:

```tsx
'use client';

import { BookCard } from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function BookSection() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (bookId: string) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Books</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            variant="grid"
            isInWishlist={wishlist.includes(book.id)}
            onWishlistToggle={toggleWishlist}
          />
        ))}
      </div>

      <Button className="w-full">View All Books</Button>
    </section>
  );
}
```

---

## 🚀 Performance Tips

### Use Client Components Wisely
```tsx
// ✅ Use 'use client' only when needed:
'use client'; // For interactive features

// ❌ Don't use for static content:
// This doesn't need 'use client'
```

### Optimize Images
```tsx
// ✅ Use Next.js Image
<Image src={book.cover} alt={book.title} width={300} height={450} />

// ❌ Don't use HTML img for optimization
<img src={book.cover} alt={book.title} />
```

### Memoize Components
```tsx
// For components that don't change often:
import { memo } from 'react';

export const BookCard = memo(function BookCard(props) {
  return {/* ... */};
});
```

---

## 🔐 Component Props Best Practices

```typescript
// ✅ Good: Type-safe props
interface BookCardProps {
  book: Book;           // Required
  variant?: 'grid' | 'list';  // Optional with default
  onWishlistToggle?: (id: string) => void;  // Optional callback
}

// ❌ Avoid: Any types
interface BadProps {
  book: any;
  onClick: any;
}

// ❌ Avoid: Many optional props
interface TooManyProps {
  prop1?: string;
  prop2?: number;
  prop3?: boolean;
  prop4?: object;
  // ... 10 more
}
```

---

## 📚 Component Library Structure

```
components/
├── BookCard.tsx          # Primary book display
├── FilterSidebar.tsx     # Advanced filtering
├── Navbar.tsx            # Top navigation
├── Footer.tsx            # Footer section
└── ui/                   # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ...
```

---

## 🎨 Design Token Usage

```tsx
// Use semantic tokens (preferred)
<div className="bg-primary text-primary-foreground border-border">
  Content
</div>

// Available tokens:
// Colors: background, foreground, primary, secondary, muted, accent, destructive, border
// Sizes: sm, md, lg, xl
// Radius: sm, md, lg, xl
```

---

## ✅ Component Checklist

Before creating a new component, ensure:

- [ ] Clear, descriptive name
- [ ] Documented prop interface
- [ ] TypeScript types
- [ ] Responsive design
- [ ] Accessibility features
- [ ] Error handling
- [ ] Loading states (if applicable)
- [ ] Example usage in comments
- [ ] Reusable and composable
- [ ] No hardcoded colors (use tokens)

---

**Happy building! 🚀**
