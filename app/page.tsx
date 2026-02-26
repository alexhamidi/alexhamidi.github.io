import SectionNav from "./components/SectionNav";
import SectionHeader from "./components/SectionHeader";
import ProjectSection from "./components/ProjectSection";
import MusicSection from "./components/MusicSection";
import BookGrid from "./components/BookGrid";
import PhotoGrid from "./components/PhotoGrid";
// import PostItWall from "./components/PostItWall";
import ScrollRestore from "./components/ScrollRestore";
import HeroButtons from "./components/HeroButtons";
import { getData } from "./utils/getData";
import { ProjectItem, MusicItem, BookItem } from "./utils/interfaces"


import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const MJ_GALLERY_COUNT = 20;

function getMjImageItems() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "public/midjourney/data.json"),
    "utf-8",
  );
  const blacklist = new Set(
    fs.readFileSync(path.join(process.cwd(), "public/midjourney/blacklist.txt"), "utf-8")
      .split("\n").map(l => l.trim()).filter(Boolean),
  );
  const mjData = JSON.parse(raw);
  return mjData.data.filter(
    (item: { id: string; event_type: string; rating?: Record<string, number> }) =>
      (item.event_type === "diffusion" || item.event_type === "variation") &&
      !(item.rating && item.rating["0"] === 1 && item.rating["1"] === 1 && item.rating["2"] === 1 && item.rating["3"] === 1) &&
      !blacklist.has(item.id),
  );
}

function getRandomMjUrls(count: number): string[] {
  const items = getMjImageItems();
  const shuffled = items.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((item: { id: string }) => {
    const variant = Math.floor(Math.random() * 4);
    return `https://cdn.midjourney.com/${item.id}/0_${variant}.webp`;
  });
}

function getMjGalleryUrls(): string[] {
  return getRandomMjUrls(MJ_GALLERY_COUNT);
}

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
  const mjUrls = getMjGalleryUrls();

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
  Engineer currently running{" "}
  <a
    href="https://sdxucsd.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors"
  >
    SDxUCSD
  </a>
  , building{" "}
  <a href="#projects" className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors">
    software
  </a>
  ,{" "}and making{" "}
  <a href="#music" className="text-black no-underline border-b border-neutral-300 hover:border-black transition-colors">
    music
  </a>
  .
</p>

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
</p>



<p className="mt-5 text-base text-neutral-600 leading-relaxed">
  I believe that the purpose behind everything we do should be as explicit as possible, and that creation is the primary purpose of humanity. 
</p>
<p className="mt-5 text-base text-neutral-600 leading-relaxed">
          I&apos;m excited about:
        </p>
        <ul className="mt-2 text-base text-neutral-600 leading-relaxed list-disc pl-5 space-y-1">
        <li>Improving web/coding agents through RL and scaffolding in order to obviate tedious knowledge work </li>
        <li>Neuroscience, neurotech and BCIs. They combine many of my biggest interests: computation, intelligence, consciousness, and philosophy.</li>
        <li>Latent diffusion models and how DiT scaling, classifier-free guidance, and noise scheduling (among other things) affect output aesthetics in practice.</li>

          </ul>
        <p className="mt-5 text-base text-neutral-600 leading-relaxed">
          In the past, I&apos;ve:
        </p>
        <ul className="mt-2 text-base text-neutral-600 leading-relaxed list-disc pl-5 space-y-1">
          <li>Founded and sold two small GovTech companies</li>
          <li>Won state-level college programming competitions</li>
          <li>Backpacked 100 miles in Afghanistan with distant relatives</li>
        </ul>
      <HeroButtons />


      </section>

      {/* Content with sticky nav */}
      <div className="relative max-w-4xl mx-auto px-8 md:px-16">
        <div className="hidden lg:block fixed top-20 right-[calc(50%+28rem+3rem)]">
          <SectionNav
            books={books.map((b) => ({ title: b.title, date: "" }))}
          />
        </div>

        <div className="pb-24">
          <section id="work" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="work" />
            <ProjectSection projects={work} showDates fullWidth static />
          </section>

          <section id="projects" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="projects" />
            <ProjectSection projects={projects} />
            <a
              href="/software"
              className="mt-4 inline-block text-[13px] text-neutral-400 no-underline border-b border-neutral-300 hover:border-black hover:text-black transition-colors"
            >
              see all software →
            </a>
          </section>

          <section id="writing" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="writing" />
            <ProjectSection projects={writing} />
          </section>

          <section id="music" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="music" />
            <MusicSection music={music} />
          </section>

          <section id="gallery" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="gallery" />
            {/* <PhotoGrid urls={photos} /> */}
            <PhotoGrid urls={[...photos]} />
          </section>

          <section id="reading" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="reading" />
            <BookGrid books={books} />
          </section>

          {/* <section id="wall" className="scroll-mt-8 mb-16 mt-10">
            <SectionHeader title="wall" />
            <PostItWall />
            <div className="mt-6">
              <ContactForm />
            </div>
          </section> */}
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
