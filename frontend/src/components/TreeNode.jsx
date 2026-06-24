import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function TreeNode({ name, childrenMap, level = 0 }) {
  const childEntries = Object.entries(childrenMap || {});
  const [expanded, setExpanded] = useState(true);
  const hasChildren = childEntries.length > 0;

  return (
    <div className="tree-node" style={{ "--level": level }}>
      <div className="tree-node-row">
        <button
          className="tree-toggle"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          disabled={!hasChildren}
          aria-label={expanded ? `Collapse ${name}` : `Expand ${name}`}
        >
          {hasChildren ? expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} /> : <span />}
        </button>
        <span className="node-pill">{name}</span>
      </div>

      {expanded && hasChildren ? (
        <div className="tree-children">
          {childEntries.map(([childName, grandChildren]) => (
            <TreeNode key={childName} name={childName} childrenMap={grandChildren} level={level + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
