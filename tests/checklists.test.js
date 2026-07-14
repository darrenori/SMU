import test from "node:test";
import assert from "node:assert/strict";
import { checklistProgress, toggleChecklistItem } from "../src/core/checklists.js";

const items = [{ id: "a" }, { id: "b" }];
test("calculates checklist completion", () => assert.deepEqual(checklistProgress(items, ["a"]), { done: 1, total: 2, percent: 50 }));
test("toggles checklist identifiers", () => assert.deepEqual(toggleChecklistItem(["a"], "a"), []));
