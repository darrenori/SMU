import test from "node:test";
import assert from "node:assert/strict";
import { missingTemplateFields, renderTemplate, templateFields } from "../src/core/templates.js";

test("renders nested template fields", () => assert.equal(renderTemplate("Matter {{matter.name}}", { matter: { name: "Review" } }), "Matter Review"));
test("lists unique fields", () => assert.deepEqual(templateFields("{{a}} {{a}} {{b}}"), ["a", "b"]));
test("reports missing values", () => assert.deepEqual(missingTemplateFields("{{a}} {{b}}", { a: 1 }), ["b"]));
