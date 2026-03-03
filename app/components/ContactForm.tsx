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
      className="relative flex items-center mt-6"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What should exist in the world?"
        className="w-full text-sm bg-transparent border-[1.5px] border-neutral-600 rounded outline-none px-3 py-2 pr-14 text-neutral-600 placeholder:text-neutral-400 transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="absolute right-2 text-sm px-2 py-1 text-neutral-600 disabled:opacity-30 transition-colors duration-200 cursor-pointer"
      >
        send
      </button>
    </form>
  );
}
