import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link className="work-card" href={`/work/${item.slug}`}>
      <div className="status">{item.status}</div>
      <h3>{item.title}</h3>
      <p>{item.deck}</p>
      <div className="tag-list">
        {item.tags.slice(0, 4).map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
