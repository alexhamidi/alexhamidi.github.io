"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface NavItem {
  label: string;
  fullTitle?: string;
  year?: string;
  scrollId?: string;
}

interface NavSection {
  title: string;
  sectionId: string;
  items?: NavItem[];
}

interface SectionNavProps {
  books: { title: string; date: string }[];
}

const projects: NavItem[] = [
  { label: "Samantha", fullTitle: "Samantha", year: "2025" },
  { label: "Monotool", fullTitle: "Monotool", year: "2025" },
  { label: "AutoMCP", fullTitle: "AutoMCP", year: "2025" },
  { label: "Umari", fullTitle: "Umari", year: "2025" },
  { label: "Clado", fullTitle: "Clado", year: "2025" },
  { label: "Graphit", fullTitle: "Graphit", year: "2025" },
];

export default function SectionNav({ books }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>("start");
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout>(undefined);

  const bookItems: NavItem[] = books.map((b) => ({
    label: b.title.length > 20 ? b.title.slice(0, 18) + "\u2026" : b.title,
    fullTitle: b.title,
    year: b.date || undefined,
  }));

  const sections: NavSection[] = [
    { title: "Home", sectionId: "start" },
    { title: "Work", sectionId: "work" },
    { title: "Projects", sectionId: "projects", items: projects },
    { title: "Writing", sectionId: "writing" },
    { title: "Music", sectionId: "music" },
    { title: "Gallery", sectionId: "gallery" },
    { title: "Reading", sectionId: "reading", items: bookItems },
    { title: "Wall", sectionId: "wall" },
  ];

  const handleClick = useCallback((sectionId: string) => {
    isClickScrolling.current = true;
    setActiveSection(sectionId);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  const handleItemClick = useCallback((sectionId: string, title: string) => {
    handleClick(sectionId);
    window.dispatchEvent(new CustomEvent("open-modal", { detail: title }));
  }, [handleClick]);

  useEffect(() => {
    const sectionIds = sections.map((s) => s.sectionId);
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        // Find section whose top is closest to (but below) top of viewport
        const candidates: { id: string; top: number }[] = [];
        for (const entry of entries) {
          if (entry.isIntersecting) {
            candidates.push({
              id: entry.target.id,
              top: entry.boundingClientRect.top,
            });
          }
        }

        if (candidates.length > 0) {
          candidates.sort((a, b) => a.top - b.top);
          setActiveSection(candidates[0].id);
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socialLinks = [
    { href: "https://twitter.com/ahamidi_", label: "Twitter" },
    { href: "https://github.com/alexhamidi", label: "GitHub" },
    { href: "https://news.ycombinator.com/user?id=alexhamidi", label: "HN" },
    { href: "https://open.spotify.com/user/alexhamidi", label: "Spotify" },
    { href: "https://letterboxd.com/alexhamidi", label: "Letterboxd" },
  ];

  return (
    <nav className="flex flex-col sticky top-16 w-52 flex-shrink-0 gap-5 pb-8">
      {sections.map((section) => {
        const isActive = activeSection === section.sectionId;
        return (
          <div key={section.sectionId}>
            <button
              onClick={() => handleClick(section.sectionId)}
              className={`cursor-pointer bg-transparent border-0 p-0 text-left transition-all duration-200 ${
                isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <span
                className={`text-[13px] tracking-wide uppercase ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-neutral-600 font-medium"
                }`}
              >
                {section.title}
              </span>
            </button>

            {section.items && isActive && (
              <div className="mt-2 ml-4 flex flex-col gap-px">
                {section.items.map((item, i) => (
                  <button
                    key={`${item.label}-${i}`}
                    onClick={() => handleItemClick(section.sectionId, item.fullTitle || item.label)}
                    className="nav-leader-item text-neutral-400 bg-transparent border-0 p-0 text-left cursor-pointer hover:text-neutral-600 transition-colors duration-150"
                  >
                    <span className="nav-leader-label text-[12px]">
                      {item.label}
                    </span>
                    {item.year && (
                      <>
                        <span className="nav-leader-dots" />
                        <span className="nav-leader-year text-[12px] font-mono">
                          {item.year}
                        </span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-auto pt-16 flex flex-col gap-5">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-wide uppercase no-underline text-neutral-600 font-medium opacity-40 hover:opacity-70 transition-all duration-200 flex items-center gap-1.5"
          >
            {link.label}
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 1.5H10.5V8.5" />
              <path d="M10.5 1.5L1.5 10.5" />
            </svg>
          </a>
        ))}
        {/* <CopyEmailButton /> */}
      </div>
    </nav>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("alexanderhamidi1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[13px] tracking-wide uppercase text-neutral-600 font-medium opacity-40 hover:opacity-70 transition-all duration-200 flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer text-left"
    >
      {copied ? "Copied!" : "Email"}
      <svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {copied ? (
          <path d="M2 6L5 9L10 3" />
        ) : (
          <>
            <rect x="4" y="4" width="7" height="7" rx="1" />
            <path d="M8 4V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" />
          </>
        )}
      </svg>
    </button>
  );
}
