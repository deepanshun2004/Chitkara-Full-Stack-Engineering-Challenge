import React from "react";
import { Activity, GitBranch, Network, ShieldAlert } from "lucide-react";

export function SummaryCards({ response }) {
  const summary = response?.summary || {
    total_trees: 0,
    total_cycles: 0,
    largest_tree_root: "-"
  };

  const cards = [
    { label: "Trees", value: summary.total_trees, icon: GitBranch },
    { label: "Cycles", value: summary.total_cycles, icon: ShieldAlert },
    { label: "Largest Root", value: summary.largest_tree_root || "-", icon: Network },
    { label: "Groups", value: response?.hierarchies?.length || 0, icon: Activity }
  ];

  return (
    <section className="stats-grid" aria-label="Hierarchy summary">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article className="stat-card" key={card.label}>
            <div className="stat-icon">
              <Icon size={20} />
            </div>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        );
      })}
    </section>
  );
}
