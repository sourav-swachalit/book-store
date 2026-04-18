import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BookStore - Discover Your Next Great Read',
  description: 'Browse and purchase a curated collection of books across all genres. Bestsellers, new releases, and deals on fiction, non-fiction, and more.',
  keywords: 'books, bookstore, fiction, non-fiction, ebook, hardcover, paperback',
  openGraph: {
    title: 'BookStore - Discover Your Next Great Read',
    description: 'Browse and purchase a curated collection of books across all genres.',
    url: 'https://bookstore.example.com',
    siteName: 'BookStore',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export const viewport: Viewport = {
  themeColor: '#402820',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
