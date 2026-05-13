import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Sermon } from "@/lib/sermons";

// Reads sermon markdown files from /content/sermons/ at build time.
// Each .md file has YAML frontmatter (title, date, speaker, etc.) and a
// short description as the body.
//
// This is consumed by app/watch/page.tsx and the homepage latest-sermon
// section. Both are server components, so fs at module top-level is fine.

const SERMONS_DIR = path.join(process.cwd(), "content/sermons");
const DEFAULT_THUMBNAIL = "/images/imported/plan-visit-interior.jpg";

function isoDate(value: unknown): string {
  if (typeof value === "string") return value.slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}

function loadAll(): Sermon[] {
  if (!fs.existsSync(SERMONS_DIR)) return [];
  return fs
    .readdirSync(SERMONS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(SERMONS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        id: file.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        series: String(data.series ?? "Standalone Messages"),
        speaker: String(data.speaker ?? ""),
        date: isoDate(data.date),
        scripture: String(data.scripture ?? ""),
        book: String(data.book ?? ""),
        description: content.trim(),
        youtubeId: String(data.youtubeId ?? ""),
        thumbnail: String(data.thumbnail ?? "") || DEFAULT_THUMBNAIL,
        audioUrl: String(data.audioUrl ?? "") || "#",
        notesUrl: String(data.notesUrl ?? "") || "#",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const allSermons: Sermon[] = loadAll();
export const latestSermon: Sermon | undefined = allSermons[0];
