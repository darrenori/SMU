import test from "node:test";
import assert from "node:assert/strict";
import { createStorage } from "../src/core/storage.js";

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
}

test("round trips local values", () => {
  const storage = createStorage(memoryStorage());
  assert.equal(storage.set("matter", { id: 1 }), true);
  assert.deepEqual(storage.get("matter"), { id: 1 });
  assert.equal(storage.remove("matter"), true);
  assert.equal(storage.get("matter", "missing"), "missing");
});
test("fails closed when storage throws", () => assert.equal(createStorage({ getItem() { throw new Error(); } }).get("x", 3), 3));
