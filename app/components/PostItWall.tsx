"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const COLORS = [
  "#fde047", // yellow
  "#f9a8d4", // pink
  "#93c5fd", // blue
  "#86efac", // green
  "#c4b5fd", // purple
  "#fdba74", // orange
  "#fcd34d", // amber
  "#fda4af", // rose
];

type PostIt = {
  text: string;
  color: string;
  rotation: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  timestamp: number;
};

const STORAGE_KEY = "postit-wall";
const EVENT_NAME = "postit-added";

export function addPostIt(text: string) {
  const existing: PostIt[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const note: PostIt = {
    text,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: (Math.random() - 0.5) * 12,
    x: Math.random() * 80,
    y: Math.random() * 80,
    timestamp: Date.now(),
  };
  existing.push(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

function DraggableNote({ note, index, onMove }: { note: PostIt; index: number; onMove: (i: number, x: number, y: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return;
    dragging.current = true;
    const rect = ref.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    ref.current.setPointerCapture(e.pointerId);
    ref.current.style.zIndex = "10";
    ref.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const x = ((e.clientX - offset.current.x - parentRect.left) / parentRect.width) * 100;
    const y = ((e.clientY - offset.current.y - parentRect.top) / parentRect.height) * 100;
    ref.current.style.left = `${x}%`;
    ref.current.style.top = `${y}%`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || !ref.current) return;
    dragging.current = false;
    ref.current.style.zIndex = "1";
    ref.current.style.cursor = "grab";
    const parent = ref.current.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = ref.current.getBoundingClientRect();
    const x = ((rect.left - parentRect.left) / parentRect.width) * 100;
    const y = ((rect.top - parentRect.top) / parentRect.height) * 100;
    onMove(index, x, y);
    ref.current.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute shadow-sm hover:shadow-md transition-shadow duration-150 select-none touch-none"
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        backgroundColor: note.color,
        transform: `rotate(${note.rotation}deg)`,
        width: "clamp(100px, 15%, 160px)",
        padding: "12px 14px",
        cursor: "grab",
        zIndex: 1,
      }}
    >
      <p className="text-xs text-neutral-700 leading-relaxed break-words pointer-events-none">
        {note.text}
      </p>
    </div>
  );
}

export default function PostItWall() {
  const [notes, setNotes] = useState<PostIt[]>([]);

  const load = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(EVENT_NAME, load);
    return () => window.removeEventListener(EVENT_NAME, load);
  }, [load]);

  const handleMove = useCallback((index: number, x: number, y: number) => {
    setNotes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], x, y };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <div
      className="relative w-full"
      style={{ height: 500 }}
    >
      {notes.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-300">
          leave a note below
        </p>
      )}
      {notes.map((note, i) => (
        <DraggableNote key={note.timestamp + "-" + i} note={note} index={i} onMove={handleMove} />
      ))}
    </div>
  );
}
