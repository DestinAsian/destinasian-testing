import { getWordPressProps, WordPressTemplate } from '@faustwp/core'
import { SEO } from '../components'

export default function Page(props) {
  const category = props?.__TEMPLATE_QUERY_DATA__?.category
  const tag = props?.__TEMPLATE_QUERY_DATA__?.tag

  const source = category || tag || {} // fallback to empty object to prevent errors

  const { categoryImages, seo, uri } = source ?? []

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={
          categoryImages?.categorySlide1?.length !== 0
            ? categoryImages?.categorySlide1?.mediaItemUrl
            : categoryImages?.categoryImages?.mediaItemUrl
        }
        url={uri}
        focuskw={seo?.focuskw}
      />
      <WordPressTemplate {...props} />
    </>
  )
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 1 })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
