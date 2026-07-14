import test from "node:test";
import assert from "node:assert/strict";
import { extractReferences, referenceSummary, uniqueReferences } from "../src/core/references.js";

test("extracts Singapore neutral citations and sections", () => {
  const refs = extractReferences("See [2024] SGCA 1 at section 12(2) and s. 4A.");
  assert.deepEqual(refs.map(({ type }) => type), ["citation", "section", "section"]);
});
test("removes duplicate references", () => assert.equal(uniqueReferences("s 3 and s 3").length, 1));
test("summarises reference counts", () => assert.deepEqual(referenceSummary("[2025] SGHC 4, section 9").total, 2));
