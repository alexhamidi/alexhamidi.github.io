"use client";

import { useRef, useState, useEffect } from "react";
import { MusicItem } from "../utils/interfaces";

export default function MusicSection({ music }: { music: MusicItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {music.map((item) => (
        <TrackCard key={item.title} item={item} />
      ))}
    </div>
  );
}

function TrackCard({ item }: { item: MusicItem }) {
  const audioRef = useRef<HTMLInputElement & HTMLAudioElement>(null); // Cast to HTMLInputElement for stricter type, though HTMLAudioElement works
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

    const onMeta = () => {
      if (isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

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
      // Pause all other audio elements on the page
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio) {
          el.pause();
        }
      });
      audio.play();
    }
    setPlaying(!playing);
  };

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent toggling play/pause when seeking
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
      className="relative overflow-hidden group cursor-pointer aspect-[6/3] " // Removed rounded-lg and transform classes
      onClick={toggle}
    >
      {/* Background Image */}
      {item.badge_path ? (
        <img
          src={item.badge_path}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover" // Removed transition-transform and group-hover:scale-105
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800" />
      )}

      {/* Dark Overlay - Appears only on hover */}

      {/* Content Container - Appears only on hover */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        {/* Empty div for spacing where the indicator used to be */}
        <div className="flex justify-end h-5" /> 

        {/* Bottom Info (Title, Numbers, Bar) */}
        <div className="w-full">
          <div className="flex items-end justify-between ">
            <h3 className="text-white text-[15px] font-medium tracking-wide shadow-sm select-none truncate pr-2">
              {item.title}
            </h3>

            {/* Numbers */}
            {duration > 0 && (
              <div className="flex gap-1 text-[11px] text-white/90 select-none">
                <span>{fmt(currentTime)}</span>
                <span className="opacity-50">/</span>
                <span>{fmt(duration)}</span>
              </div>
            )}
          </div>

          {/* Progress Bar Container */}
          <div
            className="w-full h-4 flex items-end pb-1 cursor-pointer group/seek"
            onClick={seek}
          >
            {/* Track Line */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden relative backdrop-blur-sm">
              {/* Filled Line */}
              <div
                className="h-full bg-white rounded-full transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" src={item.audio_path} />
    </div>
  );
}