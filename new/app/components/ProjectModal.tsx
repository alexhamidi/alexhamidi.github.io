"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  date: string;
  link: string;
  tags: string[];
  badge?: string;
};

type ModalState =
  | { phase: "closed" }
  | { phase: "expanding"; project: Project; startRect: DOMRect }
  | { phase: "open"; project: Project; startRect: DOMRect }
  | { phase: "closing"; project: Project; startRect: DOMRect };

export default function ProjectModal({ projects, showDates = false, fullWidth = false }: { projects: Project[]; showDates?: boolean; fullWidth?: boolean }) {
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

  const handleOpen = useCallback((project: Project) => {
    const card = cardRefs.current.get(project.title);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    setModal({ phase: "expanding", project, startRect: rect });
  }, []);

  const handleClose = useCallback(() => {
    if (modal.phase === "open" || modal.phase === "expanding") {
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
        {projects.map((project) => (
          <button
            key={project.title}
            ref={(el) => {
              if (el) cardRefs.current.set(project.title, el);
            }}
            onClick={() => handleOpen(project)}
            className="group block text-left cursor-pointer  hover:text-neutral-900"
            style={{
              opacity: selectedTitle === project.title && !isClosing ? 0 : 1,
              transition: "opacity 80ms",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-normal text-neutral-700 group-hover:text-neutral-800 transition-colors text-balance">
                {project.title}
              </h3>
              {project.badge && (
                <img
                  src={project.badge}
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
            <p className="text-neutral-400 group-hover:text-neutral-800 transition-colors leading-relaxed text-[13px] line-clamp-3">
              {project.description}
            </p>
          </button>
        ))}
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
              className="h-full overflow-auto p-5 md:p-6"
              style={{
                opacity: isExpanded ? 1 : 0,
                transition: "opacity 100ms cubic-bezier(0.33, 0, 0.2, 1)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
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

              <div className="text-center mb-1">
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  {modal.project.title}
                </h2>
                <span className="text-[11px] font-mono text-neutral-300">
                  {modal.project.date}
                </span>
              </div>

              <p className="text-[15px] text-neutral-600 leading-relaxed mb-8 text-center max-w-lg mx-auto mt-4">
                {modal.project.description}
              </p>

              <div className="text-center">
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
