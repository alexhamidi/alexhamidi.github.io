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
  blog?: boolean;
  order?: number;
  featured?: boolean;
  badge_path?: string;
  image?: string;
  video?: string;
  volume?: number;
  slug?: string;
  content?: string;
  notebook?: string;
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

