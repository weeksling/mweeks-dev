import Head from 'next/head'
import Link from 'next/link'
import { getAllTags } from '../../lib/posts'
import styles from '../../styles/Home.module.css'

export default function Tags({ tags }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tags · Matt Weeks</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.hero}>
          <Link href="/">
            <a className={styles.link}>← Home</a>
          </Link>
          <h1 className={styles.title} style={{ marginTop: '1.5rem' }}>
            Tags
          </h1>
        </header>

        <ul className={styles.linkList}>
          {tags.map(({ tag, slug, count }) => (
            <li key={slug}>
              <Link href={`/tags/${slug}`}>
                <a className={styles.link}>{tag}</a>
              </Link>
              <span className={styles.linkNote}>({count})</span>
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

export async function getStaticProps() {
  return {
    props: {
      tags: getAllTags().map(({ tag, slug, posts }) => ({ tag, slug, count: posts.length })),
    },
  }
}
