import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const root = process.cwd();
const contentRoot = path.join(root, "content");

export type CaseStudy = {
  slug: string;
  title: string;
  deck: string;
  status: string;
  role: string;
  category: string;
  year: string;
  selected: boolean;
  tags: string[];
  artifact: string;
  diagram: string[];
  body: string;
};

export type Writing = {
  slug: string;
  title: string;
  deck: string;
  date: string;
  category: string;
  tags: string[];
  body: string;
};

function readMdx<T>(dir: string, slug: string): T {
  const file = path.join(contentRoot, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return {
    slug,
    ...parsed.data,
    body: parsed.content.trim()
  } as T;
}

function slugsFor(dir: string) {
  return fs
    .readdirSync(path.join(contentRoot, dir))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getCaseStudies() {
  return slugsFor("case-studies")
    .map((slug) => readMdx<CaseStudy>("case-studies", slug))
    .sort((a, b) => Number(b.selected) - Number(a.selected) || b.year.localeCompare(a.year));
}

export function getCaseStudy(slug: string) {
  return readMdx<CaseStudy>("case-studies", slug);
}

export function getWriting() {
  return slugsFor("writing")
    .map((slug) => readMdx<Writing>("writing", slug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingPost(slug: string) {
  return readMdx<Writing>("writing", slug);
}

export async function renderMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
