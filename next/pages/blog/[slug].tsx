import { createReader } from '@keystatic/core/reader';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

type PostProps = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

export default function Post({ title, date, description, tags, content }: PostProps) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast);
  const rendered = Markdoc.renderers.react(transformed, React);

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <span>{date}</span>
        {tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <span key={tag} style={{ marginRight: '0.5rem' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        {description && <p><em>{description}</em></p>}
      </header>
      <section>{rendered}</section>
    </article>
  );
}

export async function getStaticPaths() {
  const slugs = await reader.collections.posts.list();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const entry = await reader.collections.posts.read(params.slug, {
    resolveLinkedFiles: true,
  });

  if (!entry) {
    return { notFound: true };
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString('en-US', options)
    : '';

  // Serialize the markdoc content as a string for the page
  const contentNode = (entry as any).content;
  let contentString = '';
  if (contentNode && contentNode.node) {
    contentString = Markdoc.format(contentNode.node);
  } else if (typeof contentNode === 'string') {
    contentString = contentNode;
  }

  return {
    props: {
      title: entry.title,
      date: formattedDate,
      description: entry.description,
      tags: entry.tags || [],
      content: contentString,
    },
  };
}
