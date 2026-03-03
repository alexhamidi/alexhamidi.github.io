"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ProjectItem } from "../utils/interfaces"

function ProjectMedia({ project }: { project: ProjectItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!project.video && !project.image) return null;

  const togglePlay = (e: React.MouseEvent) => {
    if (!videoRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (project.volume && project.volume > 1 && !audioCtxRef.current) {
        try {
          const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
          const ctx = new AudioContextClass();
          const source = ctx.createMediaElementSource(videoRef.current);
          const gainNode = ctx.createGain();
          gainNode.gain.value = project.volume;
          source.connect(gainNode);
          gainNode.connect(ctx.destination);
          audioCtxRef.current = ctx;
        } catch (e) {
          console.warn("AudioContext failed", e);
        }
      }

      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }

      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className="relative mb-3 w-full aspect-[16/10] overflow-hidden rounded-lg border border-neutral-200 group/media cursor-pointer"
      onClick={togglePlay}
    >
      {project.video ? (
        <>
          <video
            ref={videoRef}
            src={project.video}
            className="w-full h-full object-cover"
            playsInline
            loop
            crossOrigin="anonymous"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-black/5 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover/media:opacity-100' : 'opacity-100'}`}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-neutral-200/50 transition-transform duration-200 active:scale-90">
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
              )}
            </div>
          </div>
        </>
      ) : project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>
  );
}

type ModalState =
  | { phase: "closed" }
  | { phase: "expanding"; project: ProjectItem; startRect: DOMRect }
  | { phase: "open"; project: ProjectItem; startRect: DOMRect }
  | { phase: "closing"; project: ProjectItem; startRect: DOMRect };

export default function ProjectSection({ projects, showDates = false, fullWidth = false, static: isStatic = false, hideBlogTag = false }: { projects: ProjectItem[]; showDates?: boolean; fullWidth?: boolean; static?: boolean; hideBlogTag?: boolean }) {
  const [modal, setModal] = useState<ModalState>({ phase: "closed" });
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const modalRef = useRef<HTMLDivElement>(null);

  const getTargetRect = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = Math.min(900, vw - 32);
    const maxH = vh * 0.92;
    return {
      top: (vh - maxH) / 2,
      left: (vw - maxW) / 2,
      width: maxW,
      height: maxH,
    };
  }, []);

  const handleOpen = useCallback((project: ProjectItem) => {
    const card = cardRefs.current.get(project.title);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    window.history.pushState(null, "", `?o=${project.slug ?? project.title}`);
    setModal({ phase: "expanding", project, startRect: rect });
  }, []);

  const handleClose = useCallback(() => {
    if (modal.phase === "open" || modal.phase === "expanding") {
      window.history.pushState(null, "", window.location.pathname);
      setModal({ ...modal, phase: "closing" } as ModalState);
      setTimeout(() => {
        document.body.style.overflow = "";
        setModal({ phase: "closed" });
      }, 220);
    }
  }, [modal]);

  // Trigger expansion on next frame after mount
  useEffect(() => {
    if (modal.phase === "expanding") {
      modalRef.current?.getBoundingClientRect();
      requestAnimationFrame(() => {
        setModal((prev) =>
          prev.phase === "expanding" ? { ...prev, phase: "open" } : prev,
        );
      });
    }
  }, [modal.phase]);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("o");
    if (!slug) return;
    const project = projects.find((p) => (p.slug ?? p.title) === slug);
    if (!project) return;
    if (project.blog && project.slug) {
      window.location.href = `/w/${project.slug}`;
    } else {
      requestAnimationFrame(() => handleOpen(project));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on escape
  useEffect(() => {
    if (modal.phase === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.phase, handleClose]);

  // Listen for sidebar open requests
  useEffect(() => {
    const handler = (e: Event) => {
      const title = (e as CustomEvent).detail;
      const project = projects.find((p) => p.title === title);
      if (project) handleOpen(project);
    };
    window.addEventListener("open-modal", handler);
    return () => window.removeEventListener("open-modal", handler);
  }, [projects, handleOpen]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isVisible = modal.phase !== "closed";
  const isExpanded = modal.phase === "open";
  const isClosing = modal.phase === "closing";

  const TIMING =
    "top 200ms cubic-bezier(0.4, 0, 0.2, 1), left 200ms cubic-bezier(0.4, 0, 0.2, 1), width 200ms cubic-bezier(0.4, 0, 0.2, 1), height 200ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)";

  const getModalStyle = (): React.CSSProperties => {
    if (!isVisible) return {};
    const { startRect } = modal;

    if (isExpanded) {
      const target = getTargetRect();
      return {
        position: "fixed",
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        borderRadius: 8,
        transition: TIMING,
        zIndex: 51,
      };
    }

    if (isClosing) {
      return {
        position: "fixed",
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        borderRadius: 8,
        transition: TIMING,
        zIndex: 51,
      };
    }

    // expanding (initial frame - match card position)
    return {
      position: "fixed",
      top: startRect.top,
      left: startRect.left,
      width: startRect.width,
      height: startRect.height,
      borderRadius: 8,
      zIndex: 51,
    };
  };

  const selectedTitle = modal.phase !== "closed" ? modal.project.title : null;

  return (
    <>
      <div className={`grid gap-y-12 ${fullWidth ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 gap-x-8"}`}>
        {projects.map((project) => {
          const inner = (
            <>
              <ProjectMedia project={project} />
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-sm font-normal text-neutral-700 text-balance ${!isStatic ? "group-hover:text-neutral-800 transition-colors" : ""}`}>
                  {project.title}
                  {project.blog && !hideBlogTag && (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-500 rounded lowercase transition-colors group-hover:bg-neutral-200 group-hover:text-black">
                      blog
                    </span>
                  )}
                </h3>
                {project.badge_path && (
                  <img
                    src={project.badge_path}
                    alt=""
                    className="h-[17px] w-[17px] rounded border-[px] border-neutral-200 object-cover flex-shrink-0"
                  />
                )}
                {showDates && (
                  <span className="text-sm text-neutral-400 ml-auto flex-shrink-0">
                    {project.date}
                  </span>
                )}
              </div>
              <p className={`text-neutral-400 leading-relaxed text-[13px] line-clamp-3 ${!isStatic ? "group-hover:text-neutral-800 transition-colors" : ""}`}>
                {project.description}
              </p>
            </>
          );

          if (isStatic) {
            return (
              <div key={project.title} className="block text-left">
                {inner}
              </div>
            );
          }

          return (
            <button
              key={project.title}
              ref={(el) => {
                if (el) cardRefs.current.set(project.title, el);
              }}
              onClick={() => {
                if (project.blog && project.slug) {
                  window.open(`/w/${project.slug}`, "_blank", "noopener,noreferrer");
                } else {
                  window.open(project.link, "_blank", "noopener,noreferrer");
                }
              }}
              className="group block text-left cursor-pointer hover:text-neutral-900 outline-none w-full"
              style={{
                opacity: selectedTitle === project.title && !isClosing ? 0 : 1,
                transition: "opacity 80ms",
              }}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* Overlay */}
      {isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(0,0,0,0.12)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              opacity: isClosing ? 0 : isExpanded ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
            onClick={handleClose}
          />

          {/* Modal panel */}
          <div
            ref={modalRef}
            style={getModalStyle()}
            className={`bg-white overflow-hidden transition-[border-color] duration-200 border-2 ${isExpanded ? "border-neutral-200" : "border-transparent"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner content */}
            <div
              className="h-full overflow-auto p-5 md:p-10"
              style={{
                opacity: isExpanded ? 1 : 0,
                transition: "opacity 100ms cubic-bezier(0.33, 0, 0.2, 1)",
              }}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  {modal.project.title}
                </h2>
                <span className="text-[11px] text-neutral-300">
                  {modal.project.date}
                </span>
              </div>

              {modal.project.content ? (
                <div className="prose prose-neutral max-w-2xl mt-4 mb-8">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const isBlock = match || String(children).includes("\n");
                        if (isBlock) {
                          return (
                            <SyntaxHighlighter
                              style={oneLight}
                              language={match ? match[1] : "text"}
                              PreTag="div"
                              customStyle={{ borderRadius: 6, fontSize: "0.85em", margin: "1.25rem 0" }}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          );
                        }
                        return <code className={className} {...props}>{children}</code>;
                      },
                    }}
                  >
                    {modal.project.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-8 max-w-2xl mt-4">
                  {modal.project.description}
                </p>
              )}

              {modal.project.link && (
                <div>
                  <a
                    href={modal.project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-black no-underline border-b border-neutral-300 hover:border-black transition-colors pb-0.5"
                  >
                    View project
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
