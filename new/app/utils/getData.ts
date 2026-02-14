import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MDXItem<T> = T & {
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
};

export async function getData<T>(type: string): Promise<MDXItem<T>[]> {
  const dir = path.join(process.cwd(), "data", type);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const mdxSource = await serialize(content.trim());

      return {
        ...(data as T),
        slug: file.replace(/\.mdx$/, ""),
        mdxSource,
        order: data.order ?? 999,
      };
    })
  );

  return items.sort((a: any, b: any) => a.order - b.order);
}