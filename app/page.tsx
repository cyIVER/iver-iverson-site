import Link from "next/link";
import { CaseCard } from "@/components/CaseCard";
import { getCaseStudies, getWriting } from "@/lib/content";

export default function Home() {
  const cases = getCaseStudies().filter((item) => item.selected).slice(0, 6);
  const writing = getWriting().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">Authority site / AI-era cyber investigator</div>
          <h1>Investigation systems for the agentic security era.</h1>
          <p className="lede">
            I design cyber workflows where human judgment, telemetry, detection logic, and AI agents
            meet: threat hunting, Sentinel triage, MCP architecture, and cyber range education.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/work">Review selected work</Link>
            <Link className="button" href="/resume">Open resume dossier</Link>
          </div>
          <div className="metric-row">
            <div className="metric"><strong>6</strong><span>flagship case studies</span></div>
            <div className="metric"><strong>Static</strong><span>GitHub Pages export</span></div>
            <div className="metric"><strong>Agentic</strong><span>hunt, triage, and MCP systems</span></div>
          </div>
        </div>
        <aside className="dossier" aria-label="Investigation system map">
          <div className="dossier-header">
            <span>FIELD MAP</span>
            <span>PUBLIC / SANITIZED</span>
          </div>
          <div className="signal-map">
            <div className="signal-node">
              <strong>Telemetry and evidence</strong>
              <span>Sentinel incidents, Log Analytics, report ingestion, course-range signals.</span>
            </div>
            <div className="signal-node">
              <strong>Agent workflow layer</strong>
              <span>Codex/Gemini skills, MCP resources, deterministic gates, DAIR loops.</span>
            </div>
            <div className="signal-node">
              <strong>Analyst decision surface</strong>
              <span>Blueprints, KQL, triage briefs, findings, dashboards, and course interfaces.</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Selected work</div>
            <h2>Systems with evidence.</h2>
          </div>
          <p>Each case study states the problem, constraints, role, architecture, proof, and current status.</p>
        </div>
        <div className="grid">
          {cases.map((item) => <CaseCard item={item} key={item.slug} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Field notes</div>
            <h2>Writing starts close to the work.</h2>
          </div>
          <Link className="button" href="/writing">All notes</Link>
        </div>
        <div className="grid">
          {writing.map((post) => (
            <Link className="note-card" href={`/writing/${post.slug}`} key={post.slug}>
              <span className="status">{post.date} / {post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.deck}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
