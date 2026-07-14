import test from "node:test";
import assert from "node:assert/strict";
import { addCalendarDays, addWeekdays, deadlinePlanningNote } from "../src/core/deadlines.js";

test("adds calendar days", () => assert.equal(addCalendarDays("2026-07-01", 14).getDate(), 15));
test("skips weekends when adding weekdays", () => assert.equal(addWeekdays("2026-07-10", 1).getDay(), 1));
test("deadline output includes verification warning", () => assert.match(deadlinePlanningNote({ start: "2026-07-01", days: 7 }), /Confirm the triggering event/));
test("rejects invalid dates", () => assert.throws(() => addCalendarDays("not-a-date", 2), /valid date/));
