import fs from "fs";
import path from "path";
import SectionNav from "./components/SectionNav";
import SectionHeader from "./components/SectionHeader";
import ProjectSection from "./components/ProjectSection";
import WritingList from "./components/WritingList";
import MusicSection from "./components/MusicSection";
import BookGrid from "./components/BookGrid";
import GallerySection from "./components/GallerySection";
import PostItWall from "./components/PostItWall";
import ContactForm from "./components/ContactForm";
import ScrollRestore from "./components/ScrollRestore";
import HeroButtons from "./components/HeroButtons";
import CopyEmail from "./components/CopyEmail";
import { getData } from "./utils/getData";
import { ProjectItem, MusicItem, BookItem } from "./utils/interfaces"


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


export default async function Home() {
  const work = await getData<ProjectItem>("work");
  const projects = await getData<ProjectItem>("projects");
  const writing = await getData<ProjectItem>("writing");
  const music = await getData<MusicItem>("music");
  const books = await getData<BookItem>("books");
  const blogPosts = [
    ...writing,
    ...projects.filter((p) => p.blog),
  ];
  let wikipediaUrls: string[] = [];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "data", "wikipics.json"), "utf-8");
    const all = JSON.parse(raw) as string[];
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    wikipediaUrls = shuffled.slice(0, photos.length);
  } catch {
    // no wikipics
  }

  return (
    <div className="w-full">
      <ScrollRestore />
      {/* Hero */}
      <section id="start" className="max-w-4xl mx-auto px-8 md:px-16 pt-20">
        <h1
          className="text-lg font-bold tracking-tight text-black"
          style={{ fontFamily: "var(--font-serif), 'Lora', serif" }}
        >
          Alex Hamidi
        </h1>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        I’m a software engineer studying CS at UCSD. Previously I worked on 7TB search infrastructure at Clado and automations at Amazon. This is my blog where I post about things I’m interested in, mostly related to tech and llms
        </p>

{/*
<p className="mt-5 text-base text-neutral-600 leading-relaxed">
  I try to reason{" "}
  <a
    href="https://x.com/haseab_/status/1823225734795817073"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors"
  >
    deductively
  </a>
  {" "}whenever possible and enjoy the company of passionate people.
</p> */}



{/* <p className="mt-5 text-base text-neutral-600 leading-relaxed">
  I believe that the purpose behind everything we do should be as explicit as possible, and that creation is the primary purpose of humanity.
</p> */}
<p className="mt-5 text-base text-neutral-600 leading-relaxed">
          I&apos;m excited about:
        </p>
        <ul className="mt-2 text-base text-neutral-600 leading-relaxed list-disc pl-5 space-y-1">
        <li>Improving coding agents through RL and scaffolding in order to obviate tedious knowledge work </li>
        <li>Using LLMs to build search and retrieval systems that operate on internet scale</li>

          </ul>
          <p className="mt-5 text-base text-neutral-600 leading-relaxed">
          <CopyEmail />
        </p>
      <HeroButtons />

      {/* I’m a software engineer living in San Francisco. Previously I was at South Park Commons and Figma, and graduated from UC Berkeley in 2019. This is my blog where I post about things I’m interested in, mostly tech-related. */}
      </section>

      {/* Content with sticky nav */}
      <div className="relative max-w-4xl mx-auto px-8 md:px-16">
        <div className="hidden lg:block fixed top-20 right-[calc(50%+28rem+3rem)]">
          <SectionNav
            books={books.map((b) => ({ title: b.title, date: "" }))}
          />
        </div>

        <div className="pb-24">
          {/* <section id="work" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="work" />
            <ProjectSection projects={work} showDates fullWidth static />
          </section> */}

          <section id="posts" className="scroll-mt-8 mb-16 mt-4">
            <SectionHeader title="posts" />
            <WritingList posts={blogPosts} />
            <a
              href="https://github.com/alexhamidi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[13px] text-neutral-400 no-underline border-b border-neutral-300 hover:border-black hover:text-black transition-colors"
            >
              view more projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </section>

          {/* <section id="projects" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="projects" />
            <ProjectSection projects={projects} />
            <a
              href="/software"
              className="mt-4 inline-block text-[13px] text-neutral-400 no-underline border-b border-neutral-300 hover:border-black hover:text-black transition-colors"
            >
              see all software →
            </a>
          </section> */}

          {/* <section id="music" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="music" />
            <MusicSection music={music} />
          </section> */}

          <section id="gallery" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="gallery" />
            <GallerySection photoUrls={[...photos]} wikipediaUrls={wikipediaUrls} />
          </section>

          <section id="reading" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="reading" />
            <BookGrid books={books} />
          </section>

          <section id="ideas" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="ideas" />
            <PostItWall />
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </div>
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
        <a
          href="https://www.midjourney.com/@ahamidi?tab=archive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-neutral-400 no-underline hover:text-black transition-colors"
        >
          Midjourney
        </a>
      </footer>
    </div>
  );
}
