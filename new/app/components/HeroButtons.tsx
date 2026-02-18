"use client";

import { useState, useRef, useEffect, useCallback } from "react";
// import { addPostIt } from "./PostItWall";

const sections = ["work", "projects", "writing", "music", "gallery", "reading"];

export default function HeroButtons() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleContact = useCallback(() => {
    if (contactBtnRef.current) {
      setBtnRect(contactBtnRef.current.getBoundingClientRect());
    }
    setAnimating(true);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (textareaRef.current) textareaRef.current.blur();
    setAnimating(true);
    setOpen(false);
    setTimeout(() => setMessage(""), 200);
  }, []);

  useEffect(() => {
    if (animating) {
      const t = setTimeout(() => setAnimating(false), 200);
      return () => clearTimeout(t);
    }
  }, [animating, open]);

  useEffect(() => {
    if (open && !animating && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open, animating]);

  const handleLucky = () => {
    const section = sections[Math.floor(Math.random() * sections.length)];
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const clickable = el.querySelector("button, a[href]") as HTMLElement;
        if (clickable) clickable.click();
      }, 600);
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    // addPostIt(message.trim());
    if (textareaRef.current) textareaRef.current.blur();
    setAnimating(true);
    setOpen(false);
    setTimeout(() => setMessage(""), 200);
    setSent(true);
    setTimeout(() => setSent(false), 1500);
  };

  return (
    <div className="mt-8 relative" style={{ height: open ? 82 : 40, transition: "height 200ms cubic-bezier(0.33,0,0.2,1)" }}>
      {/* Buttons */}
      <div
        className="flex gap-3 absolute inset-0"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          transform: open ? "scale(0.98)" : "scale(1)",
          transformOrigin: "top left",
          willChange: "opacity, transform",
          transition: "opacity 200ms cubic-bezier(0.33,0,0.2,1), transform 200ms cubic-bezier(0.33,0,0.2,1)",
        }}
      >
        <button
          ref={contactBtnRef}
          onClick={handleContact}
          className={`text-sm px-4 py-2 border rounded transition-colors cursor-pointer ${
            sent
              ? "border-green-400 text-green-500"
              : "border-neutral-300 text-neutral-500 hover:border-black hover:text-black"
          }`}
        >
          {sent ? "Sent!" : "Contact me"}
        </button>
        <button
          onClick={handleLucky}
          className="text-sm px-4 py-2 border border-neutral-300 rounded hover:border-black hover:text-black text-neutral-500 transition-colors cursor-pointer"
        >
          I'm feeling lucky
        </button>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="absolute inset-0 flex items-start "
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "scale(1)" : "scale(0.95)",
          transformOrigin: "top left",
          willChange: "opacity, transform",
          transition: "opacity 200ms cubic-bezier(0.33,0,0.2,1), transform 200ms cubic-bezier(0.33,0,0.2,1)",
        }}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here. If you want me to respond, don't forget to include your contact information!"
          rows={3}
          className="w-full resize-none text-sm bg-transparent border-[1.5px] border-neutral-300 rounded outline-none px-3 py-2 pr-14 text-neutral-600 placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 h-[96%] flex flex-col px-4 ">
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-neutral-600 hover:text-neutral-600 h-full  transition-colors duration-200 cursor-pointer"
          >
            close
          </button>
          <button
            type="submit"
            disabled={!message.trim()}
            className="text-sm text-neutral-600 disabled:opacity-30 h-full transition-colors duration-200 cursor-pointer"
          >
            send
          </button>
        </div>
      </form>
    </div>
  );
}
