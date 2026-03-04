"use client";

import { useState } from "react";

const EMAIL = "ahamidi@ucsd.edu";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-neutral-600 no-underline border-b border-neutral-300 hover:border-black hover:text-black transition-colors cursor-pointer bg-transparent p-0 font-inherit text-inherit leading-inherit"
    >
      {copied ? "Copied!" : "click here to copy my email"}
    </button>
  );
}
