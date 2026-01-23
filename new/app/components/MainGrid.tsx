'use client';

import { useState, useRef, ComponentType } from 'react';
import Rng from './main/Rng';

type MainItemType = 'song' | 'image' | 'video' | 'quote' | 'embed' | 'component';

const COMPONENT_REGISTRY: Record<string, ComponentType> = {
  rng: Rng,
};

interface MainItemData {
  name: string;
  type: MainItemType;
  src?: string;
  url?: string;
  text?: string;
  author?: string;
  componentName?: string;
  span: { colSpan: number; rowSpan: number };
}

function SongCard({ item }: { item: MainItemData }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct || 0);
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-gray-50 rounded-xl">
      <div className="text-sm font-medium text-gray-800 tracking-tight">
        {item.name}
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 cursor-pointer border-0"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={item.src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
        preload="metadata"
      />
    </div>
  );
}

function VideoCard({ item }: { item: MainItemData }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const goFullscreen = () => {
    if (!containerRef.current) return;
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative rounded-xl overflow-hidden bg-black group">
      <video
        ref={videoRef}
        src={item.src}
        className="w-full"
        preload="metadata"
        playsInline
        onEnded={() => setPlaying(false)}
        onClick={togglePlay}
      />
      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-md bg-black/60 text-white flex items-center justify-center cursor-pointer border-0 backdrop-blur-sm"
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
        <button
          onClick={goFullscreen}
          className="w-7 h-7 rounded-md bg-black/60 text-white flex items-center justify-center cursor-pointer border-0 backdrop-blur-sm"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ImageCard({ item }: { item: MainItemData }) {
  const inner = (
    <img
      src={item.src}
      alt={item.name}
      className="max-w-full max-h-full object-contain rounded-xl"
      loading="lazy"
    />
  );

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="h-full flex items-center justify-center no-underline">
        {inner}
      </a>
    );
  }
  return <div className="h-full flex items-center justify-center">{inner}</div>;
}

function QuoteCard({ item }: { item: MainItemData }) {
  return (
    <div className="h-full flex flex-col justify-center p-5 bg-gray-50 rounded-xl">
      <p className="text-sm italic text-gray-700 leading-relaxed">
        &ldquo;{item.text}&rdquo;
      </p>
      {item.author && (
        <p className="text-xs text-gray-400 mt-3">&mdash; {item.author}</p>
      )}
    </div>
  );
}

function EmbedCard({ item }: { item: MainItemData }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full flex items-center justify-center p-4 bg-gray-50 rounded-xl no-underline hover:bg-gray-100 transition-colors"
    >
      <span className="text-sm font-medium text-gray-700">{item.name}</span>
    </a>
  );
}

export default function MainGrid({ items }: { items: MainItemData[] }) {
  const videos = items.filter(i => i.type === 'video');
  const others = items.filter(i => i.type !== 'video');

  return (
    <div className="flex flex-col gap-3">
      {videos.map((item) => (
        <VideoCard key={item.name} item={item} />
      ))}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '140px',
          gridAutoFlow: 'dense',
        }}
      >
        {others.map((item) => (
          <div
            key={item.name}
            style={{
              gridColumn: `span ${item.span.colSpan}`,
              gridRow: `span ${item.span.rowSpan}`,
            }}
          >
            {item.type === 'song' && <SongCard item={item} />}
            {item.type === 'image' && <ImageCard item={item} />}
            {item.type === 'quote' && <QuoteCard item={item} />}
            {item.type === 'embed' && <EmbedCard item={item} />}
            {item.type === 'component' && item.componentName && (() => {
              const Comp = COMPONENT_REGISTRY[item.componentName];
              return Comp ? <Comp /> : null;
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}
