import test from "node:test";
import assert from "node:assert/strict";
import { chronologyToCsv, rowsToCsv } from "../src/core/csv.js";

test("escapes CSV fields", () => assert.equal(rowsToCsv([{ name: "A, B" }]), 'name\r\n"A, B"'));
test("exports chronology columns", () => assert.match(chronologyToCsv([{ date: "2026-01-01", event: "Notice", source: "Email" }]), /^Date,Time,Event,Source/));
