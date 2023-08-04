import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 1 }, {notFound: true});
}

export async function getServerSidePaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
