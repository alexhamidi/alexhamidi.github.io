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
const SESSION_KEY = "postit-session-id";
const EVENT_NAME = "postit-added";

function getIdeasApiBase(): string {
  if (typeof window === "undefined") return "";
  const fromEnv = (process.env.NEXT_PUBLIC_IDEAS_API ?? "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (window.location?.hostname === "localhost") return "http://localhost:3000";
  return "";
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = "s-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 11);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function fetchIdeas(sessionId: string): Promise<PostIt[]> {
  const base = getIdeasApiBase();
  if (!base) return [];
  const res = await fetch(`${base}/api/ideas?session_id=${encodeURIComponent(sessionId)}`);
  const data = await res.json();
  if (!Array.isArray(data?.ideas) || data.ideas.length === 0) return [];
  return data.ideas.map((r: { text: string; color?: string; rotation?: number; x?: number; y?: number; timestamp?: number }) => ({
    text: r.text ?? "",
    color: r.color ?? "#fde047",
    rotation: Number(r.rotation) ?? 0,
    x: Number(r.x) ?? 0,
    y: Number(r.y) ?? 0,
    timestamp: Number(r.timestamp) ?? Date.now(),
  }));
}

async function saveIdeasToApi(sessionId: string, ideas: PostIt[]) {
  const base = getIdeasApiBase();
  if (!base) return;
  await fetch(`${base}/api/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      ideas: ideas.map((n) => ({
        text: n.text,
        color: n.color,
        rotation: n.rotation,
        x: n.x,
        y: n.y,
        timestamp: n.timestamp,
      })),
    }),
  });
}

const DEFAULT_TEXTS = [
  "Becoming clear that CLI is the best interface for agents... Every developer-related product (and eventually every product) needs to have a comprehensive CLI. Modal does this exceptionally",
  "Personal software that sits on all your devices, recording location & audio, and creates a map of your life/diary",
  "Generative world models for anywhere (promptable reality/street view)",
  "Some better way of doomscrolling... maybe articles? wikipedia? Sometimes have the impulse to scroll but would much rather be doing something educational, but there is a lack of options",
  "Evolution is just the accumulation of mutation. Build something to track/simulate this process",
  "Science fiction where we are the ai getting prompted",
  "General agent for web scraping. In theory could populate everything from sitescroll in 5 prompts. Simple would just be tools to control browser + check all requests and responses inside a coding environment",
];

function getDefaultNotes(): PostIt[] {
  const positions = [[10, 5], [55, 15], [5, 55], [50, 50], [75, 35], [30, 70], [20, 30]];
  return DEFAULT_TEXTS.map((text, i) => ({
    text,
    color: COLORS[i % COLORS.length],
    rotation: (i - 2) * 4,
    x: positions[i][0],
    y: positions[i][1],
    timestamp: 1000000000000 + i,
  }));
}

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
    const sessionId = getSessionId();

    if (getIdeasApiBase()) {
      try {
        const fromApi = await fetchIdeas(sessionId);
        if (fromApi.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fromApi));
          setNotes(fromApi);
          return;
        }
      } catch {
        // fall through to localStorage/defaults
      }
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (Array.isArray(parsed) && parsed.length > 0) {
      setNotes(parsed);
    } else {
      const defaults = getDefaultNotes();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      setNotes(defaults);
    }
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(EVENT_NAME, load);
    return () => window.removeEventListener(EVENT_NAME, load);
  }, [load]);

  useEffect(() => {
    const base = getIdeasApiBase();
    if (!base || notes.length === 0) return;
    const t = setTimeout(() => {
      saveIdeasToApi(getSessionId(), notes).catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [notes]);

  useEffect(() => {
    const base = getIdeasApiBase();
    if (!base) return;
    const flush = () => {
      const sessionId = getSessionId();
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list) && list.length > 0) {
        saveIdeasToApi(sessionId, list).catch(() => {});
      }
    };
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, []);

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
