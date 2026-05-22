import { getWordPressProps, WordPressTemplate } from '@faustwp/core'
import dynamic from 'next/dynamic'
// Import Components
const SEO = dynamic(() => import('@/components/SEO/SEO'))
const WORDPRESS_GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, '')}/index.php?graphql`

export default function Page(props) {
  const {
    advertorial,
    category,
    contest,
    editorial,
    honorsCircle,
    luxeList,
    luxuryTravel,
    readersChoiceAward,
    travelGuide,
    page,
    post,
    tag,
    update,
  } = props?.__TEMPLATE_QUERY_DATA__ ?? {}

  const source =
    advertorial ||
    category ||
    contest ||
    editorial ||
    honorsCircle ||
    luxeList ||
    luxuryTravel ||
    readersChoiceAward ||
    travelGuide ||
    page ||
    post ||
    tag ||
    update ||
    {}

  const { categoryImages, featuredImage, seo, uri } = source ?? {}

  // Determine imageUrl: use categoryImages for tag or category, else use featuredImage
  const isTagOrCategory = !!(tag || category)

  const imageUrl = isTagOrCategory
    ? categoryImages?.categorySlide1?.mediaItemUrl?.length
      ? categoryImages.categorySlide1.mediaItemUrl
      : categoryImages?.categoryImages?.mediaItemUrl
    : featuredImage?.node?.sourceUrl ?? ''

  return (
    <>
      <SEO
        title={seo?.title}
        description={seo?.metaDesc}
        imageUrl={imageUrl}
        url={uri}
        focuskw={seo?.focuskw}
      />
      <WordPressTemplate {...props} />
    </>
  )
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: false })
}

export async function getStaticPaths() {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const pathSet = new Set()
  let hasNextPage = true
  let after = null
  let iterations = 0
  const MAX_ITERATIONS = 100

  while (hasNextPage && iterations < MAX_ITERATIONS) {
    iterations += 1
    const previousCursor = after
    const response = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetContentNodeUris($first: Int!, $after: String) {
            contentNodes(first: $first, after: $after) {
              nodes {
                uri
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,
        variables: {
          first: 100,
          after,
        },
      }),
    })

    const payload = await response.json().catch(() => ({}))
    const nodes = payload?.data?.contentNodes?.nodes ?? []
    const pageInfo = payload?.data?.contentNodes?.pageInfo ?? {}

    nodes.forEach((node) => {
      const uri = node?.uri

      if (!uri || uri === '/') {
        return
      }

      pathSet.add(uri.replace(/^\/|\/$/g, ''))
    })

    hasNextPage = !!pageInfo?.hasNextPage
    after = pageInfo?.endCursor ?? null

    if (hasNextPage && (!after || after === previousCursor)) {
      break
    }
  }

  const paths = Array.from(pathSet).map((path) => ({
    params: {
      wordpressNode: path.split('/'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
