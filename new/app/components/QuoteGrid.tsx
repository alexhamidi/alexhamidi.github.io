"use client";

import ZoomGrid from "./ZoomGrid";

type Quote = {
  text: string;
  author: string;
};

export default function QuoteGrid({ quotes }: { quotes: Quote[] }) {
  return (
    <ZoomGrid
      items={quotes}
      keyFn={(quote) => quote.author + quote.text.slice(0, 20)}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      renderCard={(quote) => (
        <div className="group px-1 py-4 transition-colors duration-200">
          <p className="text-[13px] text-neutral-500 group-hover:text-neutral-600 leading-relaxed transition-colors duration-200">
            {quote.text}
          </p>
          <p className="text-[11px] text-neutral-300 group-hover:text-neutral-400 mt-3 transition-colors duration-200">
            {quote.author}
          </p>
        </div>
      )}
      renderExpanded={(quote) => (
        <div className="flex flex-col items-center justify-center h-full gap-6 max-w-lg mx-auto">
          <p className="text-xl text-neutral-700 leading-relaxed text-center">
            {quote.text}
          </p>
          <p className="text-sm text-neutral-400">{quote.author}</p>
        </div>
      )}
    />
  );
}
