import { useTheme } from "./ThemeContext";
import { Mail, Github, MapPin, Code } from "lucide-react";

function Hero() {
  const { dark, setDark } = useTheme();

  return (
    // swap bg/text colors based on dark
    <section className={`w-full ${dark ? "bg-black text-white" : "bg-white text-black"}`}>

<div className="flex flex-row items-center justify-start gap-8 py-20 px-10 max-w-5xl mx-auto">
      <img src="/images/profile1.jpg" alt="Francis Jhay Bon"
        className="w-40 h-40 object-cover" />

      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center justify-between" style={{width: "600px"}}>
        <h1 className="text-2xl font-bold">Francis Jhay Bon</h1>

        {/* Toggle button */}
        <button
          onClick={() => setDark(!dark)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300
          ${dark ? "bg-gray-700" : "bg-yellow-200"}`}
        >
          <span
          className={`absolute top-1 w-5 h-5 rounded-full flex items-center justify-center
            text-xs transition-all duration-300
            ${dark
              ? "left-1 bg-gray-900"       // moon side
              : "left-8 bg-yellow-400"}`}  // sun side
        >
          {dark ? "🌙" : "☀️"}
        </span>
        </button>
        </div>

        <p className={`mt-2 flex items-center gap-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
          <MapPin size={18}/>
          Lapu-Lapu City, Philippines
        </p>
        <p className="text-lg mt-1">
          Web Developer
          </p>
        <div className="flex gap-4 mt-2">
          <a href="mailto:bonfrancisjhay@gmail.com"
            className={`border px-2 py-1 rounded transition flex items-center gap-2
              ${dark
                ? "border-white hover:bg-white hover:text-black"
                : "border-black hover:bg-black hover:text-white"}`}>
            <Mail size={18}/>
            Send Email
          </a>
          <a href="https://github.com/bonfrancisjhay"
            className={`border px-2 py-1 rounded transition flex items-center gap-2
              ${dark
                ? "border-white hover:bg-white hover:text-black"
                : "border-black hover:bg-black hover:text-white"}`}>
            <Github size={18}/>
            GitHub
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Hero;