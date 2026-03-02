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
      clickable={false}
      gridClassName="columns-2 md:columns-3 gap-3 space-y-3"
      cardClassName="w-full break-inside-avoid"
      renderCard={(url, index) => {
        const src = prefix ? `${prefix}${url}` : url;
        const isAboveFold = index < 6;

        return (
          <Image
            src={src}
            alt=""
            width={800}
            height={600}
            className="w-full rounded-lg"
            loading={isAboveFold ? "eager" : "lazy"}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        );
      }}
      renderExpanded={(url) => {
        const src = prefix ? `${prefix}${url}` : url;
        return (
          <div className="flex items-center justify-center h-full">
            <Image
              src={src}
              alt=""
              width={1200}
              height={900}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        );
      }}
    />
  );
}
