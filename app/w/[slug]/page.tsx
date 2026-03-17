import Link from "next/link";
import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getData } from "../../utils/getData";
import { ProjectItem } from "../../utils/interfaces";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  if (isNaN(parts[0])) return "";
  const month = parts[1] ?? 1;
  const year = parts[0];
  return `${MONTHS[Math.max(0, month - 1)]} ${year}`;
}

async function getAllBlogPosts(): Promise<(ProjectItem & { slug: string })[]> {
  const [writing, projects] = await Promise.all([
    getData<ProjectItem>("writing"),
    getData<ProjectItem>("projects"),
  ]);
  const blogProjects = projects.filter((p) => p.blog);
  return [...writing, ...blogProjects];
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto px-8 md:px-16 pt-12 pb-16">
      <Link
        href="/#posts"
        prefetch={true}
        className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors mb-6 inline-block"
      >
        ← back
      </Link>
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-black">
          {post.title}
        </h1>
        <span className="text-[11px] text-neutral-300">{formatDate(post.date)}</span>
      </div>
      {post.video && (
        <div className="mb-6 w-full aspect-video overflow-hidden rounded-lg border border-neutral-200">
          <video
            src={post.video}
            poster={post.video.replace(/\.[^.]+$/, "-poster.jpg")}
            className="w-full h-full object-cover"
            controls
            playsInline
            loop
            preload="metadata"
          />
        </div>
      )}
      {post.content ? (
        <div className="prose prose-neutral max-w-4xl mt-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isBlock = match || String(children).includes("\n");
                if (isBlock) {
                  return (
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match ? match[1] : "text"}
                      PreTag="div"
                      customStyle={{
                        borderRadius: 6,
                        fontSize: "0.85em",
                        margin: "1.25rem 0",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-[15px] text-neutral-600 leading-relaxed max-w-2xl mt-4">
          {post.description}
        </p>
      )}
      {post.link && (
        <div className="mt-8">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-black no-underline border-b border-neutral-300 hover:border-black transition-colors pb-0.5"
          >
            View project
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
