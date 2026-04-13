import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import Link from 'next/link';

const reader = createReader(process.cwd(), keystaticConfig);

export default function Blog({ posts }: { posts: { slug: string; title: string; date: string; description: string }[] }) {
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <header>
            <h3>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <span>{post.date}</span>
          </header>
          <section>
            <p>{post.description}</p>
          </section>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const slugs = await reader.collections.posts.list();
  const postEntries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.posts.read(slug);
      return { slug, entry };
    })
  );

  const posts = postEntries
    .filter(({ entry }) => entry !== null)
    .map(({ slug, entry }) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = entry!.date
        ? new Date(entry!.date).toLocaleDateString('en-US', options)
        : '';

      return {
        slug,
        title: entry!.title,
        date: formattedDate,
        description: entry!.description,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}
