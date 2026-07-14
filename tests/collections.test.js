import test from "node:test";
import assert from "node:assert/strict";
import { groupBy, partition, stableUnique } from "../src/core/collections.js";

test("groups values by selector", () => assert.equal(groupBy([{ type: "a" }, { type: "a" }], "type").get("a").length, 2));
test("keeps stable unique values", () => assert.deepEqual(stableUnique([1, 2, 1]), [1, 2]));
test("partitions matching values", () => assert.deepEqual(partition([1, 2, 3], (n) => n % 2), [[1, 3], [2]]));
