const { parseEdge } = require("../utils/edge.utils");
const config = require("../config");
const {
  createEmptyGraph,
  addDirectedEdge,
  getConnectedComponents,
  findRoot,
  hasCycle,
  buildTreeFromRoot,
  calculateDepth
} = require("../utils/graph.utils");

const PROFILE = {
  user_id: config.userId,
  email_id: config.emailId,
  college_roll_number: config.rollNumber
};

function buildHierarchyResponse(inputEntries) {
  const graph = createEmptyGraph();
  const invalidEntries = [];
  const seenEdges = new Set();
  const duplicateEdgeSet = new Set();

  for (const rawEntry of inputEntries) {
    const parsedEdge = parseEdge(rawEntry);

    if (!parsedEdge.isValid) {
      invalidEntries.push(parsedEdge.edge);
      continue;
    }

    if (seenEdges.has(parsedEdge.edge)) {
      duplicateEdgeSet.add(parsedEdge.edge);
      continue;
    }

    seenEdges.add(parsedEdge.edge);

    if (graph.parentByChild.has(parsedEdge.child)) {
      continue;
    }

    addDirectedEdge(graph, parsedEdge.parent, parsedEdge.child);
  }

  const hierarchies = getConnectedComponents(graph).map((component) => {
    const root = findRoot(component, graph);

    if (hasCycle(component, graph)) {
      return {
        root,
        tree: {},
        has_cycle: true
      };
    }

    return {
      root,
      tree: buildTreeFromRoot(root, graph),
      depth: calculateDepth(root, graph)
    };
  });

  hierarchies.sort((first, second) => first.root.localeCompare(second.root));

  const summary = buildSummary(hierarchies);

  return {
    ...PROFILE,
    hierarchies,
    invalid_entries: invalidEntries,
    duplicate_edges: Array.from(duplicateEdgeSet).sort((first, second) => first.localeCompare(second)),
    summary
  };
}

function buildSummary(hierarchies) {
  const nonCyclicTrees = hierarchies.filter((hierarchy) => !hierarchy.has_cycle);
  const cycleCount = hierarchies.length - nonCyclicTrees.length;

  let largestTreeRoot = "";
  let largestDepth = 0;

  for (const hierarchy of nonCyclicTrees) {
    if (
      hierarchy.depth > largestDepth ||
      (hierarchy.depth === largestDepth && hierarchy.root.localeCompare(largestTreeRoot) < 0)
    ) {
      largestDepth = hierarchy.depth;
      largestTreeRoot = hierarchy.root;
    }
  }

  return {
    total_trees: nonCyclicTrees.length,
    total_cycles: cycleCount,
    largest_tree_root: largestTreeRoot
  };
}

module.exports = {
  buildHierarchyResponse
};
