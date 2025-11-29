import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ToolCard } from '@/components/tool-card';
import { getAllCollections, getCollectionBySlug, getToolsForCollection } from '@/lib/data';

interface CollectionPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const collections = getAllCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: collection.title,
    description: collection.metaDescription,
    openGraph: {
      title: `${collection.title} - AI Tools Hub`,
      description: collection.metaDescription,
      type: 'website',
    },
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) {
    notFound();
  }

  const tools = getToolsForCollection(params.slug);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">{collection.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{collection.description}</p>
      </div>

      <div className="mb-4 text-sm text-muted-foreground">{tools.length} tools in this collection</div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
