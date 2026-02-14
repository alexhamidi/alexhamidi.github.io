"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type Book3D = {
  title: string;
  coverUrl: string;
  spineColor: string;
  date?: string;
};

// Exact adammaj.com dimensions
const w = 41.5;
const h = 220;

type ModalState =
  | { phase: "closed" }
  | { phase: "expanding"; rect: DOMRect; index: number }
  | { phase: "open"; rect: DOMRect; index: number }
  | { phase: "closing"; rect: DOMRect; index: number };

function useZoomModal() {
  const [modal, setModal] = useState<ModalState>({ phase: "closed" });
  const modalRef = useRef<HTMLDivElement>(null);
  const open = useCallback((rect: DOMRect, index: number) => {
    document.body.style.overflow = "hidden";
    setModal({ phase: "expanding", rect, index });
  }, []);
  const close = useCallback(() => {
    if (modal.phase === "open" || modal.phase === "expanding") {
      setModal({ ...modal, phase: "closing" } as ModalState);
      setTimeout(() => {
        document.body.style.overflow = "";
        setModal({ phase: "closed" });
      }, 150);
    }
  }, [modal]);
  useEffect(() => {
    if (modal.phase === "expanding") {
      modalRef.current?.getBoundingClientRect();
      requestAnimationFrame(() =>
        setModal((p) =>
          p.phase === "expanding" ? { ...p, phase: "open" } : p,
        ),
      );
    }
  }, [modal.phase]);
  useEffect(() => {
    if (modal.phase === "closed") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.phase, close]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  return { modal, modalRef, open, close };
}

export default function BookGrid({ books }: { books: Book3D[] }) {
  const { modal, modalRef, open, close } = useZoomModal();
  const isExpanded = modal.phase === "open";
  const isClosing = modal.phase === "closing";
  const isVisible = modal.phase !== "closed";

  const handleClick = (index: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    open(rect, index);
  };

  const getModalStyle = (): React.CSSProperties => {
    if (!isVisible) return {};
    const { rect } = modal as { rect: DOMRect };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = Math.min(900, vw - 32);
    const maxH = vh * 0.92;
    if (isExpanded) {
      return {
        position: "fixed",
        zIndex: 51,
        borderRadius: 8,
        transition: "all 100ms cubic-bezier(0.33,0,0.2,1)",
        top: (vh - maxH) / 2,
        left: (vw - maxW) / 2,
        width: maxW,
        height: maxH,
      };
    }
    return {
      position: "fixed",
      zIndex: 51,
      borderRadius: 8,
      transition: isClosing
        ? "all 100ms cubic-bezier(0.33,0,0.2,1)"
        : undefined,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  };

  return (
    <>
      <svg style={{ position: "absolute", inset: 0, visibility: "hidden" }}>
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="8"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="1"
              result="diffLight"
            >
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <div className="grid grid-cols-4 gap-x-6 gap-y-8 -ml-6">
        {books.map((book, i) => (
          <button
            key={book.title}
            onClick={(e) => handleClick(i, e)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              outline: "none",
              flexShrink: 0,
              width: `${w * 5}px`,
              perspective: "1000px",
              WebkitPerspective: "1000px",
              gap: "0px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {/* SPINE — exact adammaj open state */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                width: `${w}px`,
                height: `${h}px`,
                flexShrink: 0,
                transformOrigin: "right",
                backgroundColor: book.spineColor,
                color: "#fff",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(-60deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                filter: "brightness(0.8) contrast(2)",
                willChange: "auto",
                position: "relative",
              }}
            >
              <span
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 50,
                  height: `${h}px`,
                  width: `${w}px`,
                  opacity: 0.4,
                  filter: "url(#paper)",
                }}
              />
              <span
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  fontFamily: `"Lora", var(--font-serif), serif`,
                  writingMode: "vertical-rl",
                  userSelect: "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxHeight: `${h - 24}px`,
                }}
              >
                {book.title}
              </span>
            </div>

            {/* COVER — exact adammaj open state */}
            <div
              style={{
                position: "relative",
                flexShrink: 0,
                overflow: "hidden",
                transformOrigin: "left",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(30deg) rotateZ(0deg) skew(0deg, 0deg)",
                transformStyle: "preserve-3d",
                filter: "brightness(0.8) contrast(2)",
                willChange: "auto",
              }}
            >
              <span
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 50,
                  height: `${h}px`,
                  width: `${w * 4}px`,
                  opacity: 0.4,
                  filter: "url(#paper)",
                }}
              />
              <span
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 50,
                  height: `${h}px`,
                  width: `${w * 4}px`,
                  background:
                    "linear-gradient(to right, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.5) 3px, rgba(255, 255, 255, 0.25) 4px, rgba(255, 255, 255, 0.25) 6px, transparent 7px, transparent 9px, rgba(255, 255, 255, 0.25) 9px, transparent 12px)",
                }}
              />
              <img
                src={book.coverUrl}
                alt={book.title}
                style={{
                  width: `${w * 4}px`,
                  height: `${h}px`,
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(0,0,0,0.12)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              opacity: isClosing ? 0 : isExpanded ? 1 : 0,
              transition: "opacity 100ms ease",
            }}
            onClick={close}
          />
          <div
            ref={modalRef}
            style={getModalStyle()}
            className="bg-white border-2 border-neutral-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-full overflow-auto p-5 md:p-6"
              style={{
                opacity: isExpanded ? 1 : 0,
                transition: "opacity 100ms cubic-bezier(0.33,0,0.2,1)",
              }}
            >
              <button
                onClick={close}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-black cursor-pointer z-10"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <img
                  src={books[modal.index].coverUrl}
                  alt={books[modal.index].title}
                  className="max-h-[70%] rounded-lg object-contain"
                />
                <h2
                  className="text-xl font-bold tracking-tight text-black text-center max-w-md"
                  style={{ fontFamily: "var(--font-serif), 'Lora', serif" }}
                >
                  {books[modal.index].title}
                </h2>
                {books[modal.index].date && (
                  <span className="text-[11px] font-mono text-neutral-300">
                    {books[modal.index].date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
