import test from "node:test";
import assert from "node:assert/strict";
import { duplicateLines, removeDuplicateLines } from "../src/core/deduplicate.js";

test("reports duplicate lines with positions", () => assert.deepEqual(duplicateLines("Alpha\nbeta\nalpha")[0].lines, [1, 3]));
test("removes later duplicate lines", () => assert.equal(removeDuplicateLines("Alpha\nbeta\nalpha"), "Alpha\nbeta"));
