const EDGE_PATTERN = /^([A-Z])->([A-Z])$/;

function normalizeEntry(value) {
  return typeof value === "string" ? value.trim() : String(value ?? "").trim();
}

function parseEdge(rawValue) {
  const edge = normalizeEntry(rawValue);
  const match = edge.match(EDGE_PATTERN);

  if (!match) {
    return {
      isValid: false,
      edge
    };
  }

  const parent = match[1];
  const child = match[2];

  if (parent === child) {
    return {
      isValid: false,
      edge
    };
  }

  return {
    isValid: true,
    edge,
    parent,
    child
  };
}

function getSortedValues(values) {
  return Array.from(values).sort((first, second) => first.localeCompare(second));
}

module.exports = {
  normalizeEntry,
  parseEdge,
  getSortedValues
};
