import { AlertTriangle, GitFork } from "lucide-react";
import { TreeNode } from "./TreeNode.jsx";

export function HierarchyCards({ hierarchies = [] }) {
  if (hierarchies.length === 0) {
    return (
      <section className="panel empty-state">
        <GitFork size={32} />
        <h2>No hierarchies yet</h2>
        <p>Submit edges to generate connected groups, tree depth, and cycle detection.</p>
      </section>
    );
  }

  return (
    <section className="hierarchy-grid">
      {hierarchies.map((hierarchy) => {
        const rootChildren = hierarchy.tree?.[hierarchy.root] || {};

        return (
          <article className="panel hierarchy-card" key={`${hierarchy.root}-${hierarchy.has_cycle ? "cycle" : "tree"}`}>
            <div className="hierarchy-header">
              <div>
                <span className="eyebrow">Root {hierarchy.root}</span>
                <h3>{hierarchy.has_cycle ? "Cycle Detected" : `Depth ${hierarchy.depth}`}</h3>
              </div>
              {hierarchy.has_cycle ? (
                <span className="status-badge danger">
                  <AlertTriangle size={16} />
                  Cycle
                </span>
              ) : (
                <span className="status-badge">Tree</span>
              )}
            </div>

            {hierarchy.has_cycle ? (
              <div className="cycle-box">This connected group contains a cycle, so the tree is intentionally empty.</div>
            ) : (
              <div className="tree-view">
                <TreeNode name={hierarchy.root} childrenMap={rootChildren} />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
