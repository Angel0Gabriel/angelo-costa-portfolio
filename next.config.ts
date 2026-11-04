import type {NextConfig} from 'next';
import path from 'node:path';

// Explicit request-config aliases retain next-intl's runtime integration without
// loading its optional message-extraction compiler (native SWC) on Windows.
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: {resolveAlias: {'next-intl/config': './src/i18n/request.ts'}},
  webpack(config) {
    config.resolve.alias['next-intl/config'] = path.resolve('./src/i18n/request.ts');
    return config;
  },
  async redirects() { return [{source: '/', destination: '/en', permanent: true}]; }
};
export default config;
