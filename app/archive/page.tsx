import { ArchiveFilter } from "@/components/ArchiveFilter";
import { getCaseStudies } from "@/lib/content";

export const metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <>
      <section className="section">
        <div className="eyebrow">Archive</div>
        <h1>Full public work index.</h1>
        <p className="lede">Selected work appears first across the site. This archive keeps supporting projects discoverable with client-side filtering and no server runtime.</p>
      </section>
      <ArchiveFilter items={getCaseStudies()} />
    </>
  );
}
