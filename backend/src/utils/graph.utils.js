const { getSortedValues } = require("./edge.utils");

function createEmptyGraph() {
  return {
    nodes: new Set(),
    childrenByParent: new Map(),
    parentByChild: new Map(),
    undirectedNeighbors: new Map()
  };
}

function ensureNode(graph, node) {
  graph.nodes.add(node);

  if (!graph.childrenByParent.has(node)) {
    graph.childrenByParent.set(node, new Set());
  }

  if (!graph.undirectedNeighbors.has(node)) {
    graph.undirectedNeighbors.set(node, new Set());
  }
}

function addDirectedEdge(graph, parent, child) {
  ensureNode(graph, parent);
  ensureNode(graph, child);

  graph.childrenByParent.get(parent).add(child);
  graph.parentByChild.set(child, parent);
  graph.undirectedNeighbors.get(parent).add(child);
  graph.undirectedNeighbors.get(child).add(parent);
}

function getConnectedComponents(graph) {
  const visited = new Set();
  const components = [];

  for (const node of getSortedValues(graph.nodes)) {
    if (visited.has(node)) {
      continue;
    }

    const stack = [node];
    const component = new Set();
    visited.add(node);

    while (stack.length > 0) {
      const currentNode = stack.pop();
      component.add(currentNode);

      for (const neighbor of graph.undirectedNeighbors.get(currentNode) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    components.push(component);
  }

  return components;
}

function findRoot(component, graph) {
  const rootCandidates = getSortedValues(component).filter((node) => !graph.parentByChild.has(node));
  return rootCandidates[0] || getSortedValues(component)[0] || "";
}

function hasCycle(component, graph) {
  const visiting = new Set();
  const visited = new Set();

  function visit(node) {
    if (visiting.has(node)) {
      return true;
    }

    if (visited.has(node)) {
      return false;
    }

    visiting.add(node);

    for (const child of graph.childrenByParent.get(node) || []) {
      if (component.has(child) && visit(child)) {
        return true;
      }
    }

    visiting.delete(node);
    visited.add(node);
    return false;
  }

  for (const node of getSortedValues(component)) {
    if (visit(node)) {
      return true;
    }
  }

  return false;
}

function buildTreeFromRoot(root, graph) {
  const tree = {};
  const visited = new Set();

  function attach(node) {
    visited.add(node);
    const branch = {};
    const children = getSortedValues(graph.childrenByParent.get(node) || []);

    for (const child of children) {
      if (!visited.has(child)) {
        branch[child] = attach(child);
      }
    }

    visited.delete(node);
    return branch;
  }

  tree[root] = attach(root);
  return tree;
}

function calculateDepth(root, graph) {
  function measure(node) {
    const children = getSortedValues(graph.childrenByParent.get(node) || []);

    if (children.length === 0) {
      return 1;
    }

    return 1 + Math.max(...children.map((child) => measure(child)));
  }

  return measure(root);
}

module.exports = {
  createEmptyGraph,
  addDirectedEdge,
  getConnectedComponents,
  findRoot,
  hasCycle,
  buildTreeFromRoot,
  calculateDepth
};
