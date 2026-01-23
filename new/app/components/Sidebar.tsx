"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SubItem {
  href: string;
  label: string;
  badge?: string;
}

interface NavigationLink {
  href: string;
  label: string;
  subitems?: SubItem[];
}

export default function Sidebar({ booksData }: { booksData?: Array<{ slug: string; title: string }> }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const getInitialExpandedSections = () => {
    const sections = new Set<string>();
    if (pathname.startsWith("/books")) {
      sections.add("/books");
    }
    return sections;
  };
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(getInitialExpandedSections());

  useEffect(() => {
    if (pathname.startsWith("/books")) {
      setExpandedSections(prev => {
        const newSet = new Set(prev);
        newSet.add("/books");
        return newSet;
      });
    }
  }, [pathname]);

  const toggleSection = (href: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  const navigationLinks: NavigationLink[] = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/music", label: "Music" },
    { href: "/thoughts", label: "Blogs" },
    // { href: "/politics", label: "PoliticGPT" },
    { 
      href: "/books", 
      label: "Reading",
      subitems: booksData?.map(book => ({
        href: `/books/${book.slug}`,
        label: book.title
      }))
    },
    { href: "/stimulus", label: "Notes" },
  ];

  const socialLinks = [
    { href: "https://twitter.com/ahamidi_", label: "Twitter" },
    { href: "https://github.com/alexhamidi/", label: "GitHub" },
    { href: "https://www.linkedin.com/in/alexander-hamidi-208736254/", label: "LinkedIn" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen pt-12 pl-20 z-10 overflow-y-auto">
        <div className="flex flex-col gap-12">
          {/* <div className="flex flex-col">
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) => (
                <div key={link.href} className="flex flex-col">
                  <div className="flex items-center gap-1.5 py-1.5">
                    {link.subitems ? (
                      <button
                        onClick={() => toggleSection(link.href)}
                        className="w-4 flex items-center justify-center text-gray-500 hover:text-black transition-colors duration-150 flex-shrink-0"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {expandedSections.has(link.href) ? "−" : "+"}
                      </button>
                    ) : (
                      <span className="w-4 flex-shrink-0" />
                    )}
                    <Link
                      href={link.href}
                      className={`text-lg no-underline transition-colors duration-150 ${
                        pathname === link.href 
                          ? "text-black font-medium" 
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                  
                  {link.subitems && (
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out origin-top ${
                        expandedSections.has(link.href) ? 'sidebar-expand' : ''
                      }`}
                      style={{
                        maxHeight: expandedSections.has(link.href) 
                          ? `${link.subitems.length * 36}px` 
                          : '0px',
                      }}
                    >
                      <div className="flex flex-col gap-0.5 pt-1 pb-1">
                        {link.subitems.map((subitem, index) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={`text-base no-underline transition-all duration-150 flex items-center gap-1.5 py-1.5 pl-5 ${
                              pathname === subitem.href
                                ? "text-black font-medium"
                                : "text-gray-500 hover:text-black"
                            }`}
                            style={{
                              transitionDelay: expandedSections.has(link.href) 
                                ? `${index * 20}ms` 
                                : '0ms',
                              opacity: expandedSections.has(link.href) ? 1 : 0,
                            }}
                          >
                            <span className="text-gray-400 text-sm">└</span>
                            <span className="truncate">{subitem.label}</span>
                            {subitem.badge && (
                              <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded ml-auto">
                                {subitem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div> */}

          <div className="flex flex-col">
            {/* <div className="text-xs font-bold tracking-wider mb-4 text-gray-500 uppercase pl-5.5">
              SOCIALS
            </div> */}
            <nav className="flex flex-col gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg no-underline text-gray-500 hover:text-black transition-colors duration-150 py-1.5 pl-5.5"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
