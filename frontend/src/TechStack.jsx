import { useTheme } from "./ThemeContext";

const techIcons = {
  React: "react",
  JavaScript: "javascript",
  TailwindCSS: "tailwindcss",
  PHP: "php",
  Laravel: "laravel",
  MySQL: "mysql",
  Git: "git",
};

const techColors = {
  React: "#61DAFB",
  JavaScript: "#F7DF1E",
  TailwindCSS: "#06B6D4",
  PHP: "#777BB4",
  Laravel: "#FF2D20",
  MySQL: "#4479A1",
  Git: "#F05032",
};

function TechIcon({ name }) {
  const slug = techIcons[name];
  const color = techColors[name];

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
      alt={name}
      width={16}
      height={16}
      style={{ display: "inline-block" }}
    />
  );
}

function TechStack() {
  const { dark } = useTheme();

  const frontend = ["React", "JavaScript", "TailwindCSS"];
  const backend = ["PHP", "Laravel", "MySQL", "Git"];

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Tech Stack</h2>

      {/* Frontend */}
      <div className="mb-4">
        <p className={`text-sm font-semibold mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>Frontend</p>
        <div className="flex flex-wrap gap-2">
          {frontend.map((tech) => (
            <span key={tech} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border
              ${dark ? "border-gray-600 text-gray-300" : "border-gray-400 text-gray-600"}`}>
              <TechIcon name={tech} />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Backend */}
      <div>
        <p className={`text-sm font-semibold mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>Backend</p>
        <div className="flex flex-wrap gap-2">
          {backend.map((tech) => (
            <span key={tech} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border
              ${dark ? "border-gray-600 text-gray-300" : "border-gray-400 text-gray-600"}`}>
              <TechIcon name={tech} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;