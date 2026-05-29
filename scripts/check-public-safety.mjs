import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const include = ["app", "components", "content", "lib", "public", "runner", "scripts", ".github", "docs"];
const secretPatterns = [
  /ghp_[A-Za-z0-9_]{20,}/,
  /github_pat_[A-Za-z0-9_]+/,
  /AIza[0-9A-Za-z_-]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/,
  /https?:\/\/(localhost|127\.0\.0\.1|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

let failures = 0;
for (const rel of include) {
  const dir = path.join(root, rel);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    if (file.endsWith(".pdf")) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const pattern of secretPatterns) {
      if (pattern.test(text)) {
        console.error(`Public-safety match in ${path.relative(root, file)}: ${pattern}`);
        failures++;
      }
    }
  }
}

if (failures) process.exit(1);
console.log("public-safety gate passed");
