"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ProjectItem } from "../utils/interfaces"

type ModalState =
  | { phase: "closed" }
  | { phase: "expanding"; project: ProjectItem; startRect: DOMRect }
  | { phase: "open"; project: ProjectItem; startRect: DOMRect }
  | { phase: "closing"; project: ProjectItem; startRect: DOMRect };

export default function ProjectSection({ projects, showDates = false, fullWidth = false, static: isStatic = false }: { projects: ProjectItem[]; showDates?: boolean; fullWidth?: boolean; static?: boolean }) {
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

  // Open modal from URL param on mount
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("o");
    if (!slug) return;
    const project = projects.find((p) => (p.slug ?? p.title) === slug);
    if (!project) return;
    // Wait for refs to be populated
    requestAnimationFrame(() => handleOpen(project));
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

    // expanding (initial frame — match card position)
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
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-sm font-normal text-neutral-700 text-balance ${!isStatic ? "group-hover:text-neutral-800 transition-colors" : ""}`}>
                  {project.title}
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
              onClick={() => handleOpen(project)}
              className="group block text-left cursor-pointer hover:text-neutral-900 outline-none"
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
