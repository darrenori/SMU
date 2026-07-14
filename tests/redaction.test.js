import test from "node:test";
import assert from "node:assert/strict";
import { findSensitiveData, redactSensitiveData, sensitiveDataSummary } from "../src/core/redaction.js";

test("detects common Singapore identifiers", () => {
  const findings = findSensitiveData("S1234567D can be reached at 9123 4567 or person@example.com");
  assert.deepEqual(findings.map(({ type }) => type), ["Singapore NRIC/FIN", "phone number", "email address"]);
});
test("redacts detected identifiers", () => assert.equal(redactSensitiveData("Email a@b.sg or call 61234567"), "Email [EMAIL] or call [PHONE]"));
test("reports clean text", () => assert.match(sensitiveDataSummary("No identifiers here"), /No common/));
