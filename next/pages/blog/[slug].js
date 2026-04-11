import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkGfm from 'remark-gfm'
import { getAllSlugs, getPostBySlug } from '../../lib/posts'
import styles from '../../styles/Home.module.css'
import postStyles from '../../styles/Post.module.css'

export default function Post({ source, frontmatter }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{frontmatter.title} · Matt Weeks</title>
        {frontmatter.description ? (
          <meta name="description" content={frontmatter.description} />
        ) : null}
      </Head>

      <main className={styles.main}>
        <nav className={postStyles.nav}>
          <Link href="/">
            <a className={styles.link}>← Home</a>
          </Link>
        </nav>

        <article className={postStyles.article}>
          <header className={postStyles.header}>
            {frontmatter.formattedDate ? (
              <time className={postStyles.date} dateTime={frontmatter.date}>
                {frontmatter.formattedDate}
              </time>
            ) : null}
            <h1 className={postStyles.title}>{frontmatter.title}</h1>
          </header>

          <div className={postStyles.body}>
            <MDXRemote {...source} />
          </div>
        </article>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Matt Weeks</p>
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getPostBySlug(params.slug)
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })
  return {
    props: {
      source,
      frontmatter,
    },
  }
}
