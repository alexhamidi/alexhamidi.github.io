import SectionNav from './components/SectionNav';
import { getAllBooks } from './(subpages)/books/utils';

export const dynamic = 'force-dynamic';

const projects = [
  {
    title: "Samantha",
    description: "Playwright wrapper for Meta's SAM that removes the 29s limit by chunking and stitching audio",
    date: "2025",
    link: "https://github.com/alexhamidi/samantha",
    tags: ["Python", "Audio"],
  },
  {
    title: "Monotool",
    description: "Tool to manage and orchestrate MCP servers from a single interface",
    date: "2025",
    link: "https://monotool.vercel.app",
    tags: ["TypeScript", "MCP"],
  },
  {
    title: "AutoMCP",
    description: "Deploy MCP servers easily with one command",
    date: "2025",
    link: "https://automcp.app",
    tags: ["TypeScript", "Infra"],
  },
  {
    title: "Umari",
    description: "The fastest web agent in the world",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["Python", "AI"],
  },
  {
    title: "Clado",
    description: "A new query language for people search",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["TypeScript", "Search"],
  },
  {
    title: "Graphit",
    description: "If you can think it, you can graph it",
    date: "2025",
    link: "https://github.com/alexhamidi/graphit",
    tags: ["TypeScript", "Viz"],
  },
  {
    title: "APSS",
    description: "Agentic Program Search System — framework for composing LLM systems",
    date: "2025",
    link: "https://github.com/alexhamidi/APSS",
    tags: ["Python", "AI"],
  },
  {
    title: "GMA",
    description: "Voice AI assistant using OpenAI's Realtime API with native iOS and React Native",
    date: "2025",
    link: "https://github.com/alexhamidi/gma",
    tags: ["Swift", "AI"],
  },
];

const thoughts = [
  {
    title: "headspace",
    date: "2025",
    excerpt: "Reflections on consciousness and mental clarity.",
  },
];

const photos = [
  "DSC02532.jpg",
  "IMG_1649.jpg",
  "IMG_1607.jpg",
  "IMG_1608.jpg",
  "IMG_1628.jpg",
  "IMG_1640.jpg",
  "IMG_1655.jpg",
  "IMG_1660.jpg",
  "IMG_0399.jpg",
  "IMG_1095.jpg",
  "IMG_1102.jpg",
  "IMG_1145.jpg",
  "IMG_1417.jpg",
  "IMG_1419.jpg",
  "IMG_1528.jpg",
  "IMG_2688_2.jpg",
  "3898072146119326550_2.jpg",
];

const quotes = [
  {
    text: "I can stand brute force, but something about brute reason is quite unbearable. It is hitting below the intellect.",
    author: "Oscar Wilde",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
];

export default function Home() {
  const books = getAllBooks();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-8 md:px-16 pt-20 pb-16">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-black"
          style={{ fontFamily: "var(--font-serif), 'Lora', serif" }}
        >
          Alex Hamidi
        </h1>
        <div className="mt-8 max-w-2xl space-y-5">
          <p className="text-base text-neutral-500 leading-relaxed">
            I build AI systems and previously founded a few companies.
            Most of my work focuses on making practical tools that solve real problems.
            Currently interested in world models and diffusion models.
          </p>
          <p className="text-base text-neutral-500 leading-relaxed">
            I help run{" "}
            <a href="https://sdxucsd.com" target="_blank" rel="noopener noreferrer" className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors">
              SDxUCSD
            </a>
            , a startup accelerator at UC San Diego, connecting founders and engineers.
          </p>
          <p className="text-base text-neutral-500 leading-relaxed">
            Outside of code I make music, shoot film, and read too many books.
            Every experience is an opportunity to understand the world and myself better.
          </p>
        </div>
      </section>

      {/* Content with sticky nav */}
      <div className="relative max-w-3xl mx-auto px-8 md:px-16">
        <div className="hidden lg:block fixed top-16 right-[calc(50%+24rem+3rem)]">
          <SectionNav books={books.map(b => ({ title: b.title, date: b.date }))} />
        </div>

        <div className="pb-24">

          {/* Projects */}
          <section id="projects" className="scroll-mt-16 mb-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block no-underline p-5 rounded-lg border border-neutral-100 hover:border-neutral-300 bg-white/60 hover:bg-white transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-semibold text-black group-hover:text-black">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-300 pt-0.5 flex-shrink-0">
                      {project.date}
                    </span>
                  </div>
                  <p className="text-[13px] text-neutral-500 mt-1.5 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Reading */}
          <section id="reading" className="scroll-mt-16 mb-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Reading</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {books.map((book) => (
                <a
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="group block no-underline"
                >
                  <div
                    className="rounded-lg overflow-hidden h-44 flex items-end p-3 transition-transform duration-200 group-hover:scale-[1.02]"
                    style={{ backgroundColor: book.spineColor }}
                  >
                    {book.hasCover ? (
                      <img
                        src={`/books/${book.slug}/cover.png`}
                        alt={book.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span
                        className="text-[13px] font-medium leading-tight"
                        style={{ color: book.textColor }}
                      >
                        {book.title}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-black mt-2 leading-tight">
                    {book.title}
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{book.author}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Thoughts */}
          <section id="thoughts" className="scroll-mt-16 mb-24">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Thoughts</h2>
            <div className="flex flex-col gap-3">
              {thoughts.map((thought) => (
                <div
                  key={thought.title}
                  className="p-5 rounded-lg border border-neutral-100 bg-white/60"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[15px] font-semibold text-black">{thought.title}</h3>
                    <span className="text-[11px] font-mono text-neutral-300">{thought.date}</span>
                  </div>
                  <p className="text-[13px] text-neutral-500 mt-1.5">{thought.excerpt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Favorites */}
          <section id="favorites" className="scroll-mt-16 mb-24">
            <h2 className="text-2xl font-bold tracking-tight mb-12">Favorites</h2>

            {/* Music */}
            <div id="fav-music" className="scroll-mt-16 mb-16">
              <h3 className="text-lg font-semibold tracking-tight mb-4">Music</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed mb-5 max-w-lg">
                I produce electronic and ambient music. Influenced by French 79, Kavinsky, and RUFUS DU SOL.
                Use the player at the bottom to listen.
              </p>
            </div>

            {/* Art / Photos */}
            <div id="fav-art" className="scroll-mt-16 mb-16">
              <h3 className="text-lg font-semibold tracking-tight mb-4">Art</h3>
              <div className="columns-2 md:columns-3 gap-3 space-y-3">
                {photos.map((photo) => (
                  <img
                    key={photo}
                    src={`/photos/${photo}`}
                    alt=""
                    className="w-full rounded-lg break-inside-avoid"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Quotes */}
            <div id="fav-quotes" className="scroll-mt-16">
              <h3 className="text-lg font-semibold tracking-tight mb-4">Quotes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quotes.map((quote) => (
                  <div
                    key={quote.author + quote.text.slice(0, 20)}
                    className="p-5 rounded-lg border border-neutral-100 bg-white/60"
                  >
                    <p className="text-[13px] italic text-neutral-600 leading-relaxed">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-3">&mdash; {quote.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Mobile footer */}
      <footer className="lg:hidden max-w-3xl mx-auto border-t border-neutral-100 py-8 px-8 flex gap-6">
        <a href="https://twitter.com/ahamidi_" target="_blank" rel="noopener noreferrer" className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors">Twitter</a>
        <a href="https://github.com/alexhamidi" target="_blank" rel="noopener noreferrer" className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/in/alexander-hamidi-208736254/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors">LinkedIn</a>
      </footer>
    </div>
  );
}
