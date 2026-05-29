export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="prose">
      <div className="eyebrow">About</div>
      <h1>Iver Iverson works where cyber investigation meets agent engineering.</h1>
      <p className="lede">
        I build practical systems for threat hunting, autonomous triage, model-facing knowledge,
        and cyber education. The through-line is making complex investigation work more structured,
        reviewable, and repeatable without outsourcing judgment to automation.
      </p>
      <h2>Positioning</h2>
      <p>
        My work centers on the operational layer between analyst intent and machine execution:
        KQL, Sentinel incidents, report ingestion, MCP resources, skill protocols, deterministic
        gates, and public-facing technical documentation.
      </p>
      <h2>Operating principles</h2>
      <ul>
        <li>Use AI agents to structure investigation work, not to erase analyst accountability.</li>
        <li>Prefer local-first and reproducible workflows when handling evidence-adjacent material.</li>
        <li>Make automation observable through artifacts, logs, briefs, and explicit failure states.</li>
        <li>Keep public writing precise: useful architecture, no sensitive operational detail.</li>
      </ul>
    </article>
  );
}
