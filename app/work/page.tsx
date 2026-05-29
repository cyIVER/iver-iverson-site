import { CaseCard } from "@/components/CaseCard";
import { getCaseStudies } from "@/lib/content";

export const metadata = { title: "Work" };

export default function WorkPage() {
  const items = getCaseStudies();
  return (
    <>
      <section className="section">
        <div className="eyebrow">Work</div>
        <h1>Selected cyber, agent, and education systems.</h1>
        <p className="lede">Flagship case studies are first. Supporting archive work remains discoverable without pretending every item is equally mature.</p>
      </section>
      <div className="grid">
        {items.map((item) => <CaseCard item={item} key={item.slug} />)}
      </div>
    </>
  );
}
