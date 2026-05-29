export function CaseDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className="diagram" aria-label="Project architecture diagram">
      <div className="diagram-grid">
        {nodes.map((node, index) => {
          const [title, body] = node.split(":");
          return (
            <div className="diagram-box" key={node}>
              <strong>{index + 1}. {title}</strong>
              <span>{body || "Project system component"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
