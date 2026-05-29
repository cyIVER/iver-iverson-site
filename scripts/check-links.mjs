import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const routeFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name === "index.html") routeFiles.push(full);
  }
}

if (!fs.existsSync(out)) {
  console.error("out/ does not exist. Run npm run build first.");
  process.exit(1);
}

walk(out);
const hrefPattern = /href="([^"]+)"/g;
let failures = 0;

for (const file of routeFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean || clean === "/") continue;
    const stripped = clean.replace(/^\/iver-iverson-site/, "");
    const target = path.join(out, stripped);
    const candidates = [target, `${target}.html`, path.join(target, "index.html")];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) {
      console.error(`Broken link in ${path.relative(root, file)} -> ${href}`);
      failures++;
    }
  }
}

if (failures) process.exit(1);
console.log("internal link gate passed");
