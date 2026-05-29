import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { withBasePath } from "@/lib/site";

export const metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <>
      <section className="section">
        <div className="eyebrow">Resume</div>
        <h1>Cyber investigation, agent systems, and technical platform work.</h1>
        <p className="lede">
          Resume materials are provided as static downloads for review. The interactive timeline
          highlights the public portfolio narrative without inventing unsupported metrics.
        </p>
        <div className="hero-actions">
          <Link className="button primary" href={withBasePath("/downloads/iver-iverson-resume.pdf")}>
            PDF
          </Link>
          <Link className="button" href={withBasePath("/downloads/iver-iverson-resume.md")}>
            Markdown
          </Link>
          <Link className="button" href={withBasePath("/downloads/iver-iverson-resume.txt")}>
            Text
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Timeline</div>
            <h2>Career signal.</h2>
          </div>
          <p>Expandable, static-export friendly, and intentionally conservative about claims.</p>
        </div>
        <Timeline />
      </section>
    </>
  );
}
