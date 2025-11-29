/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ai-tools-hub.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
};
