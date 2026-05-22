import { useTheme } from "./ThemeContext";
import { useDomino } from './UseDomino'; 

function About() {
  const { dark } = useTheme();
  const ref = useDomino(1);

  return (
    <section ref={ref} className="pt-2 pb-10 md:pb-20 px-4 flex flex-col">
      <div className="flex flex-col w-full max-w-5xl mx-auto px-0 md:pl-10">
        <h2 className="text-xl font-bold mb-4">About</h2>
        <p className={`text-md leading-relaxed max-w-xl ${dark ? "text-gray-300" : "text-gray-600"}`}>
          Hi, I'm Francis — a passionate Web Developer based in Lapu-Lapu City, Cebu, Philippines. I love building clean, responsive, and user-friendly web applications using React and Laravel. From crafting smooth frontends to building solid backends, I enjoy turning ideas into real working products. I even built AI-powered features into my own portfolio — because why not? Always learning, always building.
        </p>
      </div>
    </section>
  );
}

export default About;