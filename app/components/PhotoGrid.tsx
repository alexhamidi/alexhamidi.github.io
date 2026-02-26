"use client";

import Image from "next/image";
import ZoomGrid from "./ZoomGrid";

export default function PhotoGrid({
  urls,
  prefix,
}: {
  urls: string[];
  prefix?: string;
}) {
  return (
    <ZoomGrid
      items={urls}
      keyFn={(url) => url}
      gridClassName="columns-2 md:columns-3 gap-3 space-y-3"
      cardClassName="w-full break-inside-avoid"
      renderCard={(url) => {
        const src = prefix ? `${prefix}${url}` : url;
        const isMj = src.startsWith("https://cdn.midjourney.com/");

        return isMj ? (
          <Image
            src={src}
            alt=""
            width={800}
            height={800}
            className="w-full rounded-lg"
            loading="lazy"
          />
        ) : (
          <img
            src={src}
            alt=""
            className="w-full "
            loading="lazy"
            decoding="async"
          />
        );
      }}
      renderExpanded={(url) => (
        <div className="flex items-center justify-center h-full">
          <img
            src={prefix ? `${prefix}${url}` : url}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    />
  );
}
