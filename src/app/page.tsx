import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolCard } from '@/components/tool-card';
import { CategoryCard } from '@/components/category-card';
import { getFeaturedTools, getAllCategories, getAllCollections } from '@/lib/data';

export const revalidate = 3600;

export default function HomePage() {
  const featuredTools = getFeaturedTools(8);
  const categories = getAllCategories().slice(0, 8);
  const collections = getAllCollections();

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>100+ AI Tools Curated for You</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover the Best{' '}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Explore our curated collection of 100+ AI tools for productivity, creativity, coding,
              writing, and more. Find the perfect AI tool for your needs.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/tools">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/collections/best-free-ai-tools">Browse Free Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">AI Tools</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">19</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Browse by Category</h2>
              <p className="mt-2 text-muted-foreground">Find tools organized by what they do best</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/tools">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Featured AI Tools</h2>
              <p className="mt-2 text-muted-foreground">Top-rated tools loved by thousands</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/tools">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">Curated Collections</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked tools for specific needs</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{collection.description}</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  View {collection.toolIds.length} tools
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to Explore?</h2>
            <p className="mt-4 text-muted-foreground">
              Discover the perfect AI tool for your workflow. Our directory is updated daily with the
              latest and greatest AI tools.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/tools">
                Explore All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
