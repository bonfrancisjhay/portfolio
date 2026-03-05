import { useTheme } from "./ThemeContext";
import { Mail, Github, MapPin } from "lucide-react";

function Hero() {
  const { dark, setDark } = useTheme();

  return (
    <section className={`w-full ${dark ? "bg-black text-white" : "bg-white text-black"}`}>

      <div className="flex flex-col md:flex-row items-center md:items-center justify-start gap-6 md:gap-8 py-12 md:py-20 px-4 md:px-10 max-w-5xl mx-auto">
        
        {/* Profile Image */}
        <img
          src="/images/profile1.jpg"
          alt="Francis Jhay Bon"
          className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full md:rounded-none flex-shrink-0"
        />

        {/* Info */}
        <div className="flex flex-col items-center md:items-start w-full">

        {/* Name + Toggle */}
        <div className="flex flex-row items-center justify-center md:justify-between w-full max-w-sm md:max-w-[600px] gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Francis Jhay Bon</h1>

            {/* Toggle button */}
            <button
              onClick={() => setDark(!dark)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300
                ${dark ? "bg-gray-700" : "bg-yellow-200"}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full flex items-center justify-center
                  text-xs transition-all duration-300
                  ${dark ? "left-1 bg-gray-900" : "left-8 bg-yellow-400"}`}
              >
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>

          {/* Location */}
          <p className={`mt-2 flex items-center gap-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            <MapPin size={16} />
            Lapu-Lapu City, Philippines
          </p>

          {/* Title */}
          <p className="text-lg mt-1">Web Developer</p>

          {/* Buttons */}
          <div className="flex gap-3 mt-3 flex-wrap justify-center md:justify-start">
            <a
              href="mailto:bonfrancisjhay@gmail.com"
              className={`border px-3 py-1.5 rounded transition flex items-center gap-2 text-sm
                ${dark
                  ? "border-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-black hover:text-white"}`}
            >
              <Mail size={16} />
              Send Email
            </a>
            <a
              href="https://github.com/bonfrancisjhay"
              className={`border px-3 py-1.5 rounded transition flex items-center gap-2 text-sm
                ${dark
                  ? "border-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-black hover:text-white"}`}
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;