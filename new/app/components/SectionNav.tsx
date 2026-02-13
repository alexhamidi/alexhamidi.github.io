"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface NavItem {
  label: string;
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
  { label: "Samantha", year: "2025" },
  { label: "Monotool", year: "2025" },
  { label: "AutoMCP", year: "2025" },
  { label: "Umari", year: "2025" },
  { label: "Clado", year: "2025" },
  { label: "Graphit", year: "2025" },
];

export default function SectionNav({ books }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>("projects");
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout>(undefined);

  const bookItems: NavItem[] = books.map((b) => ({
    label: b.title.length > 20 ? b.title.slice(0, 18) + "\u2026" : b.title,
    year: new Date(b.date).getFullYear().toString(),
  }));

  const sections: NavSection[] = [
    { title: "Projects", sectionId: "projects", items: projects },
    { title: "Reading", sectionId: "reading", items: bookItems },
    { title: "Thoughts", sectionId: "thoughts" },
    {
      title: "Favorites",
      sectionId: "favorites",
      items: [
        { label: "Music", scrollId: "fav-music" },
        { label: "Art", scrollId: "fav-art" },
        { label: "Quotes", scrollId: "fav-quotes" },
      ],
    },
  ];

  const handleClick = useCallback((sectionId: string) => {
    // Lock the observer while we scroll programmatically
    isClickScrolling.current = true;
    setActiveSection(sectionId);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Unlock after scroll settles
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

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
            candidates.push({ id: entry.target.id, top: entry.boundingClientRect.top });
          }
        }

        if (candidates.length > 0) {
          candidates.sort((a, b) => a.top - b.top);
          setActiveSection(candidates[0].id);
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 }
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
    { href: "https://www.linkedin.com/in/alexander-hamidi-208736254/", label: "LinkedIn" },
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
                  isActive ? "text-black font-semibold" : "text-neutral-600 font-medium"
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
                    onClick={item.scrollId ? () => handleClick(item.scrollId!) : undefined}
                    className={`nav-leader-item text-neutral-400 bg-transparent border-0 p-0 text-left ${
                      item.scrollId ? "cursor-pointer hover:text-neutral-600" : ""
                    } transition-colors duration-150`}
                  >
                    <span className="nav-leader-label text-[12px]">{item.label}</span>
                    {item.year && (
                      <>
                        <span className="nav-leader-dots" />
                        <span className="nav-leader-year text-[12px] font-mono">{item.year}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-auto pt-6 flex flex-col gap-1.5 ml-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] no-underline text-neutral-300 hover:text-black transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
