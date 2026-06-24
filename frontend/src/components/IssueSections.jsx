export function IssueSections({ invalidEntries = [], duplicateEdges = [] }) {
  return (
    <section className="issue-grid">
      <IssueCard title="Invalid Entries" items={invalidEntries} emptyText="No invalid entries found." />
      <IssueCard title="Duplicate Edges" items={duplicateEdges} emptyText="No duplicate edges found." />
    </section>
  );
}

function IssueCard({ title, items, emptyText }) {
  return (
    <article className="panel issue-card">
      <div className="panel-heading compact">
        <h2>{title}</h2>
        <span className="count-badge">{items.length}</span>
      </div>
      {items.length > 0 ? (
        <div className="chip-list">
          {items.map((item, index) => (
            <span className="data-chip" key={`${item}-${index}`}>
              {item === "" ? "(empty string)" : item}
            </span>
          ))}
        </div>
      ) : (
        <p className="muted">{emptyText}</p>
      )}
    </article>
  );
}
