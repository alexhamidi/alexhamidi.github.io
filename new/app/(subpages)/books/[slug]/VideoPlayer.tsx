"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  slug: string;
}

export default function VideoPlayer({ slug }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startVideo = () => {
    setDisableTransition(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsFullscreen(true);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 800);
  };

  const closeFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDisableTransition(true);
    setIsFullscreen(false);
    setIsTransitioning(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black ${!disableTransition ? 'transition-opacity duration-[800ms] ease-in-out' : ''} ${
          isTransitioning || isFullscreen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
      />

      {isFullscreen && (
        <div className="fixed bottom-6 right-6 flex gap-3 z-[70]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm font-mono hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {isPlaying ? "pause" : "play"}
          </button>
          <button
            onClick={closeFullscreen}
            className="px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm font-mono hover:bg-gray-50 transition-colors cursor-pointer"
          >
            close
          </button>
        </div>
      )}

      <div 
        className={`relative w-full mt-20 cursor-pointer ${!disableTransition ? 'transition-all duration-[800ms] ease-in-out' : ''} ${
          isTransitioning || isFullscreen
            ? 'fixed inset-0 !w-screen !h-screen z-[45] max-w-none !mt-0 overflow-hidden bg-black flex items-center justify-center' 
            : 'max-w-4xl'
        }`}
        onClick={!isFullscreen && !isTransitioning ? startVideo : undefined}
      >
        <video
          ref={videoRef}
          src={`/books/${slug}/film.mp4`}
          loop
          muted
          playsInline
          preload="auto"
          className={`w-full ${!disableTransition ? 'transition-all duration-[800ms] ease-in-out' : ''} ${
            isTransitioning || isFullscreen
              ? 'h-full object-contain border-0 rounded-none' 
              : 'border border-gray-400 rounded-2xl'
          }`}
          style={!isTransitioning && !isFullscreen ? { aspectRatio: '16/9' } : undefined}
        />
      </div>
    </>
  );
}
