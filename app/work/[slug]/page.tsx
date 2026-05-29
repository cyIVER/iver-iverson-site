import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseDiagram } from "@/components/CaseDiagram";
import { getCaseStudies, getCaseStudy, renderMarkdown } from "@/lib/content";
import { withBasePath } from "@/lib/site";

export function generateStaticParams() {
  return getCaseStudies().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCaseStudies().find((entry) => entry.slug === slug);
  return item ? { title: item.title, description: item.deck } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const known = getCaseStudies().some((item) => item.slug === slug);
  if (!known) notFound();
  const item = getCaseStudy(slug);
  const html = await renderMarkdown(item.body);

  return (
    <>
      <section className="section">
        <div className="eyebrow">{item.category} / {item.year}</div>
        <h1>{item.title}</h1>
        <p className="lede">{item.deck}</p>
        <div className="meta-row">
          <div className="meta-box"><strong>Role</strong><span>{item.role}</span></div>
          <div className="meta-box"><strong>Status</strong><span>{item.status}</span></div>
          <div className="meta-box"><strong>Proof</strong><span>{item.artifact}</span></div>
        </div>
      </section>
      <div className="case-layout">
        <article>
          <CaseDiagram nodes={item.diagram} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <aside className="sticky-panel">
          <strong>Supporting artifact</strong>
          <p>{item.artifact}</p>
          <Link className="button" href={withBasePath(`/artifacts/${item.slug}.md`)}>Open artifact note</Link>
          <div className="tag-list">
            {item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
          </div>
        </aside>
      </div>
    </>
  );
}
