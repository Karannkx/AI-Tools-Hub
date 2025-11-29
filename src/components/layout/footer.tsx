import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';

const footerLinks = {
  discover: [
    { href: '/tools', label: 'All Tools' },
    { href: '/collections/best-free-ai-tools', label: 'Free Tools' },
    { href: '/collections/top-ai-image-generators', label: 'Image Generators' },
    { href: '/collections/top-ai-coding-tools', label: 'Coding Tools' },
  ],
  categories: [
    { href: '/tools?category=chatbots-assistants', label: 'Chatbots' },
    { href: '/tools?category=writing-content', label: 'Writing' },
    { href: '/tools?category=video-generation', label: 'Video' },
    { href: '/tools?category=productivity', label: 'Productivity' },
  ],
  resources: [
    { href: '/collections/best-ai-tools-for-students', label: 'For Students' },
    { href: '/collections/best-free-ai-tools', label: 'Free AI Tools' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10">
                <img 
                  src="https://i0.wp.com/aitoolsarena.com/wp-content/uploads/2023/02/cropped-AI-Tools-Arena-512.png?fit=512%2C512&ssl=1"
                  alt="AI Tools Hub Logo"
                  className="h-full w-full object-cover p-0.5"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                AI Tools<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover the best AI tools to supercharge your productivity, creativity, and workflow.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://x.com/karannkx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/karannkx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Discover</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Tools Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
