import fs from "fs";
import path from "path";

export interface BookData {
  slug: string;
  title: string;
  author: string;
  date: string;
  rating: number;
  spineColor: string;
  textColor: string;
  text: string;
  hasCover: boolean;
  hasFilm: boolean;
}

function getDataDir(): string {
  const cwd = process.cwd();
  if (!cwd || typeof cwd !== "string") {
    throw new Error(
      `process.cwd() returned invalid value: ${cwd} (type: ${typeof cwd})`,
    );
  }
  return path.join(cwd, "app/(subpages)/books/data");
}

function getPublicDir(): string {
  const cwd = process.cwd();
  if (!cwd || typeof cwd !== "string") {
    throw new Error(
      `process.cwd() returned invalid value: ${cwd} (type: ${typeof cwd})`,
    );
  }
  return path.join(cwd, "public/books");
}

export function getAllBooks(): BookData[] {
  const DATA_DIR = getDataDir();
  const slugs = fs.readdirSync(DATA_DIR).filter((entry) => {
    const entryPath = path.join(DATA_DIR, entry);
    return fs.statSync(entryPath).isDirectory();
  });

  return slugs
    .map((slug) => getBook(slug))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getBook(slug: string): BookData {
  const DATA_DIR = getDataDir();
  const PUBLIC_DIR = getPublicDir();

  const bookDir = path.join(DATA_DIR, slug);
  const dataPath = path.join(bookDir, "data.json");
  const textPath = path.join(bookDir, "text.md");

  const json = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const text = fs.existsSync(textPath)
    ? fs.readFileSync(textPath, "utf-8")
    : "";

  const publicBookDir = path.join(PUBLIC_DIR, slug);
  const hasCover = fs.existsSync(path.join(publicBookDir, "cover.png"));
  const hasFilm = fs.existsSync(path.join(publicBookDir, "film.mp4"));

  return {
    slug,
    title: json.title,
    author: json.author || "",
    date: json.date,
    rating: json.rating,
    spineColor: json.spineColor || "#1a365d",
    textColor: json.textColor || "#ffffff",
    text,
    hasCover,
    hasFilm,
  };
}

export function getAllSlugs(): string[] {
  const DATA_DIR = getDataDir();
  return fs.readdirSync(DATA_DIR).filter((entry) => {
    const entryPath = path.join(DATA_DIR, entry);
    return fs.statSync(entryPath).isDirectory();
  });
}
