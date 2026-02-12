import { parseMainItems, selectItems, assignSizes } from './lib/parseMainItems';
import MainGrid from './components/MainGrid';

export const dynamic = 'force-dynamic';

export default function Home() {
  const allItems = parseMainItems();
  const selected = selectItems(allItems, 20);
  const sized = assignSizes(selected);

  return (
    <article>
      <h1
        className="mb-8 text-4xl md:text-6xl font-bold"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Hello, I&apos;m Alex.
      </h1>
      <p className="text-lg mt-6">
        <strong>I make AI stuff and previously founded a few companies</strong>
      </p>
      <p className="italic text-gray-400">
        Projects. are f,
        I started making software. 
        Check out my github for 
        Currently, I'm interested in World Models and Diffusion Models.
        Most of my work focuses on building practical AI systems that solve real problems. My{" "}
        <a href="/projects">projects</a> show what I&apos;ve shipped, and my{" "}
        <a href="/objectives">objectives</a> explain the broader vision I&apos;m working toward.
      </p>

      <p className="text-lg mt-6">
        <strong>I connect founders and engineers at UCSD</strong>
      </p>
      <p className="italic text-gray-400 mb-6">
        I work with _ and _ (and our _) to organize SDxUCSD, a startup accelerator at UCSD.
        Building communities is about creating spaces where ambitious people can find each other and collaborate. You can see the work I&apos;ve done in{" "}
        <a href="/projects">projects</a> and learn more about what drives me in{" "}
        <a href="/life">life</a>.
      </p>

      <p className="text-lg mt-6">
        <strong>I create films and music</strong>
      </p>
      <p className="italic text-gray-400">
        Creative work is how I process ideas and emotions that can&apos;t be captured in code or writing. My{" "}
        <a href="/music">music</a> spans various moods and experiments, while{" "}
        <a href="/stimulus">stimulus</a> collects the visual and auditory works that inspire me.
      </p>

      <p className="text-lg mt-6">
        <strong>I learn through reading, writing, and conversation</strong>
      </p>
      <p className="italic text-gray-400">
        Understanding the world requires engaging with ideas deeply and from multiple angles. My{" "}
        <a href="/books">books</a> capture stories and analysis,{" "}
        <a href="/thoughts">thoughts</a> document my evolving perspective, and{" "}
        <a href="/politics">politics</a> explores how society organizes itself.
      </p>

      <div className="mt-10">
        <MainGrid items={sized} />
      </div>
    </article>
  );
}
