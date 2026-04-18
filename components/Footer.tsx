import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                📚
              </div>
              <span>BookStore</span>
            </div>
            <p className="text-sm text-background/80">
              Discover your next great read with our curated collection of books across all genres.
            </p>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books" className="text-background/70 hover:text-background transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-background/70 hover:text-background transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/new-releases" className="text-background/70 hover:text-background transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-background/70 hover:text-background transition-colors">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-background/70 hover:text-background transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-background/70 hover:text-background transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-background/80">Subscribe to get special offers and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-background text-foreground rounded text-sm placeholder-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" variant="secondary">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-background/60">
            <div>
              <p>&copy; 2024 BookStore. All rights reserved.</p>
            </div>
            <div className="flex gap-6 justify-center">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex gap-4 justify-end">
              <Link href="#" className="hover:text-background transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Instagram
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
