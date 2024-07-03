const { withFaust, getWpHostname } = require('@faustwp/core')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: getWpHostname(),
        port: '',
        pathname: '/**',
      },
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/advertorial/:slug*',
        destination: '/partner-content/:slug*',
        permanent: true, // This indicates a 301 permanent redirect
      },
    ]
  },
})
