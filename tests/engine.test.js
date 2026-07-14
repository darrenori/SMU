import test from "node:test";
import assert from "node:assert/strict";
import { createReply, formatWorkflow } from "../src/core/engine.js";
import { intakeWorkflow } from "../src/data/intake.js";

test("matches client intake requests", () => assert.match(createReply("Prepare a new client interview"), /Client intake/));
test("matches hearing preparation", () => assert.match(createReply("I need to prepare for a hearing"), /Hearing preparation/));
test("supports help command", () => assert.match(createReply("/help"), /Available commands/));
test("supports clear action", () => assert.deepEqual(createReply("/clear"), { action: "clear" }));
test("formats every workflow section", () => assert.equal((formatWorkflow(intakeWorkflow).match(/\d+\./g) || []).length, 5));
