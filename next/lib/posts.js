import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POST_EXTENSION_REGEX = /\.(md|mdx)$/
const POST_EXTENSIONS = ['.md', '.mdx']

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

function isPostFilename(filename) {
  return POST_EXTENSION_REGEX.test(filename)
}

function stripPostExtension(filename) {
  return filename.replace(POST_EXTENSION_REGEX, '')
}

function toPostMeta(filename, data) {
  const slug = stripPostExtension(filename)
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
  const filenames = fs.readdirSync(dir).filter(isPostFilename)

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
    .filter(isPostFilename)
    .map(stripPostExtension)
}

export function getPostBySlug(slug) {
  const dir = getPostsDir()
  const filePath = POST_EXTENSIONS.map((ext) => path.join(dir, `${slug}${ext}`)).find(
    (candidatePath) => fs.existsSync(candidatePath)
  )
  if (!filePath) {
    throw new Error(`Post not found for slug "${slug}"`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    content,
    frontmatter: toPostMeta(path.basename(filePath), data),
  }
}
