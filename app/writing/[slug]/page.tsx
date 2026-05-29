import { notFound } from "next/navigation";
import { getWriting, getWritingPost, renderMarkdown } from "@/lib/content";

export function generateStaticParams() {
  return getWriting().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWriting().find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.deck } : {};
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const known = getWriting().some((item) => item.slug === slug);
  if (!known) notFound();
  const post = getWritingPost(slug);
  const html = await renderMarkdown(post.body);

  return (
    <article className="prose">
      <div className="eyebrow">{post.category} / {post.date}</div>
      <h1>{post.title}</h1>
      <p className="lede">{post.deck}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
