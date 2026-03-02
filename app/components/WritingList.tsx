import Link from "next/link";
import { ProjectItem } from "../utils/interfaces";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  const year = parts[0];
  if (isNaN(year)) return "";
  if (parts.length === 1) return String(year);
  const month = parts[1];
  if (parts.length === 2) return `${MONTHS[Math.max(0, month - 1)]} ${year}`;
  const day = parts[2];
  return `${MONTHS[Math.max(0, month - 1)]} ${day}, ${year}`;
}

export default function WritingList({
  posts,
}: {
  posts: (ProjectItem & { slug: string })[];
}) {
  const sorted = [...posts].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <ul className="divide-y divide-neutral-200">
      {sorted.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            prefetch={true}
            className="flex items-baseline justify-between gap-6 py-4 text-left no-underline group"
          >
            <span className="text-[17px] font-normal leading-snug text-neutral-800 group-hover:text-neutral-900 transition-colors truncate min-w-0 flex-1">
              {post.featured && <span className="mr-2" aria-hidden>★</span>}
              {post.title}
            </span>
            <span className="text-[13px] text-neutral-500 flex-shrink-0 tabular-nums tracking-wide uppercase">
              {formatDate(post.date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
