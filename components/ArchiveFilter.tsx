"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import type { CaseStudy } from "@/lib/content";

export function ArchiveFilter({ items }: { items: CaseStudy[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const [active, setActive] = useState("All");
  const visible = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <section>
      <div className="filters" aria-label="Archive filters">
        {categories.map((category) => (
          <button
            className="filter-button"
            type="button"
            key={category}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            <Icons.Funnel size={15} weight="bold" aria-hidden /> {category}
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((item) => (
          <Link className="archive-row" href={`/work/${item.slug}`} key={item.slug}>
            <span className="status">{item.year} / {item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.deck}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
