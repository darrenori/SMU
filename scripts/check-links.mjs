import { readFile } from "node:fs/promises";

const files = ["index.html", "extension/popup.html"];
const errors = [];
for (const filename of files) {
  const fileUrl = new URL(`../${filename}`, import.meta.url);
  const html = await readFile(fileUrl, "utf8");
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(#|https?:|chrome:|mailto:)/.test(value)) continue;
    const clean = value.split(/[?#]/)[0];
    const assetUrl = clean.startsWith("/") ? new URL(`..${clean}`, import.meta.url) : new URL(clean, fileUrl);
    try { await readFile(assetUrl); }
    catch { errors.push(`${filename}: missing ${value}`); }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Local HTML asset links valid");
