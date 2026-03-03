import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

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
      let mdxSource;
      try {
        mdxSource = await serialize(content.trim(), {
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        });
      } catch (e) {
        console.error(`❌ MDX PARSE ERROR in: data/${type}/${file}`);
        throw e;
      }

      return {
        ...(data as T),
        slug: (data as { slug?: string }).slug ?? file.replace(/\.mdx$/, ""),
        mdxSource,
        content: content.trim(),
        order: data.order ?? 999,
      };
    })
  );

  return items.sort((a: any, b: any) => a.order - b.order);
}