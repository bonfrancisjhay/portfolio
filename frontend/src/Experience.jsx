import { useTheme } from "./ThemeContext";

function Experience() {
  const { dark } = useTheme();

  const experiences = [
    { role: "Quality Assurance", company: "TinkerPro Technologies Inc.", year: "2026" },
    { role: "BS Industrial Technology", company: "Lapu-Lapu City College", year: "2026" },
    { role: "Hello World!", company: "Wrote my first line of code", year: "2023" },
  ];

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      <div className="flex flex-col gap-4">
        {experiences.map((e) => (
          <div key={e.role} className={`border-l-2 pl-4
            ${dark ? "border-gray-600" : "border-gray-300"}`}>
            <h3 className="font-semibold">{e.role}</h3>
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{e.company}</p>
            <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{e.year}</p>
            {e.desc && (
              <p className={`text-sm mt-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>{e.desc}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;