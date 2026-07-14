import test from "node:test";
import assert from "node:assert/strict";
import { validateDateInput, validateMatter } from "../src/core/validation.js";

test("requires a matter name", () => assert.equal(validateMatter({ name: "" }).valid, false));
test("accepts bounded matter fields", () => assert.equal(validateMatter({ name: "Review", reference: "A1" }).valid, true));
test("validates date calculation inputs", () => assert.deepEqual(validateDateInput({ start: "2026-07-14", days: "14" }).value.days, 14));
