import Head from 'next/head'

export default function Custom404() {
  const destination = process.env.FRONTEND_URL || '/'

  return (
    <Head>
      <title>Redirecting...</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
    </Head>
  )
}
