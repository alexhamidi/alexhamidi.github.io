'use client';

import { useState } from 'react';

export default function Rng() {
  const [num, setNum] = useState(() => Math.floor(Math.random() * 1000));

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
      <span className="text-2xl font-mono font-bold text-black">{num}</span>
      <button
        onClick={() => setNum(Math.floor(Math.random() * 1000))}
        className="text-xs px-3 py-1 rounded-md bg-black text-white cursor-pointer border-0"
      >
        roll
      </button>
    </div>
  );
}
