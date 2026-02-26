import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";


export interface MusicItem {
  title: string;
  audio_path: string;
  badge_path: string;
  order: number;
  mdxSource?: MDXRemoteSerializeResult;
}

export interface ProjectItem {
  title: string;
  description: string;
  date: string;
  link: string;
  tags: string[];
  badge_path?: string;
  slug?: string;
  content?: string;
  mdxSource?: MDXRemoteSerializeResult;
};

export interface BookItem {
  title: string;
  author?: string;
  coverUrl: string;
  spineColor: string;
  textColor?: string;
  order: number;
  mdxSource?: MDXRemoteSerializeResult;
}

