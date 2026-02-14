"use client";

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
      renderCard={(url) => (
        <img
          src={prefix ? `${prefix}${url}` : url}
          alt=""
          className="w-full rounded-lg"
          loading="lazy"
        />
      )}
      renderExpanded={(url) => (
        <div className="flex items-center justify-center h-full">
          <img
            src={prefix ? `${prefix}${url}` : url}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          {url}
        </div>
      )}
    />
  );
}
