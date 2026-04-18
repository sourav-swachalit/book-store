# Quick Start Guide - BookStore E-Commerce UI

## 🚀 Get Started in 5 Minutes

### 1. **View the Application**
The development server is already running at:
- **Local**: http://localhost:3000
- **Network**: http://100.64.3.167:3000

Open the preview to see your bookstore in action!

### 2. **Navigate Through Pages**

#### Homepage (`/`)
- Beautiful hero section with call-to-actions
- Featured books and bestsellers
- Category browsing
- Feature highlights

**Access**: Click "Home" in navbar or go to `/`

#### Books Listing (`/books`)
- Browse all 12 books
- Filter by: Genre, Format, Price, Rating
- Sort by: Featured, Newest, Price, Rating
- Toggle between Grid/List view
- Pagination support

**Access**: Click "Shop" or go to `/books`

#### Product Details (`/books/[id]`)
- Full product information
- Quantity selector
- Add to cart
- Add to wishlist
- Customer reviews
- Related products

**Access**: Click any book card

#### Shopping Cart (`/cart`)
- View cart items
- Adjust quantities
- Remove items
- See order summary
- Proceed to checkout

**Access**: Click cart icon in navbar or go to `/cart`

#### Wishlist (`/wishlist`)
- View saved items
- Remove from wishlist
- Quick add to cart

**Access**: Click heart icon in navbar or go to `/wishlist`

#### Account (`/account`)
- User profile
- Order history
- Saved addresses
- Demo login

**Access**: Click user icon or go to `/account`
**Demo**: Click "Sign In" to see demo data

### 3. **Test Key Features**

#### 🛒 Add to Cart
1. Click any book card
2. Increase quantity if desired
3. Click "Add to Cart"
4. See cart badge update in navbar
5. View cart at `/cart`

#### ❤️ Add to Wishlist
1. Click heart icon on any book
2. See wishlist badge update
3. View wishlist at `/wishlist`

#### 🔍 Filter Books
1. Go to `/books`
2. Use sidebar filters:
   - Select genres
   - Choose formats
   - Adjust price range
   - Filter by rating
3. See results update in real-time

#### ⬆️ Sort Books
1. Use the "Sort by" dropdown
2. Choose: Featured, Newest, Price (Low→High), Price (High→Low), Top Rated
3. Books reorder automatically

---

## 📁 Key Files & What They Do

### Pages (User-Facing)
| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage with hero and featured books |
| `app/books/page.tsx` | Books listing with filters and sorting |
| `app/books/[id]/page.tsx` | Product detail page |
| `app/cart/page.tsx` | Shopping cart |
| `app/wishlist/page.tsx` | Wishlist display |
| `app/account/page.tsx` | User account and profile |

### Components (Reusable UI)
| File | Purpose |
|------|---------|
| `components/Navbar.tsx` | Top navigation bar |
| `components/Footer.tsx` | Footer with links |
| `components/BookCard.tsx` | Book display card |
| `components/FilterSidebar.tsx` | Advanced filtering |

### Data & Logic
| File | Purpose |
|------|---------|
| `lib/types.ts` | TypeScript type definitions |
| `lib/constants.ts` | Mock books data and config |
| `lib/store.ts` | Zustand state stores |
| `lib/utils.ts` | Helper functions |

### Styling
| File | Purpose |
|------|---------|
| `app/globals.css` | Design tokens and global styles |
| `tailwind.config.ts` | Tailwind CSS configuration |

---

## 🎨 Customization Examples

### Change Primary Color
Edit `app/globals.css`:
```css
:root {
  --primary: oklch(0.4 0.14 29);  /* Change this color */
}
```

### Add a New Book to Mock Data
Edit `lib/constants.ts`:
```typescript
export const MOCK_BOOKS: Book[] = [
  // ... existing books
  {
    id: '13',
    title: 'Your New Book',
    author: 'Author Name',
    price: 19.99,
    cover: 'https://image-url.jpg',
    // ... other required fields
  }
];
```

### Add a New Navigation Link
Edit `components/Navbar.tsx`:
```tsx
<Link href="/new-page" className="...">
  New Link
</Link>
```

---

## 🛠️ Development Commands

```bash
# Start development server (already running)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm tsc --noEmit
```

---

## 💡 How State Management Works

### Adding Items to Cart
```typescript
import { useCartStore } from '@/lib/store';

// In your component:
const { addItem } = useCartStore();

// When user clicks "Add to Cart":
addItem(book, quantity);

// Cart updates automatically!
// Badge on navbar shows new count
```

### Toggle Wishlist
```typescript
import { useWishlistStore } from '@/lib/store';

const { addItem, removeItem, items } = useWishlistStore();

// Add to wishlist
addItem(bookId);

// Check if in wishlist
const isInWishlist = items.includes(bookId);

// Remove from wishlist
removeItem(bookId);
```

### User Login
```typescript
import { useUserStore } from '@/lib/store';

const { login, logout, isLoggedIn } = useUserStore();

// Demo login
login({
  id: '1',
  name: 'Your Name',
  email: 'your@email.com'
});
```

---

## 📱 Responsive Design Testing

Test on different screen sizes:

| Device | Width | Access |
|--------|-------|--------|
| Mobile | < 640px | Use Chrome DevTools |
| Tablet | 768px | Resize window or use DevTools |
| Desktop | > 1024px | Full width |

**In Chrome DevTools**:
1. Press `F12`
2. Click device icon (top-left of DevTools)
3. Select device or drag to resize

Features to test:
- ✅ Navigation collapses to hamburger
- ✅ Grid changes to fewer columns
- ✅ Images scale properly
- ✅ Text remains readable
- ✅ Touch targets are large enough

---

## 🔍 Testing Checklist

### Functionality
- [ ] Can add books to cart
- [ ] Cart total calculates correctly
- [ ] Can remove items from cart
- [ ] Can add/remove wishlist items
- [ ] Filters work properly
- [ ] Sorting works properly
- [ ] Can view product details
- [ ] Can login/logout from account

### Design
- [ ] Colors look consistent
- [ ] Spacing is even
- [ ] Typography is readable
- [ ] Images display properly
- [ ] Buttons are clickable
- [ ] Responsive on all sizes

### Performance
- [ ] Pages load quickly
- [ ] Images load smoothly
- [ ] No console errors
- [ ] Smooth animations
- [ ] No lag when interacting

---

## 📚 Resources & Documentation

### Architecture & Structure
- **`ARCHITECTURE.md`** - Detailed architecture guide
- **`IMPLEMENTATION_SUMMARY.md`** - What was built and why
- **`COMPONENT_GUIDE.md`** - Component usage guide

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)

---

## 🎯 Next Steps

### To Extend the App

1. **Add More Books**
   - Edit `lib/constants.ts`
   - Add new books to `MOCK_BOOKS`

2. **Create New Pages**
   - Add folder in `app/`
   - Create `page.tsx`
   - Use existing components

3. **Customize Colors**
   - Edit `app/globals.css` design tokens
   - Update Tailwind config

4. **Add Features**
   - Create new Zustand store if needed
   - Build components using existing patterns
   - Follow modular structure

### To Deploy

1. Push to GitHub
2. Connect to Vercel
3. Deploy with one click!

---

## 🆘 Common Issues & Solutions

### Books not showing?
- Check `lib/constants.ts` for mock data
- Verify imports in page files
- Check browser console for errors

### Styling looks wrong?
- Clear browser cache
- Check `app/globals.css` for design tokens
- Verify Tailwind classes are correct

### Cart not working?
- Check Zustand store in `lib/store.ts`
- Verify `useCartStore` is imported
- Check component state initialization

### Images not loading?
- Verify image URLs are valid
- Check alt text is provided
- Use Next.js Image component

---

## 📞 Need Help?

### Check These Files
1. **Component questions** → `COMPONENT_GUIDE.md`
2. **Architecture questions** → `ARCHITECTURE.md`
3. **What was built** → `IMPLEMENTATION_SUMMARY.md`

### Debug Tips
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Use React DevTools extension
4. Inspect element styles in Elements tab

---

## ✨ Pro Tips

1. **Use Keyboard Navigation** - Tab through links and buttons
2. **Test Mobile View** - Use Chrome DevTools device mode
3. **Check Accessibility** - Use browser accessibility inspector
4. **Inspect Components** - Use React DevTools extension
5. **Monitor Performance** - Check Network tab in DevTools

---

## 🚀 You're All Set!

Your BookStore e-commerce UI is ready to use and customize. Start by:

1. ✅ **Viewing** the application in the preview
2. ✅ **Exploring** all the pages and features
3. ✅ **Testing** the functionality
4. ✅ **Customizing** colors, content, and layout
5. ✅ **Extending** with new features

Happy coding! 📚

---

**Questions?** Check the documentation files or explore the codebase. Everything is well-organized and documented!
