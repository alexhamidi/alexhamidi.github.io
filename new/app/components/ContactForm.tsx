"use client";

import { useState } from "react";
import { addPostIt } from "./PostItWall";

export default function ContactForm() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    addPostIt(message.trim());
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="relative flex items-end"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="leave a note"
        rows={1}
        className="w-full resize-none text-sm bg-transparent border-[1.5px] border-neutral-600 rounded outline-none px-3 py-2 pr-14 text-neutral-600 placeholder:text-neutral-300 transition-colors duration-200"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="absolute right-2 bottom-1.5 text-sm px-2 py-0.5 text-neutral-600 disabled:opacity-30 transition-colors duration-200 cursor-pointer"
      >
        send
      </button>
    </form>
  );
}
