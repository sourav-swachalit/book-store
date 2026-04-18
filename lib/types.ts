export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  cover: string;
  rating: number;
  reviewCount: number;
  genre: string;
  format: 'Hardcover' | 'Paperback' | 'Ebook';
  description: string;
  inStock: boolean;
  pages?: number;
  publishDate?: string;
  isbn?: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface CartState {
  items: CartItem[];
  addItem: (book: Book, quantity: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface WishlistState {
  items: string[];
  addItem: (bookId: string) => void;
  removeItem: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (user: User) => void;
}

export interface FilterOptions {
  genres: string[];
  authors: string[];
  priceRange: [number, number];
  ratings: number[];
  formats: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface SearchResult {
  books: Book[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}
