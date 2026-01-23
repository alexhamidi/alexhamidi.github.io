export default function Thoughts() {
  const thoughts = [
    {
      title: "headspace",
      date: "September 2025",
      link: "/headspace",
      excerpt: "Reflections on consciousness and mental clarity.",
    },
  ];

  return (
    <article>
      <div className="flex flex-col gap-8">
        {thoughts.map((thought) => (
          <a
            key={thought.title}
            href={thought.link}
            className="block no-underline"
          >
            <h2 className="text-xl font-semibold mb-2 text-black transition-colors duration-200 hover:text-blue-600">
              {thought.title}
            </h2>
            <p className="text-base text-gray-700 mb-1 leading-relaxed">
              {thought.excerpt}
            </p>
            <p className="text-sm text-gray-500">
              {thought.date}
            </p>
          </a>
        ))}
      </div>
    </article>
  );
}
