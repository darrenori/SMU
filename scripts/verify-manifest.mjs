import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../manifest.json", import.meta.url), "utf8"));
const errors = [];
if (manifest.manifest_version !== 3) errors.push("manifest_version must be 3");
if (!/^\d+\.\d+\.\d+$/.test(manifest.version || "")) errors.push("version must use x.y.z format");
if (!manifest.action?.default_popup) errors.push("action.default_popup is required");
if (manifest.permissions?.length) errors.push("prototype should not request Chrome permissions");
if (!manifest.content_security_policy?.extension_pages) errors.push("extension page CSP is required");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Manifest valid: ${manifest.name} ${manifest.version} (zero permissions)`);
