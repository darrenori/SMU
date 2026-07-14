import test from "node:test";
import assert from "node:assert/strict";
import { searchEntries } from "../src/core/search.js";

const entries = [{ title: "Statutes", description: "Official legislation", tags: ["law"] }, { title: "Cases", description: "Judgments", tags: [] }];
test("returns all entries for an empty query", () => assert.equal(searchEntries(entries, "").length, 2));
test("ranks matching library entries", () => assert.equal(searchEntries(entries, "official legislation")[0].title, "Statutes"));
test("returns no unrelated entries", () => assert.equal(searchEntries(entries, "mediation").length, 0));
