import { getWordPressProps, WordPressTemplate } from '@faustwp/core'
import dynamic from 'next/dynamic'
// Import Components
const SEO = dynamic(() => import('@/components/SEO/SEO'))

export default function Page(props) {
  const page = props?.__TEMPLATE_QUERY_DATA__?.page

  const source = page || {} // fallback to empty object to prevent errors

  const { featuredImage, seo, uri } = source ?? []

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={featuredImage?.node?.sourceUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <WordPressTemplate {...props} />
    </>
  )
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 300 })
}
