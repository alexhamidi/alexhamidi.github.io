'use client';

import { useState, useRef, useEffect } from 'react';

const songs = [
  { 
    title: 'Between the Buttons', 
    artist: 'French 79',
    file: '/songs/French 79 - Between the Buttons.mp3' 
  },
  { 
    title: 'ProtoVision', 
    artist: 'Kavinsky',
    file: '/songs/Kavinsky - ProtoVision.mp3' 
  },
  { 
    title: 'Burnished Bronze', 
    artist: 'Labyrinth Ear',
    file: '/songs/Labyrinth Ear - Burnished Bronze.mp3' 
  },
  { 
    title: 'The Remedy', 
    artist: 'French 79',
    file: '/songs/French 79 - The Remedy.mp3' 
  },
  { 
    title: 'Devotion', 
    artist: 'RÜFÜS DU SOL',
    file: '/songs/RÜFÜS DU SOL - Devotion.mp3' 
  },
];

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const previousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    nextSong();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 z-[100] transition-transform duration-300 ease-in-out">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-6 rounded-lg bg-white border border-gray-200 text-gray-500 cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out hover:border-black hover:text-black z-10"
        aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-200 ease-in-out ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isExpanded && <div className="max-w-[600px] mx-auto px-6 py-6 pb-5 max-h-[500px] overflow-hidden animate-[slideUp_0.3s_ease]">
        <div className="flex items-center justify-between mb-5 gap-8">
          <div className="flex-1 min-w-0">
            <div className="text-[0.9375rem] font-semibold text-black mb-1 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {songs[currentSongIndex].title}
            </div>
            <div className="text-[0.8125rem] text-gray-500 font-normal whitespace-nowrap overflow-hidden text-ellipsis">
              {songs[currentSongIndex].artist}
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={previousSong} className="bg-transparent border-0 text-black cursor-pointer p-2 transition-opacity duration-150 ease-in-out hover:opacity-60 leading-none flex items-center justify-center" aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>
            <button onClick={togglePlay} className="bg-transparent border-0 text-black cursor-pointer p-2.5 transition-opacity duration-150 ease-in-out hover:opacity-60 leading-none flex items-center justify-center" aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            <button onClick={nextSong} className="bg-transparent border-0 text-black cursor-pointer p-2 transition-opacity duration-150 ease-in-out hover:opacity-60 leading-none flex items-center justify-center" aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between mb-2 text-xs text-gray-500 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="audio-progress-bar"
            style={{
              background: `linear-gradient(to right, #000 0%, #000 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
            }}
          />
           <div className="text-[0.6875rem] text-gray-400 text-center tracking-wide uppercase font-medium">
             Track {currentSongIndex + 1} of {songs.length}
           </div>
         </div>
       </div>}
      
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].file}
        onEnded={handleSongEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
}
