import Link from "next/link";
import fs from "fs";
import path from "path";

type SoftwareItem = {
  title: string;
  description: string;
  githubUrl: string;
};

function abbreviate(str: string, maxLen = 60): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1).trim() + "…";
}

export default async function SoftwarePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "data", "software.json"), "utf-8");
  const projects: SoftwareItem[] = JSON.parse(raw);

  return (
    <div className="w-full max-w-4xl mx-auto px-8 md:px-16 pt-12 pb-16">
      <Link
        href="/"
        className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors mb-6 inline-block"
      >
        ← back
      </Link>
      <ul className="divide-y divide-neutral-200">
        {projects.map((project) => (
            <li key={project.title}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 py-1.5 text-left no-underline group"
              >
                <span className="text-[13px] font-normal text-neutral-800 group-hover:text-black transition-colors flex-shrink-0">
                  {project.title}
                </span>
                <span className="text-[12px] text-neutral-400 text-right group-hover:text-black transition-colors truncate min-w-0">
                  {abbreviate(project.description)}
                </span>
              </a>
            </li>
        ))}
      </ul>
    </div>
  );
}
