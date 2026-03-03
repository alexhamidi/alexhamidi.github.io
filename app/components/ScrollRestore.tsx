"use client";

import { useEffect } from "react";

const STORAGE_KEY = "scroll-progress";

export default function ScrollRestore() {
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      window.scrollTo(0, Number(saved));
    }

    const save = () => {
      localStorage.setItem(STORAGE_KEY, String(window.scrollY));
    };

    window.addEventListener("scrollend", save, { passive: true });
    window.addEventListener("pagehide", save, { passive: true });

    return () => {
      window.removeEventListener("scrollend", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  return null;
}
