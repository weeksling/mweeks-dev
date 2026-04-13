import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'
import styles from '../../styles/Home.module.css'

type PostSummary = {
  slug: string
  title: string
  description: string
  date: string | null
  formattedDate: string
}

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Writing · Matt Weeks</title>
        <meta
          name="description"
          content="Essays on writing, habits, code, and running — by Matt Weeks."
        />
      </Head>

      <main className={styles.main}>
        <header className={styles.hero}>
          <Link href="/" className={styles.link}>← Home</Link>
          <h1 className={styles.title} style={{ marginTop: '1.5rem' }}>
            Writing
          </h1>
          <p className={styles.tagline}>
            Essays from 2020–2023 on habits, tools, and the things I was trying
            to figure out.
          </p>
        </header>

        <section className={styles.section}>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <time className={styles.postDate} dateTime={post.date ?? undefined}>
                    {post.formattedDate}
                  </time>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.description ? (
                    <p className={styles.postDescription}>{post.description}</p>
                  ) : null}
                </Link>
              </li>
            ))}
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
