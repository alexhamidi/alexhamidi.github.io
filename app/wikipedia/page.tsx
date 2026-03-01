import Link from "next/link";
import fs from "fs";
import path from "path";

export default function WikipediaPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "data", "wikipics.json"),
    "utf-8"
  );
  const imageUrls: string[] = JSON.parse(raw);

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800">
        <Link
          href="/"
          className="text-[12px] text-neutral-500 hover:text-white transition-colors"
        >
          ← back
        </Link>
        <span className="text-[11px] text-neutral-600 uppercase tracking-widest">
          wikipics
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 py-4 px-2 max-w-2xl mx-auto">
        {imageUrls.map((url, i) => (
          <div key={i} className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="w-full h-auto rounded-sm object-contain bg-neutral-900/50"
              loading={i < 6 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i < 3 ? "high" : undefined}
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
