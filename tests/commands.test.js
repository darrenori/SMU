import test from "node:test";
import assert from "node:assert/strict";
import { commandList, parseCommand } from "../src/core/commands.js";

test("parses command arguments", () => assert.deepEqual(parseCommand("/research contract interpretation"), { name: "/research", args: ["contract", "interpretation"], known: true }));
test("ignores regular messages", () => assert.equal(parseCommand("research this"), null));
test("lists privacy and clear commands", () => assert.match(commandList(), /\/privacy[\s\S]*\/clear/));
