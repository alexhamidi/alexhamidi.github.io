export default function Projects() {
  const projects = [
    {
      title: "Umari",
      description: "The fastest web agent in the world",
      date: "October 2025",
      link: "/web",
    },
    {
      title: "Clado",
      description: "Creating a new query language for people search",
      date: "August 2025",
      link: "/clado",
    },
    {
      title: "Monotool",
      description: "Tool to manage MCP servers",
      date: "December 2025",
      link: "https://monotool.vercel.app",
    },
    {
      title: "AutoMCP",
      description: "Deploy MCP servers easily",
      date: "November 2025",
      link: "https://automcp.app",
    },
  ];

  return (
    <article>
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="block no-underline"
          >
            <h2 className="text-xl font-semibold mb-2 text-black transition-colors duration-200 hover:text-blue-600">
              {project.title}
            </h2>
            <p className="text-base text-gray-700 mb-1 leading-relaxed">
              {project.description}
            </p>
            <p className="text-sm text-gray-500">
              {project.date}
            </p>
          </a>
        ))}
      </div>
    </article>
  );
}
