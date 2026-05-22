import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import { useDomino } from './UseDomino'; 


function Projects() {
  const { dark } = useTheme();
  const ref = useDomino(3); 


  const projects = [
    { title: "HomeSeek", desc: "Web-based Platform to Find Your Ideal Boarding House.", link: "/maintenance" },
    // { title: "HomeSeek V2", desc: "Web-based Platform to Find Your Ideal Boarding House.", link: "#" },
  ];

  return (
    <div ref={ref} className="w-full">
      <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div key={p.title} className={`p-3 rounded-lg border
            ${dark ? "border-gray-700" : "border-gray-300"}`}>
            <h3 className="font-semibold">{p.title}</h3>
            <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{p.desc}</p>
            <Link
              to={p.link}
              className="text-sm text-blue-400 mt-1 inline-block"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;