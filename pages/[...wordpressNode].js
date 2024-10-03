import { getWordPressProps, WordPressTemplate } from '@faustwp/core'

export default function Page(props) {
  return <WordPressTemplate {...props} />
}

export function getServerSideProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 1 })
}

export async function getServerSidePaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
