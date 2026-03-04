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

function getIdeasApiBase(): string {
  if (typeof window === "undefined") return "";
  const fromEnv = (process.env.NEXT_PUBLIC_IDEAS_API ?? "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (window.location?.hostname === "localhost") return "http://localhost:3000";
  return "";
}

async function fetchIdeas(): Promise<PostIt[]> {
  const base = getIdeasApiBase();
  const url = base ? `${base}/api/postits` : "/api/postits";
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!Array.isArray(data?.ideas)) return [];
    return data.ideas.map((r: { text: string; color?: string; rotation?: number; x?: number; y?: number; timestamp?: number }) => ({
      text: r.text ?? "",
      color: r.color ?? "#fde047",
      rotation: r.rotation != null ? Number(r.rotation) : 0,
      x: r.x != null ? Number(r.x) : 0,
      y: r.y != null ? Number(r.y) : 0,
      timestamp: r.timestamp != null ? Number(r.timestamp) : Date.now(),
    }));
  } catch {
    return [];
  }
}

export function addPostIt(text: string) {
  const base = getIdeasApiBase();
  const url = base ? `${base}/api/postits` : "/api/postits";
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea: text }),
  })
    .then((res) => {
      if (res.ok) window.dispatchEvent(new CustomEvent(EVENT_NAME));
      else throw new Error();
    })
    .catch(() => {
      const note: PostIt = {
        text,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: (Math.random() - 0.5) * 12,
        x: Math.random() * 80,
        y: Math.random() * 80,
        timestamp: Date.now(),
      };
      const existing: PostIt[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.push(note);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    });
}

function DraggableNote({ note, index, onMove }: { note: PostIt; index: number; onMove: (i: number, x: number, y: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return;
    dragging.current = true;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    offset.current = { x: e.clientX - centerX, y: e.clientY - centerY };
    ref.current.setPointerCapture(e.pointerId);
    ref.current.style.zIndex = "10";
    ref.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const centerX = e.clientX - offset.current.x;
    const centerY = e.clientY - offset.current.y;
    const w = ref.current.offsetWidth;
    const h = ref.current.offsetHeight;
    const leftViewport = centerX - w / 2;
    const topViewport = centerY - h / 2;
    const x = ((leftViewport - parentRect.left) / parentRect.width) * 100;
    const y = ((topViewport - parentRect.top) / parentRect.height) * 100;
    ref.current.style.left = `${x}%`;
    ref.current.style.top = `${y}%`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || !ref.current) return;
    dragging.current = false;
    ref.current.style.zIndex = "1";
    ref.current.style.cursor = "grab";
    const leftStr = ref.current.style.left;
    const topStr = ref.current.style.top;
    const x = parseFloat(leftStr) || 0;
    const y = parseFloat(topStr) || 0;
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
        width: "clamp(100px, 12vw, 180px)",
        aspectRatio: "1",
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

  const load = useCallback(async () => {
    if (typeof window === "undefined") return;
    const fromApi = await fetchIdeas();
    if (fromApi.length > 0) {
      setNotes(fromApi);
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    setNotes(Array.isArray(parsed) ? parsed : []);
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
