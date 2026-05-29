"use client";

import { useState } from "react";
import { Icons } from "@/components/Icons";
import { timeline } from "@/lib/timeline";

export function Timeline() {
  const [open, setOpen] = useState(timeline[0]?.date);

  return (
    <div className="timeline" aria-label="Career timeline">
      {timeline.map((item) => (
        <article className="timeline-item" key={item.date}>
          <time>{item.date}</time>
          <div>
            <button
              className="filter-button"
              type="button"
              aria-expanded={open === item.date}
              onClick={() => setOpen(open === item.date ? "" : item.date)}
            >
              <Icons.GitBranch size={16} weight="bold" aria-hidden /> {item.title}
            </button>
            {open === item.date ? <p>{item.body}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
