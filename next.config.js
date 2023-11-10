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
    domains: [
      getWpHostname(),
      'localhost',
      process.env.NEXT_PUBLIC_WORDPRESS_URL,
    ],
    allowFutureImage: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
