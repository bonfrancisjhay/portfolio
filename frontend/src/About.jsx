import { useTheme } from "./ThemeContext";

function About() {
  const { dark } = useTheme();

  return (
    <section className={`pt-2 pb-20 px-4 flex flex-col ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
    <div className="flex flex-col w-full max-w-5xl mx-auto pl-10">
      <h2 className="text-xl font-bold mb-4">About</h2>
      <p className={`text-md leading-relaxed max-w-xl ${dark ? "text-gray-300" : "text-gray-600"}`}>
        Hi, I'm Francis — a passionate Web Developer based in Lapu-Lapu City, Philippines.
        I love building clean, responsive, and user-friendly web applications.
        Always learning, always building.
      </p>
      </div>
    </section>
  );
}

export default About;