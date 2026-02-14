import SectionNav from "./components/SectionNav";
import SectionHeader from "./components/SectionHeader";
import ProjectModal from "./components/ProjectModal";
import BookGrid, { type Book3D } from "./components/BookGrid";
import PhotoGrid from "./components/PhotoGrid";
import QuoteGrid from "./components/QuoteGrid";
import MusicCard from "./components/MusicCard";
import ContactForm from "./components/ContactForm";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const MJ_GALLERY_COUNT = 20;

function getMjImageItems() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "public/midjourney/data.json"),
    "utf-8",
  );
  const mjData = JSON.parse(raw);
  return mjData.data.filter(
    (item: { event_type: string }) =>
      item.event_type === "diffusion" || item.event_type === "variation",
  );
}

function getRandomMjUrls(count: number): string[] {
  const items = getMjImageItems();
  const shuffled = items.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((item: { id: string }) => {
    const variant = Math.floor(Math.random() * 4);
    return `https://cdn.midjourney.com/${item.id}/0_${variant}.png`;
  });
}

function getMjGalleryUrls(): string[] {
  return getRandomMjUrls(MJ_GALLERY_COUNT);
}

const projects = [
  {
    title: "Samantha",
    description:
      "A Playwright wrapper for Meta's Segment Anything Model that removes the 29-second limit. It chunks long audio files, processes each segment, and stitches them back together seamlessly.",
    date: "2025",
    link: "https://github.com/alexhamidi/samantha",
    tags: ["Python", "Audio"],
  },
  {
    title: "Monotool",
    description:
      "A unified interface for managing and orchestrating MCP servers. Connect, configure, and monitor all your model context protocol servers from a single dashboard.",
    date: "2025",
    link: "https://monotool.vercel.app",
    tags: ["TypeScript", "MCP"],
  },
  {
    title: "AutoMCP",
    description:
      "Deploy MCP servers with a single command. Handles configuration, hosting, and lifecycle management so you can focus on building tools instead of infrastructure.",
    date: "2025",
    link: "https://automcp.app",
    tags: ["TypeScript", "Infra"],
  },
  {
    title: "Umari",
    description:
      "The fastest web agent in the world. Uses a novel architecture for browser automation that outperforms existing approaches on speed and reliability benchmarks.",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["Python", "AI"],
  },
  {
    title: "Graphit",
    description:
      "If you can think it, you can graph it. A visualization tool that turns natural language descriptions into interactive charts, diagrams, and data visualizations instantly.",
    date: "2025",
    link: "https://github.com/alexhamidi/graphit",
    tags: ["TypeScript", "Viz"],
  },
  {
    title: "GMA",
    description:
      "A voice AI assistant built on OpenAI's Realtime API with native iOS and React Native clients. Low-latency conversational AI with streaming speech-to-speech interaction.",
    date: "2025",
    link: "https://github.com/alexhamidi/gma",
    tags: ["Swift", "AI"],
  },
];

const work = [
  {
    title: "Clado",
    description:
      "A new query language designed specifically for people search. Write expressive filters across professional networks, social graphs, and public records in a natural syntax.",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["TypeScript", "Search"],
    badge: "/badges/clado.png",
  },
  {
    title: "APSS",
    description:
      "Agentic Program Search System — a framework for composing LLM systems by searching over program spaces. Combines code generation with evaluation to find optimal agent architectures.",
    date: "2025",
    link: "https://github.com/alexhamidi/APSS",
    tags: ["Python", "AI"],
    badge: "/badges/sd.png",
  },
  {
    title: "Conway AI",
    description:
      "An AI-powered exploration of Conway's Game of Life. Uses neural networks to discover and classify emergent patterns, letting you search for structures by behavior rather than shape.",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["Python", "AI"],
    badge: "/badges/conway.png",
  },
  {
    title: "AWS Automation",
    description:
      "A collection of automation scripts for AWS infrastructure. Handles provisioning, scaling, monitoring, and teardown of cloud resources with minimal configuration.",
    date: "2025",
    link: "https://github.com/alexhamidi",
    tags: ["Python", "Infra"],
    badge: "/badges/aws.png",
  },
];

const books: Book3D[] = [
  {
    title: "Progress and Poverty",
    coverUrl:
      "https://www.gutenberg.org/cache/epub/55308/pg55308.cover.medium.jpg",
    spineColor: "#376246",
    date: "Jan 2026",
  },
  {
    title: "Poor Charlie's Almanack",
    coverUrl:
      "https://m.media-amazon.com/images/I/81vgkcr86iL._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#0E0C56",
    date: "Dec 2025",
  },
  {
    title: "The Interpretation of Financial Statements",
    coverUrl:
      "https://m.media-amazon.com/images/I/61q5ViYnY1L._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#BB7438",
    date: "Nov 2025",
  },
  {
    title: "Elon Musk",
    coverUrl:
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982181284/elon-musk-9781982181284_hr.jpg",
    spineColor: "#000",
    date: "Oct 2025",
  },
  {
    title: "Antifragile",
    coverUrl:
      "https://m.media-amazon.com/images/I/61cmwTmON3L._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#D35D2D",
    date: "Sep 2025",
  },
  {
    title: "The Lessons of History",
    coverUrl:
      "https://m.media-amazon.com/images/I/61hTpG9gLFL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
    spineColor: "#000",
    date: "Aug 2025",
  },
  {
    title: "Solaris",
    coverUrl:
      "https://m.media-amazon.com/images/I/51yQl6pPpeL._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#F15024",
    date: "Jul 2025",
  },
  {
    title: "Chip War",
    coverUrl:
      "https://m.media-amazon.com/images/I/71hMs9v7P6L._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#FFF",
    date: "Jun 2025",
  },
  {
    title: "The Goal",
    coverUrl:
      "https://m.media-amazon.com/images/I/81Kuc8tojoL._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#005578",
    date: "May 2025",
  },
  {
    title: "Immune",
    coverUrl:
      "https://m.media-amazon.com/images/I/91GTGsONnrL._AC_UF1000,1000_QL80_.jpg",
    spineColor: "#FFAB00",
    date: "Apr 2025",
  },
  {
    title: "Zero to One",
    coverUrl:
      "https://m.media-amazon.com/images/I/51zGCdRQXOL._AC_UF894,1000_QL80_.jpg",
    spineColor: "#5e7fa6",
    date: "Mar 2025",
  },
  {
    title: "The Three-Body Problem",
    coverUrl:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
    spineColor: "#365d9c",
    date: "Feb 2025",
  },
];

const thoughts = [
  {
    title: "headspace",
    date: "2025",
    excerpt:
      "Reflections on consciousness and mental clarity. How meditation and stillness reshape the way I approach problem-solving, and why the best ideas come when you stop looking for them.",
  },
  {
    title: "tools for thought",
    date: "2025",
    excerpt:
      "The software we use shapes the way we think. Notes on building interfaces that augment cognition rather than replace it, and what it means to design for understanding over convenience.",
  },
  {
    title: "on taste",
    date: "2025",
    excerpt:
      "Taste is the ability to say no. Why the best engineers, designers, and founders share an obsessive attention to detail, and how developing taste is the highest-leverage skill you can cultivate.",
  },
  {
    title: "compounding",
    date: "2025",
    excerpt:
      "Most people overestimate what they can do in a day and underestimate what they can do in a decade. Thoughts on patience, consistency, and why small bets placed repeatedly beat grand gestures every time.",
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
  "IMG_1417.jpg",
  "IMG_1419.jpg",
  "IMG_1528.jpg",
  "IMG_2688_2.jpg",
  "3898072146119326550_2.jpg",
].map((url) => `/photos/${url}`);

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
  {
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles. The credit belongs to the man who is actually in the arena.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "Show me the incentive and I will show you the outcome.",
    author: "Charlie Munger",
  },
  {
    text: "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
    author: "Peter Thiel",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Wind extinguishes a candle and energizes fire. Likewise with randomness, uncertainty, chaos: you want to use them, not hide from them.",
    author: "Nassim Taleb",
  },
];

export default function Home() {
  const mjUrls = getMjGalleryUrls();
  const musicBgs = getRandomMjUrls(3);

  return (
    <div className="w-full">
      {/* Hero */}
      <section id="start" className="max-w-4xl mx-auto px-8 md:px-16 pt-20">
        <h1
          className="text-lg font-bold tracking-tight text-black"
          style={{ fontFamily: "var(--font-serif), 'Lora', serif" }}
        >
          Alex Hamidi
        </h1>

        <p className="mt-4 text-base text-neutral-500 leading-relaxed">
          I build AI systems and previously founded a few companies. Most of my
          work focuses on making practical tools that solve real problems.
          Currently interested in world models and diffusion models.
        </p>
        <p className="mt-5 text-base text-neutral-500 leading-relaxed">
          I help run{" "}
          <a
            href="https://sdxucsd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors"
          >
            SDxUCSD
          </a>
          , a startup accelerator at UC San Diego, connecting founders and
          engineers.
        </p>
        <p className="mt-5 text-base text-neutral-500 leading-relaxed">
          Outside of code I make music, shoot film, and read too many books.
          Every experience is an opportunity to understand the world and myself
          better.
        </p>
        <p className="mt-5 text-base text-neutral-500 leading-relaxed">
          I did IPHo and ICPC (regional winner)
        </p>


      </section>

      {/* Content with sticky nav */}
      <div className="relative max-w-4xl mx-auto px-8 md:px-16">
        <div className="hidden lg:block fixed top-20 right-[calc(50%+28rem+3rem)]">
          <SectionNav
            books={books.map((b) => ({ title: b.title, date: b.date || "" }))}
          />
        </div>

        <div className="pb-24">
          <section id="work" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="work" />
            <ProjectModal projects={work} showDates fullWidth />
          </section>

          <section id="projects" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="projects" />
            <ProjectModal projects={projects} />
          </section>

          <section id="writing" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="writing" />
            <ProjectModal projects={thoughts.map(t => ({ title: t.title, description: t.excerpt, date: t.date, link: "", tags: [] }))} />
          </section>

          <section id="music" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="music" />
            <MusicCard
              tracks={[
                { src: "/music/new.mp3", title: "New", bg: musicBgs[0] },
                { src: "/music/what.wav", title: "What", bg: musicBgs[1] },
                { src: "/music/who.wav", title: "Who", bg: musicBgs[2] },
              ]}
            />
          </section>

          <section id="gallery" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="gallery" />
            <PhotoGrid urls={photos} />
          </section>

          <section id="reading" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="reading" />
            <BookGrid books={books} />
          </section>

          {/* <section id="quotes" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="quotes" />
            <QuoteGrid quotes={quotes} />
          </section> */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 md:px-16 mb-12 mt-192">
        <ContactForm />
      </div>

      {/* Mobile footer */}
      <footer className="lg:hidden max-w-4xl mx-auto border-t border-neutral-100 py-8 px-8 flex flex-wrap gap-6">
        <a
          href="https://twitter.com/ahamidi_"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          Twitter
        </a>
        <a
          href="https://github.com/alexhamidi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/alexander-hamidi-208736254/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://news.ycombinator.com/user?id=alexhamidi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          HN
        </a>
        <a
          href="https://open.spotify.com/user/alexhamidi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          Spotify
        </a>
        <a
          href="https://letterboxd.com/alexhamidi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          Letterboxd
        </a>
      </footer>
    </div>
  );
}
