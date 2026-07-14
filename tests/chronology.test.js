import test from "node:test";
import assert from "node:assert/strict";
import { chronologySummary, formatChronology, parseChronology, sortChronology } from "../src/core/chronology.js";

test("parses and sorts chronology rows", () => {
  const parsed = parseChronology("2026-07-14 | Later | Email\n2026-01-02 09:30 | Earlier | Letter");
  assert.equal(parsed.errors.length, 0);
  assert.equal(sortChronology(parsed.entries)[0].event, "Earlier");
  assert.match(formatChronology(parsed.entries), /^2026-01-02/);
});
test("reports invalid chronology rows", () => assert.equal(parseChronology("tomorrow - event").errors.length, 1));
test("summarises chronology sources", () => assert.deepEqual(chronologySummary(parseChronology("2026-01-01 | A | Email\n2026-01-02 | B | Email").entries), { count: 2, first: "2026-01-01", last: "2026-01-02", sources: 1 }));
