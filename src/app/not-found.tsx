import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl" />
        <h1 className="relative text-9xl font-bold text-primary">404</h1>
      </div>
      <h2 className="mt-8 text-2xl font-bold sm:text-3xl">Page Not Found</h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
        you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/tools">
            <Search className="mr-2 h-4 w-4" />
            Browse Tools
          </Link>
        </Button>
      </div>
    </div>
  );
}
