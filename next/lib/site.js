// Canonical origin. Kept free of Node imports so client code can use it too.
export const SITE_URL = 'https://mweeks.dev'

// Matches the slugs lodash.kebabCase gave the Gatsby site, so the indexed
// /tags/<slug>/ URLs keep working.
export function tagSlug(tag) {
  return tag.toLowerCase().trim().replace(/\s+/g, '-')
}
