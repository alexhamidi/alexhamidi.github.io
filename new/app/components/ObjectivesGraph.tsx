"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ObjectiveNode {
  id: string;
  label: string;
  children: string[];
}

const objectives: ObjectiveNode[] = [
  {
    id: "fulfillment",
    label: "Interacting with friends",
    children: ["mastery", "impact", "connection"],
  },
  {
    id: "freedom",
    label: "Freedom",
    children: ["wealth", "health", "mastery"],
  },
  {
    id: "mastery",
    label: "Mastery",
    children: ["deep-work", "learn-daily", "build"],
  },
  {
    id: "impact",
    label: "Impact",
    children: ["build", "teach", "open-source"],
  },
  {
    id: "connection",
    label: "Connection",
    children: ["presence", "generosity"],
  },
  { id: "wealth", label: "Wealth", children: ["build", "invest", "leverage"] },
  {
    id: "health",
    label: "Health",
    children: ["exercise", "sleep", "nutrition"],
  },
  { id: "deep-work", label: "Deep Work", children: [] },
  { id: "learn-daily", label: "Learn Daily", children: [] },
  { id: "build", label: "Build", children: ["ship-weekly"] },
  { id: "teach", label: "Teach", children: [] },
  { id: "open-source", label: "Open Source", children: [] },
  { id: "presence", label: "Presence", children: [] },
  { id: "generosity", label: "Generosity", children: [] },
  { id: "invest", label: "Invest", children: [] },
  { id: "leverage", label: "Leverage", children: [] },
  { id: "exercise", label: "Exercise", children: [] },
  { id: "sleep", label: "Sleep", children: [] },
  { id: "nutrition", label: "Nutrition", children: [] },
  { id: "ship-weekly", label: "Ship Weekly", children: [] },
];

function getNodeById(id: string): ObjectiveNode | undefined {
  return objectives.find((n) => n.id === id);
}

function getRootNodes(): ObjectiveNode[] {
  const childIds = new Set(objectives.flatMap((n) => n.children));
  return objectives.filter((n) => !childIds.has(n.id));
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
}

const rootColors: Record<
  string,
  { main: string; light: string; border: string }
> = {
  fulfillment: { main: "#3b82f6", light: "#dbeafe", border: "#2563eb" },
  freedom: { main: "#8b5cf6", light: "#ede9fe", border: "#7c3aed" },
};

function getRootAncestor(id: string): string {
  const roots = getRootNodes().map((n) => n.id);
  if (roots.includes(id)) return id;

  const visited = new Set<string>();
  for (const root of roots) {
    const queue = [root];
    visited.clear();
    while (queue.length) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      if (current === id) return root;
      const node = getNodeById(current);
      if (node) queue.push(...node.children);
    }
  }
  return roots[0] || "fulfillment";
}

export default function ObjectivesGraph() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [positions, setPositions] = useState<NodePosition[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        const toRemove = new Set<string>();
        const queue = [id];
        while (queue.length) {
          const current = queue.shift()!;
          toRemove.add(current);
          const node = getNodeById(current);
          if (node) {
            for (const child of node.children) {
              if (next.has(child)) queue.push(child);
            }
          }
        }
        toRemove.forEach((r) => next.delete(r));
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getVisibleLevels = useCallback((): string[][] => {
    const roots = getRootNodes().map((n) => n.id);
    const levels: string[][] = [roots];
    const visited = new Set<string>(roots);

    let currentLevel = roots;
    while (true) {
      const nextLevel: string[] = [];
      for (const id of currentLevel) {
        if (expanded.has(id)) {
          const node = getNodeById(id);
          if (node) {
            for (const child of node.children) {
              if (!visited.has(child)) {
                visited.add(child);
                nextLevel.push(child);
              }
            }
          }
        }
      }
      if (nextLevel.length === 0) break;
      levels.push(nextLevel);
      currentLevel = nextLevel;
    }

    return levels;
  }, [expanded]);

  const levels = getVisibleLevels();
  const visibleIds = new Set(levels.flat());

  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPositions: NodePosition[] = [];

      nodeRefs.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();
        newPositions.push({
          id,
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      });

      setPositions(newPositions);
    };

    const timer = setTimeout(updatePositions, 50);
    return () => clearTimeout(timer);
  }, [expanded]);

  const edges: { from: string; to: string }[] = [];
  for (const id of visibleIds) {
    if (expanded.has(id)) {
      const node = getNodeById(id);
      if (node) {
        for (const child of node.children) {
          if (visibleIds.has(child)) {
            edges.push({ from: id, to: child });
          }
        }
      }
    }
  }

  const getPos = (id: string) => positions.find((p) => p.id === id);

  return (
    <div ref={containerRef} className="relative py-8">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
        {edges.map(({ from, to }) => {
          const fromPos = getPos(from);
          const toPos = getPos(to);
          if (!fromPos || !toPos) return null;

          const midY = (fromPos.y + toPos.y) / 2;
          const rootId = getRootAncestor(from);
          const color = rootColors[rootId]?.main || "#d1d5db";
          const isHighlighted = hoveredNode === from || hoveredNode === to;

          return (
            <path
              key={`${from}-${to}`}
              d={`M ${fromPos.x} ${fromPos.y} C ${fromPos.x} ${midY}, ${toPos.x} ${midY}, ${toPos.x} ${toPos.y}`}
              fill="none"
              stroke={color}
              strokeWidth={isHighlighted ? "2.5" : "2"}
              opacity={isHighlighted ? 1 : 0.6}
              className="transition-all duration-200 ease-in-out"
            />
          );
        })}
      </svg>

      <div className="flex flex-col gap-12">
        {levels.map((level, depth) => (
          <div key={depth} className="flex justify-center gap-6 flex-wrap">
            {level.map((id) => {
              const node = getNodeById(id);
              if (!node) return null;
              const hasChildren = node.children.length > 0;
              const isExpanded = expanded.has(id);
              const rootId = getRootAncestor(id);
              const colors = rootColors[rootId] || {
                main: "#000",
                light: "#fff",
                border: "#e5e7eb",
              };
              const isHovered = hoveredNode === id;

              return (
                <button
                  key={id}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(id, el);
                    else nodeRefs.current.delete(id);
                  }}
                  onClick={() => hasChildren && toggle(id)}
                  onMouseEnter={() => setHoveredNode(id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`relative py-2.5 px-5 rounded-full border-2 text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap ${
                    hasChildren ? "cursor-pointer" : "cursor-default"
                  } ${isHovered ? "scale-105" : "scale-100"}`}
                  style={{
                    borderColor: isExpanded ? colors.main : colors.border,
                    backgroundColor: isExpanded ? colors.main : colors.light,
                    color: isExpanded ? "#fff" : colors.main,
                  }}
                >
                  {node.label}
                  {hasChildren && (
                    <span className="ml-1.5 text-[0.7rem] opacity-60">
                      {isExpanded ? "−" : "+"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
