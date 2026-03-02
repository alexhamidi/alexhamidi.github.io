"use client";

import { useRef, useEffect, useState } from "react";

export default function ImagesFeed({ urls }: { urls: string[] }) {
  return (
    <div className="flex flex-col items-center gap-1 pt-0 pb-4 px-2 max-w-2xl mx-auto">
      {urls.map((url, i) => (
        <LazyImage key={i} src={url} priority={i < 3} />
      ))}
    </div>
  );
}

function LazyImage({ src, priority }: { src: string; priority: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(priority);

  useEffect(() => {
    if (priority) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className="w-full">
      {visible ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          className="w-full h-auto rounded-sm object-contain bg-neutral-900/50"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          sizes="(max-width: 672px) 100vw, 672px"
        />
      ) : null}
    </div>
  );
}
