import test from "node:test";
import assert from "node:assert/strict";
import { diffLines, diffStats, formatDiff } from "../src/core/line-diff.js";

test("computes stable line changes", () => {
  const changes = diffLines("alpha\nbeta", "alpha\ngamma");
  assert.deepEqual(diffStats(changes), { same: 1, added: 1, removed: 1 });
  assert.match(formatDiff(changes), /- beta[\s\S]*\+ gamma/);
});
test("handles empty input", () => assert.equal(diffLines("", "")[0].type, "same"));
