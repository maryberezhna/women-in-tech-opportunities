export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://herhive.eu/sitemap.xml',
    host: 'https://herhive.eu',
  };
}
