import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const output = resolve(root, "extension-dist");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  cp(resolve(root, "extension"), resolve(output, "extension"), { recursive: true }),
  cp(resolve(root, "src"), resolve(output, "src"), { recursive: true }),
  cp(resolve(root, "content", "2.png"), resolve(output, "content", "2.png"), { recursive: true }),
  cp(resolve(root, "manifest.json"), resolve(output, "manifest.json"))
]);
const manifest = JSON.parse(await readFile(resolve(output, "manifest.json"), "utf8"));
await writeFile(resolve(output, "BUILD.txt"), `IKEBOT ${manifest.version}\nBuilt ${new Date().toISOString()}\nLoad this directory unpacked in Chrome.\n`);
console.log(`Extension assembled at ${output}`);
