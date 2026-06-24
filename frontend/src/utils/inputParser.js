export const SAMPLE_INPUT = "A->B\nA->C\nB->D";

export function parseInput(value) {
  return value
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}
