// Every URL the Gatsby site served (and Google indexed) must still answer 200
// at the same path, without redirecting. Usage, against a running site:
//   node scripts/check-legacy-urls.mjs http://localhost:3000
import assert from 'assert'

const base = process.argv[2] || 'http://localhost:3000'

const same = [
  '/',
  '/blog/',
  '/blog/rss.xml',
  '/blog/2020-05-12-write-better-commits-with-semantic-commits/',
  '/blog/2020-05-13-adding-an-rss-feed-to-my-gatsby-site-to-automatically-cross-share-new-posts-to-dev-to/',
  '/blog/2020-09-27-why-i-write-morning-pages/',
  '/blog/2020-10-02-my-daily-journalling-routine/',
  '/blog/2020-10-14-How-to-add-a-Storybook-design-system-to-your-app/',
  '/blog/2020-10-19-my-budgeting-journey-—-going-from-broke-without-a-hope-to-financially-stable-and-a-regular-budgeter/',
  '/tags/',
  ...['best-practices', 'blogging', 'development', 'financial', 'gatsby', 'git', 'personal', 'react', 'storybook', 'writing']
    .map((tag) => `/tags/${tag}/`),
]
// Starter placeholder pages, permanently redirected home.
const gone = ['/contact/', '/contact/examples/', '/contact/file-upload/', '/contact/thanks/']

for (const path of same) {
  const res = await fetch(base + encodeURI(path), { redirect: 'manual' })
  assert.equal(res.status, 200, `${path} -> ${res.status} ${res.headers.get('location') || ''}`)
}
for (const path of gone) {
  const res = await fetch(base + path, { redirect: 'manual' })
  assert.equal(res.status, 308, `${path} -> ${res.status}`)
  assert.equal(new URL(res.headers.get('location'), base).pathname, '/', path)
}
console.log(`ok: ${same.length} legacy URLs served in place, ${gone.length} redirected home`)
