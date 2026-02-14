"use client";

import { useRef, useState, useEffect } from "react";

interface Track {
  src: string;
  title: string;
  bg: string;
}

export default function MusicCard({ tracks }: { tracks: Track[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tracks.map((track) => (
        <TrackCard key={track.src} track={track} />
      ))}
    </div>
  );
}

function TrackCard({ track }: { track: Track }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(
        audio.duration ? (audio.currentTime / audio.duration) * 100 : 0,
      );
    };
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const fmt = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
      onClick={toggle}
    >
      {/* Background */}
      <img
        src={track.bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4">
        {/* Play indicator */}
        <div className="flex justify-end">
          <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center transition-all group-hover:bg-white/25">
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <rect x="1" y="1" width="3.5" height="10" rx="1" />
                <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <polygon points="2,0 12,6 2,12" />
              </svg>
            )}
          </div>
        </div>

        {/* Bottom info */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-tight mb-2 drop-shadow-md">
            {track.title}
          </h3>

          {/* Progress bar */}
          <div
            className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-1.5"
            onClick={(e) => {
              e.stopPropagation();
              seek(e);
            }}
          >
            <div
              className="h-full bg-white/80 rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between text-[10px] text-white/60 font-mono">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="none">
        <source
          src={track.src}
          type={track.src.endsWith(".mp3") ? "audio/mpeg" : "audio/wav"}
        />
      </audio>
    </div>
  );
}
