import Link from "next/link";
import { getWriting } from "@/lib/content";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  const posts = getWriting();
  return (
    <>
      <section className="section">
        <div className="eyebrow">Writing</div>
        <h1>Technical field notes.</h1>
        <p className="lede">Short, public-facing notes on threat hunting, AI misuse investigation, agentic workflows, MCP/context engineering, and triage lessons.</p>
      </section>
      <div className="grid">
        {posts.map((post) => (
          <Link className="note-card" href={`/writing/${post.slug}`} key={post.slug}>
            <span className="status">{post.date} / {post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.deck}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
