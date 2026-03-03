"use client";

import { useState } from "react";
import PhotoGrid from "./PhotoGrid";

type Source = "photos" | "wikipedia"; // | "midjourney"

export default function GallerySection({
  photoUrls,
  wikipediaUrls,
}: {
  photoUrls: string[];
  wikipediaUrls: string[];
}) {
  const [source, setSource] = useState<Source>("photos");

  return (
    <>
      <div style={{ display: source === "photos" ? "block" : "none" }}>
        <PhotoGrid urls={photoUrls} />
      </div>
      <div style={{ display: source === "wikipedia" ? "block" : "none" }}>
        {wikipediaUrls.length > 0 ? (
          <PhotoGrid urls={wikipediaUrls} unoptimized />
        ) : (
          <p className="text-sm text-neutral-400 py-8">No Wikipedia images loaded.</p>
        )}
      </div>
      {/* <div style={{ display: source === "midjourney" ? "block" : "none", height: 500 }} className="rounded-lg overflow-hidden border border-neutral-200">
        <iframe
          src="https://www.midjourney.com/@ahamidi?tab=archive"
          title="Midjourney"
          className="w-full h-full"
        />
      </div> */}
      <div className="mt-4 flex items-center gap-3 text-[13px]">
        {(["photos", "wikipedia"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSource(s)}
            className={`capitalize no-underline border-0 bg-transparent cursor-pointer transition-colors ${
              source === s ? "text-black font-medium" : "text-neutral-500 hover:text-black"
            }`}
          >
            {s === "photos" ? "Photos" : "Wikipedia"}
          </button>
        ))}
      </div>
    </>
  );
}
