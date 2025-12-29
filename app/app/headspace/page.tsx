import Link from "next/link";

export default function HeadspacePage() {
  return (
    <div className="flex flex-col items-center text-gray-900 font-mono overflow-x-hidden">
      <div className="flex flex-col gap-8 max-w-[700px] px-5 mb-12">
        <div className="flex items-center justify-between mt-8 mb-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 underline">
            ← back to home
          </Link>
          <div className="text-xs text-gray-500">September 2025</div>
        </div>

        <article className="text-sm">
          <h1 className="text-3xl font-bold mb-6">headspace</h1>

          <p className="mb-4 leading-relaxed">
            Having the correct mindset is one of the most amazing tools we have access to. Let me explain.
          </p>

          <p className="mb-4 leading-relaxed">
            Let&apos;s say I believe that I&apos;ve learned everything that I can at UCSD.
          </p>

          <p className="mb-4 leading-relaxed">
            Every day I wake up with the mindset that my time is wasted, that I could accomplish so much more if I could slug through these required classes any faster. What could I possibly have to learn from professors who aren&apos;t qualified, my peers who don&apos;t understand what I know, from organizations that have nothing to offer? And guess what? Every night, I go to sleep with my assumption confirmed.
          </p>

          <p className="mb-4 leading-relaxed">
            Not only is my brain wired to seek evidence that supports my claims, every situation I&apos;m in is viewed through the lens that an opportunity to learn simply doesn&apos;t exist. So, what does this mean?
          </p>

          <p className="mb-4 leading-relaxed font-semibold">
            If you believe you have nothing to learn, you have nothing to learn.
          </p>

          <p className="mb-4 leading-relaxed">
            It&apos;s an incredible self-fulfilling prophecy.
          </p>

          <p className="mb-4 leading-relaxed">
            By believing that you know the most about some &quot;subject A&quot;, you have prevented yourself from every learning more. You&apos;ve limited yourself and will never know more. Even if someone comes along who is smarter that challenges your assumption, you will be quick to dismiss their logic as unfounded.
          </p>

          <p className="mb-4 leading-relaxed">
            How can we prevent this from happening? It happens to the best of us – the more we know about a subject, the easier it is to fall into this trap.
          </p>

          <p className="mb-4 leading-relaxed">
            It&apos;s essential to stay focused on this truth at all times. Wake up with the mindset that you have so much yet to learn, listen to your peers, and challenge your own assumptions.
          </p>

          <p className="mb-4 leading-relaxed font-semibold">
            Simply believing that you have something left to learn will allow you to learn more.
          </p>
        </article>

        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Written by <Link href="/" className="underline hover:text-gray-900">Alex Hamidi</Link>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="https://twitter.com/ahamidi_" className="text-gray-600 hover:text-gray-900 underline">Twitter</a>
            <a href="https://github.com/alexhamidi/" className="text-gray-600 hover:text-gray-900 underline">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

