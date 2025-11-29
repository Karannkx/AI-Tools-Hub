import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, ExternalLink, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolCard } from '@/components/tool-card';
import { ToolLogo } from '@/components/tool-logo';
import { getAllTools, getToolBySlug, getRelatedTools } from '@/lib/data';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - AI Tool Review`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Tools Hub`,
      description: tool.description,
      type: 'article',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool, 4);

  const getPricingVariant = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'success';
      case 'freemium':
        return 'info';
      case 'paid':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/tools"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Tools
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted flex items-center justify-center">
                <ToolLogo logoUrl={tool.logoUrl} name={tool.name} size={80} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold sm:text-3xl">{tool.name}</h1>
                  <Badge variant={getPricingVariant(tool.pricing)}>{tool.pricing}</Badge>
                </div>
                <p className="mt-1 text-muted-foreground">{tool.category}</p>
                {tool.rating && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(tool.rating!)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{tool.rating}</span>
                    {tool.reviewCount && (
                      <span className="text-muted-foreground">
                        ({tool.reviewCount.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">About {tool.name}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {tool.longDescription || tool.description}
              </p>
            </div>

            {tool.features && tool.features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Key Features</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.tags && tool.tags.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Tags</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border bg-card p-6">
            <h3 className="font-semibold">Get Started</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Visit {tool.name} to start using this AI tool.
            </p>
            <Button className="mt-4 w-full" asChild>
              <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <div className="mt-6 space-y-4 border-t pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{tool.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pricing</span>
                <span className="font-medium">{tool.pricing}</span>
              </div>
              {tool.rating && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{tool.rating}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {relatedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Related Tools</h2>
          <p className="mt-2 text-muted-foreground">Other tools in {tool.category}</p>
          <Suspense fallback={<div className="mt-6 text-muted-foreground">Loading related tools...</div>}>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((relatedTool) => (
                <ToolCard key={relatedTool.id} tool={relatedTool} />
              ))}
            </div>
          </Suspense>
        </div>
      )}
    </div>
  );
}
