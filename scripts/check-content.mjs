import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const caseDir = path.join(root, "content", "case-studies");
const required = ["Problem", "Constraints", "Approach", "Artifact And Proof", "Outcomes And Status"];
const flagship = ["hunter-7", "satp", "tempest", "codex-mcp-architecture", "file2md", "dco-450", "dco-550"];

let failures = 0;
for (const slug of flagship) {
  const file = path.join(caseDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) {
    console.error(`Missing flagship case study: ${slug}`);
    failures++;
    continue;
  }
  const parsed = matter(fs.readFileSync(file, "utf8"));
  for (const key of ["title", "deck", "role", "status", "artifact", "diagram"]) {
    if (!parsed.data[key]) {
      console.error(`${slug}: missing frontmatter ${key}`);
      failures++;
    }
  }
  for (const heading of required) {
    if (!parsed.content.includes(`## ${heading}`)) {
      console.error(`${slug}: missing section ${heading}`);
      failures++;
    }
  }
}

const downloads = ["iver-iverson-resume.pdf", "iver-iverson-resume.md", "iver-iverson-resume.txt"];
for (const download of downloads) {
  const file = path.join(root, "public", "downloads", download);
  if (!fs.existsSync(file) || fs.statSync(file).size < 50) {
    console.error(`Missing or empty resume download: ${download}`);
    failures++;
  }
}

if (failures) process.exit(1);
console.log("content gate passed");
