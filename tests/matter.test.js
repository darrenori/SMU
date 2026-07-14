import test from "node:test";
import assert from "node:assert/strict";
import { createMatter, matterIsEmpty, matterLabel } from "../src/core/matter.js";

test("normalizes matter metadata", () => {
  const matter = createMatter({ name: "  Review  ", reference: "A-1" });
  assert.equal(matter.name, "Review");
  assert.equal(matterLabel(matter), "A-1 · Review");
});
test("recognizes the default matter", () => assert.equal(matterIsEmpty(createMatter()), true));
