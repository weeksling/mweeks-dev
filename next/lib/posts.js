import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// The content directory lives at the repo root so it can be shared
// between the Next site, the Gatsby site, and any git-based CMS.
// On Vercel, process.cwd() is the Next project root (next/), so the
// content lives one level up. Locally the same relative path works.
// Fall back to an in-project copy if someone runs this from elsewhere.
export function getPostsDir() {
  const candidates = [
    path.join(process.cwd(), '..', 'content', 'posts'),
    path.join(process.cwd(), 'content', 'posts'),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error(
    `content/posts directory not found. Looked in:\n  ${candidates.join('\n  ')}`
  )
}

function toPostMeta(filename, data) {
  const slug = filename.replace(/\.md$/, '')
  const dateValue = data.date ? new Date(data.date) : null
  const date = dateValue ? dateValue.toISOString() : null
  const formattedDate = dateValue
    ? dateValue.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date,
    formattedDate,
    tags: Array.isArray(data.tags) ? data.tags : [],
  }
}

export function getAllPosts() {
  const dir = getPostsDir()
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))

  const posts = filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data } = matter(raw)
    return toPostMeta(filename, data)
  })

  posts.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date < b.date ? 1 : -1
  })

  return posts
}

export function getAllSlugs() {
  const dir = getPostsDir()
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getPostBySlug(slug) {
  const dir = getPostsDir()
  const filePath = path.join(dir, `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    content,
    frontmatter: toPostMeta(`${slug}.md`, data),
  }
}
