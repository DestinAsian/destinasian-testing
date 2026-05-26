const { withFaust, getWpHostname } = require('@faustwp/core')

const IMAGE_HOSTNAMES = [
  getWpHostname(),
  'staging.destinasian.com',
  'testing.destinasian.com',
  'destinasian.com',
  'www.destinasian.com',
]

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    remotePatterns: IMAGE_HOSTNAMES.map((hostname) => ({
      protocol: 'https',
      hostname,
      port: '',
      pathname: '/**',
    })),
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/advertorial/:slug*', // All advertorial slug redirect to partner-content
        destination: '/partner-content/:slug*',
        permanent: true, // This indicates a 301 permanent redirect
      },
      {
        source: '/category/:slug*', // All category slug redirect
        destination: '/travel-guide/:slug*',
        permanent: true, // This indicates a 301 permanent redirect
      },
    ]
  },
})