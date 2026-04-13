import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../lib/posts'
import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Matt Weeks</title>
        <meta
          name="description"
          content="Notes on writing, habits, code, and running — by Matt Weeks."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Matt Weeks</h1>
          <p className={styles.tagline}>
            Notes on writing, habits, code, and running.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Writing</h2>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/blog/${post.slug}`}>
                  <a className={styles.postLink}>
                    <time className={styles.postDate} dateTime={post.date}>
                      {post.formattedDate}
                    </time>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    {post.description ? (
                      <p className={styles.postDescription}>{post.description}</p>
                    ) : null}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Elsewhere</h2>
          <ul className={styles.linkList}>
            <li>
              <Link href="/training">
                <a className={styles.link}>Training</a>
              </Link>
              <span className={styles.linkNote}>— marathon prep &amp; Strava feed</span>
            </li>
            <li>
              <a
                className={styles.link}
                href="https://github.com/weeksling"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Matt Weeks</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } }
}
