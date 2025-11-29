import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Tools Hub - Discover the Best AI Tools',
    template: '%s | AI Tools Hub',
  },
  description:
    'Discover and compare 100+ AI tools for productivity, creativity, coding, writing, and more. Find the perfect AI tool for your needs.',
  keywords: [
    'AI tools',
    'artificial intelligence',
    'ChatGPT',
    'Midjourney',
    'AI software',
    'productivity tools',
    'AI directory',
  ],
  authors: [{ name: 'AI Tools Hub' }],
  creator: 'AI Tools Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-tools-hub.vercel.app',
    siteName: 'AI Tools Hub',
    title: 'AI Tools Hub - Discover the Best AI Tools',
    description:
      'Discover and compare 100+ AI tools for productivity, creativity, coding, writing, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Hub - Discover the Best AI Tools',
    description:
      'Discover and compare 100+ AI tools for productivity, creativity, coding, writing, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20 sm:pt-24">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
