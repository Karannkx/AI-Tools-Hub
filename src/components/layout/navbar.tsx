
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles, Home, Grid3x3, GraduationCap, Image, Code } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tools', label: 'All Tools', icon: Grid3x3 },
  { href: '/collections/best-ai-tools-for-students', label: 'Students', icon: GraduationCap },
  { href: '/collections/top-ai-image-generators', label: 'Images', icon: Image },
  { href: '/collections/top-ai-coding-tools', label: 'Code', icon: Code },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <nav className="container mx-auto max-w-6xl">
        {/* Desktop Dock-Style Navbar */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 transition-all group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110">
              <img 
                src="https://i0.wp.com/aitoolsarena.com/wp-content/uploads/2023/02/cropped-AI-Tools-Arena-512.png?fit=512%2C512&ssl=1"
                alt="AI Tools Hub Logo"
                className="h-full w-full object-cover p-1"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              AI Tools<span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Hub</span>
            </span>
          </Link>

          {/* macOS Dock-Style Navigation */}
          <div className="flex items-center gap-1 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 px-2 py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all hover:bg-accent/50"
                >
                  <Icon className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:scale-110" />
                  <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    {link.label}
                  </span>
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40" size="sm" asChild>
              <Link href="/tools">Explore</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-xl px-4 py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 transition-transform group-hover:scale-110">
              <img 
                src="https://i0.wp.com/aitoolsarena.com/wp-content/uploads/2023/02/cropped-AI-Tools-Arena-512.png?fit=512%2C512&ssl=1"
                alt="AI Tools Hub Logo"
                className="h-full w-full object-cover p-0.5"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">
              AI Tools<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-96 mt-2' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 rounded-2xl border border-border/40 bg-background/90 backdrop-blur-xl shadow-xl p-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            <Button className="mt-2 w-full rounded-xl" size="sm" asChild>
              <Link href="/tools">Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
