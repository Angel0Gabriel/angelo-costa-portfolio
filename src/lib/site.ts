const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.SITE_URL ||
  (productionUrl ? `https://${productionUrl}` : 'http://localhost:3000')
).replace(/\/$/, '');
