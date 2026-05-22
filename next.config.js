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
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    unoptimized: true,
    remotePatterns: IMAGE_HOSTNAMES.map((hostname) => ({
      protocol: 'https',
      hostname,
      port: '',
      pathname: '/**',
    })),
  },
})
