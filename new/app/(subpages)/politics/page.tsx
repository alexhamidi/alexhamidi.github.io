export default function Politics() {
  const posts = [
    {
      title: "Coming soon",
      date: "",
      link: "#",
      excerpt: "Political thoughts and analysis.",
    },
  ];

  return (
    <article>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <a
            key={post.title}
            href={post.link}
            className="block no-underline"
          >
            <h2 className="text-xl font-semibold mb-2 text-black transition-colors duration-200 hover:text-blue-600">
              {post.title}
            </h2>
            <p className="text-base text-gray-700 mb-1 leading-relaxed">
              {post.excerpt}
            </p>
            {post.date && (
              <p className="text-sm text-gray-500">
                {post.date}
              </p>
            )}
          </a>
        ))}
      </div>
    </article>
  );
}
