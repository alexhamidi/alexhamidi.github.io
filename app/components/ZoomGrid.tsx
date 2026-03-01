"use client";

import { useState, useRef, useCallback, useEffect, ReactNode } from "react";

type ModalState =
  | { phase: "closed" }
  | { phase: "expanding"; startRect: DOMRect; index: number }
  | { phase: "open"; startRect: DOMRect; index: number }
  | { phase: "closing"; startRect: DOMRect; index: number };

type ZoomGridProps<T> = {
  items: T[];
  keyFn: (item: T, index: number) => string;
  renderCard: (item: T, index: number) => ReactNode;
  renderExpanded: (item: T, index: number) => ReactNode;
  gridClassName?: string;
  cardClassName?: string;
  clickable?: boolean;
};

export default function ZoomGrid<T>({
  items,
  keyFn,
  renderCard,
  renderExpanded,
  gridClassName = "grid grid-cols-2 md:grid-cols-3 gap-3",
  cardClassName = "",
  clickable = true,
}: ZoomGridProps<T>) {
  const [modal, setModal] = useState<ModalState>({ phase: "closed" });
  const cardRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
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

  const handleOpen = useCallback((index: number) => {
    const card = cardRefs.current.get(index);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    document.body.style.overflow = "hidden";
    setModal({ phase: "expanding", startRect: rect, index });
  }, []);

  const handleClose = useCallback(() => {
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
      requestAnimationFrame(() => {
        setModal((prev) =>
          prev.phase === "expanding" ? { ...prev, phase: "open" } : prev,
        );
      });
    }
  }, [modal.phase]);

  useEffect(() => {
    if (modal.phase === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.phase, handleClose]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isVisible = modal.phase !== "closed";
  const isExpanded = modal.phase === "open";
  const isClosing = modal.phase === "closing";

  const TIMING = "all 100ms cubic-bezier(0.33, 0, 0.2, 1)";

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

  const selectedIndex = modal.phase !== "closed" ? modal.index : null;

  return (
    <>
      <div className={gridClassName}>
        {items.map((item, index) =>
          clickable ? (
            <button
              key={keyFn(item, index)}
              ref={(el) => {
                if (el) cardRefs.current.set(index, el);
              }}
              onClick={() => handleOpen(index)}
              className={`group block text-left cursor-pointer ${cardClassName}`}
              style={{
                opacity: selectedIndex === index && !isClosing ? 0 : 1,
                transition: "opacity 80ms",
              }}
            >
              {renderCard(item, index)}
            </button>
          ) : (
            <div key={keyFn(item, index)} className={`block ${cardClassName}`}>
              {renderCard(item, index)}
            </div>
          )
        )}
      </div>

      {clickable && isVisible && (
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
            onClick={handleClose}
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
                transition: "opacity 100ms cubic-bezier(0.33, 0, 0.2, 1)",
              }}
            >
              {renderExpanded(items[modal.index], modal.index)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
