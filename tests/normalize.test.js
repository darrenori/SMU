import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMessage, normalizeWhitespace, slugify, tokenize } from "../src/core/normalize.js";

test("normalizes whitespace", () => assert.equal(normalizeWhitespace("  one\n  two "), "one two"));
test("tokenizes Singapore legal queries", () => assert.deepEqual(tokenize("Case-law: authority?"), ["case-law", "authority"]));
test("creates safe matter slugs", () => assert.equal(slugify("ACME / Supply Review"), "acme-supply-review"));
test("caps message length", () => assert.equal(normalizeMessage("x".repeat(2000)).length, 1200));
