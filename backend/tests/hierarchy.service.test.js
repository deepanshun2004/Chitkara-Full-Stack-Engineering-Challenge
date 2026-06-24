const { buildHierarchyResponse } = require("../src/services/hierarchy.service");

describe("hierarchy service", () => {
  test("builds a simple tree with depth", () => {
    const response = buildHierarchyResponse(["A->B", "A->C", "B->D"]);

    expect(response.hierarchies).toEqual([
      {
        root: "A",
        tree: {
          A: {
            B: {
              D: {}
            },
            C: {}
          }
        },
        depth: 3
      }
    ]);
    expect(response.summary).toEqual({
      total_trees: 1,
      total_cycles: 0,
      largest_tree_root: "A"
    });
  });

  test("supports multiple disconnected trees", () => {
    const response = buildHierarchyResponse(["A->B", "C->D"]);

    expect(response.hierarchies).toHaveLength(2);
    expect(response.summary.total_trees).toBe(2);
    expect(response.summary.largest_tree_root).toBe("A");
  });

  test("detects a pure cycle and omits depth", () => {
    const response = buildHierarchyResponse(["A->B", "B->C", "C->A"]);

    expect(response.hierarchies).toEqual([
      {
        root: "A",
        tree: {},
        has_cycle: true
      }
    ]);
    expect(response.hierarchies[0]).not.toHaveProperty("depth");
    expect(response.summary.total_cycles).toBe(1);
  });

  test("handles mixed cyclic and non-cyclic groups", () => {
    const response = buildHierarchyResponse(["A->B", "B->A", "C->D", "D->E"]);

    expect(response.summary).toEqual({
      total_trees: 1,
      total_cycles: 1,
      largest_tree_root: "C"
    });
  });

  test("records duplicate edges once while using the first edge", () => {
    const response = buildHierarchyResponse(["A->B", "A->B", "A->B", "B->C"]);

    expect(response.duplicate_edges).toEqual(["A->B"]);
    expect(response.hierarchies[0].depth).toBe(3);
  });

  test("keeps first parent and silently discards later parent assignments", () => {
    const response = buildHierarchyResponse(["A->D", "B->D", "D->E"]);

    expect(response.hierarchies).toEqual([
      {
        root: "A",
        tree: {
          A: {
            D: {
              E: {}
            }
          }
        },
        depth: 3
      }
    ]);
    expect(response.invalid_entries).toEqual([]);
  });

  test("collects invalid formats after trimming", () => {
    const response = buildHierarchyResponse(["hello", "1->2", "AB->C", "A-B", "A->", "A->A", ""]);

    expect(response.invalid_entries).toEqual(["hello", "1->2", "AB->C", "A-B", "A->", "A->A", ""]);
    expect(response.hierarchies).toEqual([]);
  });

  test("returns empty output for empty input", () => {
    const response = buildHierarchyResponse([]);

    expect(response.hierarchies).toEqual([]);
    expect(response.invalid_entries).toEqual([]);
    expect(response.duplicate_edges).toEqual([]);
    expect(response.summary).toEqual({
      total_trees: 0,
      total_cycles: 0,
      largest_tree_root: ""
    });
  });

  test("uses lexicographic root tie-breaker for equal depths", () => {
    const response = buildHierarchyResponse(["M->N", "A->B"]);

    expect(response.summary.largest_tree_root).toBe("A");
  });

  test("trims whitespace before validation and duplicate detection", () => {
    const response = buildHierarchyResponse([" A->B ", "A->B", " B->C "]);

    expect(response.duplicate_edges).toEqual(["A->B"]);
    expect(response.invalid_entries).toEqual([]);
    expect(response.hierarchies[0].depth).toBe(3);
  });
});
