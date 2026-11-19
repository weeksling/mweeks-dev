// Writes public/blog/rss.xml (same URL the Gatsby feed had; dev.to imports from it)
// and public/sitemap.xml. Runs before `next build`.
// Needs Node >= 22: it imports lib/*.js, which are ES modules in a typeless package.
import fs from 'fs'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server.js'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getAllTags, getPostBySlug } from '../lib/posts.js'
import { SITE_URL } from '../lib/site.js'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const postUrl = (slug) => `${SITE_URL}/blog/${encodeURI(slug)}/`

const posts = getAllPosts()

const items = await Promise.all(
  posts.map(async (post) => {
    const source = await serialize(getPostBySlug(post.slug).content, {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    })
    const html = renderToStaticMarkup(React.createElement(MDXRemote, source))
      // feed readers need absolute URLs
      .replace(/(src|href)="\//g, `$1="${SITE_URL}/`)
      .replace(/]]>/g, ']]&gt;')
    return `<item>
<title>${esc(post.title)}</title>
<description>${esc(post.description)}</description>
<link>${postUrl(post.slug)}</link>
<guid isPermaLink="true">${postUrl(post.slug)}</guid>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
<content:encoded><![CDATA[${html}]]></content:encoded>
</item>`
  })
)

fs.mkdirSync('public/blog', { recursive: true })
fs.writeFileSync(
  'public/blog/rss.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
<channel>
<title>Matt Weeks</title>
<description>Notes on writing, habits, code, and running.</description>
<link>${SITE_URL}</link>
${items.join('\n')}
</channel>
</rss>
`
)

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/blog/`,
  `${SITE_URL}/tags/`,
  `${SITE_URL}/training/`,
  ...posts.map((post) => postUrl(post.slug)),
  ...getAllTags().map(({ slug }) => `${SITE_URL}/tags/${slug}/`),
]
fs.writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`
)

console.log(`feeds: ${items.length} posts in rss.xml, ${urls.length} urls in sitemap.xml`)
