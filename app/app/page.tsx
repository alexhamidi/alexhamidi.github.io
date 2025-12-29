"use client";

import { useState } from "react";

export default function Home() {
  const [tooltipContent, setTooltipContent] = useState("copy");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const actualEmail = "alexanderhamidi1@gmail.com";

  const handleEmailHover = (e: React.MouseEvent) => {
    setTooltipVisible(true);
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
    setTooltipContent("copy");
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText(actualEmail);
    setTooltipContent("copied!");
    setTimeout(() => setTooltipContent("copy"), 1000);
  };

  const handleReadingHover = (e: React.MouseEvent) => {
    setTooltipVisible(true);
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
    setTooltipContent("The Art of Strategy by Avinash Dizit and Barry Nalebuff");
  };

  return (
    <div className="flex flex-col items-center text-gray-900 font-mono min-h-screen overflow-x-hidden">
      <div className="flex flex-col gap-8 max-w-[650px] px-5">
        <h1 className="text-2xl font-bold mt-24">alex hamidi</h1>

        <div className="flex flex-col gap-6 text-sm">
          <span>
            Hello! I&apos;m Alex. I study computer science at UCSD and I deeply enjoy building things.
          </span>

          <span>
            Currently, I&apos;m helping run{" "}
            <a href="https://sdxucsd.com" target="_blank" rel="noopener noreferrer">
              SDxUCSD
            </a>
            , maintaining{" "}
            <a href="https://bidder.dev" target="_blank" rel="noopener noreferrer">
              bidder.dev
            </a>
            , and{" "}
            <a href="https://ahamidi.me/web" target="_blank" rel="noopener noreferrer">
              tinkering
            </a>{" "}
            and{" "}
            <span
              className="cursor-default underline transition-all duration-500 hover:text-gray-50 hover:bg-gray-900 px-0.5"
              onMouseMove={handleReadingHover}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              reading
            </span>{" "}
            on the side. I also enjoy music production.
          </span>

          <span>
            I recently:
            <ul className="list-none pl-4">
              <li className="mt-2 list-disc">
                worked on{" "}
                <a href="https://tryforsite.com/" target="_blank" rel="noopener noreferrer">
                  semantic search for projects
                </a>{" "}
                and a{" "}
                <a href="https://www.graphitapp.com" target="_blank" rel="noopener noreferrer">
                  graph editor
                </a>
              </li>
              <li className="mt-2 list-disc">
                built stuff to make it easier to{" "}
                <a href="https://monotool.vercel.app" target="_blank" rel="noopener noreferrer">
                  manage
                </a>{" "}
                and{" "}
                <a href="https://automcp.app" target="_blank" rel="noopener noreferrer">
                  deploy
                </a>{" "}
                MCP servers
              </li>
              <li className="mt-2 list-disc">
                scaled and sold a startup simplifying document redaction for federal agencies
              </li>
              <li className="mt-2 list-disc">
                Did engineering + product at{" "}
                <a href="https://clado.ai" target="_blank" rel="noopener noreferrer">
                  Clado
                </a>
                , a search engine for people
              </li>
            </ul>
          </span>

          <span>
            [
            <span
              className="cursor-default underline transition-all duration-500 hover:text-gray-50 hover:bg-gray-900 px-0.5"
              onMouseMove={handleEmailHover}
              onMouseLeave={() => setTooltipVisible(false)}
              onClick={handleEmailClick}
            >
              email
            </span>
            ]&nbsp;[
            <a
              href="https://www.linkedin.com/in/alexander-hamidi-208736254/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin
            </a>
            ]&nbsp;[
            <a href="https://github.com/alexhamidi/" target="_blank" rel="noopener noreferrer">
              github
            </a>
            ]&nbsp;[
            <a href="https://twitter.com/ahamidi_" target="_blank" rel="noopener noreferrer">
              twitter
            </a>
            ]
          </span>
        </div>

        <div className="flex flex-col gap-5 mt-2">
          <h2 className="text-base font-normal">technical</h2>

          <a href="/web" className="card-link">
            <div className="border border-gray-400 flex items-start gap-4 rounded-2xl overflow-hidden">
              <div className="flex-shrink-0 w-32 h-20 border-r border-gray-400">
                <img
                  src="/ai.webp"
                  alt="Teaching GPT-5 to Use a Computer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1.5 flex-1 flex flex-col gap-2 py-2.5">
                <h3 className="m-0 text-base font-normal">Umari</h3>
                <p className="m-0 text-sm text-gray-600">the fastest web agent in the world</p>
              </div>
              <div className="py-2.5 pr-2.5 flex-shrink-0 flex flex-col items-end gap-1.5 text-right">
                <span className="text-xs text-gray-500">October 2025</span>
              </div>
            </div>
          </a>

          <a href="/clado" className="card-link">
            <div className="border border-gray-400 flex items-start gap-4 rounded-2xl overflow-hidden">
              <div className="flex-shrink-0 w-32 h-20 border-r border-gray-400">
                <img
                  src="/clado.png"
                  alt="Clado"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1.5 flex-1 flex flex-col gap-2 py-2.5">
                <h3 className="m-0 text-base font-normal">Clado</h3>
                <p className="m-0 text-sm text-gray-600">creating a new query language</p>
              </div>
              <div className="py-2.5 pr-2.5 flex-shrink-0 flex flex-col items-end gap-1.5 text-right">
                <span className="text-xs text-gray-500">August 2025</span>
              </div>
            </div>
          </a>
        </div>

        <div className="flex flex-col gap-5 mt-2 mb-12">
          <h2 className="text-base font-normal">essays</h2>

          <a href="/decline" className="card-link">
            <div className="border border-gray-400 flex items-start gap-4 rounded-2xl overflow-hidden">
              <div className="flex-shrink-0 w-32 h-20 border-r border-gray-400">
                <img
                  src="/out.png"
                  alt="the decline of man"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1.5 flex-1 flex flex-col gap-2 py-2.5">
                <h3 className="m-0 text-base font-normal">The Decline of Man</h3>
              </div>
              <div className="py-2.5 pr-2.5 flex-shrink-0 flex flex-col items-end gap-1.5 text-right">
                <span className="text-xs text-gray-500">December 2025</span>
              </div>
            </div>
          </a>

          <a href="/headspace" className="card-link">
            <div className="border border-gray-400 flex items-start gap-4 rounded-2xl overflow-hidden">
              <div className="flex-shrink-0 w-32 h-20 border-r border-gray-400">
                <img
                  src="/mind.png"
                  alt="headspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-1.5 flex-1 flex flex-col gap-2 py-2.5">
                <h3 className="m-0 text-base font-normal">headspace</h3>
              </div>
              <div className="py-2.5 pr-2.5 flex-shrink-0 flex flex-col items-end gap-1.5 text-right">
                <span className="text-xs text-gray-500">September 2025</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {tooltipVisible && (
        <div
          className="fixed border border-gray-600 text-gray-600 bg-gray-50 px-2 py-1 text-xs pointer-events-none font-mono z-50"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
