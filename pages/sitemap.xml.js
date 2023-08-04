// In pages/sitemap.xml.js:
import { getSitemapProps } from '@faustwp/core'

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    frontendUrl: process.env.FRONTEND_URL,
  })
}
