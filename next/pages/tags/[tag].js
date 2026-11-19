import Head from 'next/head'
import Link from 'next/link'
import { getAllTags } from '../../lib/posts'
import styles from '../../styles/Home.module.css'

export default function Tag({ tag, posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{tag} · Matt Weeks</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.hero}>
          <Link href="/tags">
            <a className={styles.link}>← All tags</a>
          </Link>
          <h1 className={styles.title} style={{ marginTop: '1.5rem' }}>
            {posts.length} post{posts.length === 1 ? '' : 's'} tagged with “{tag}”
          </h1>
        </header>

        <ul className={styles.linkList}>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <a className={styles.link}>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Matt Weeks</p>
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().map(({ slug }) => ({ params: { tag: slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { tag, posts } = getAllTags().find(({ slug }) => slug === params.tag)
  return { props: { tag, posts } }
}
