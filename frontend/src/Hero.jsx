import { useState } from "react";
import { useTheme } from "./ThemeContext";
import { useDomino } from './UseDomino'; 
import { Mail, Github, MapPin, FileSearch, Download, X } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

function Hero() {
  const { dark, setDark } = useTheme();
  const ref = useDomino(0); 
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await emailjs.send(
        "service_uworvz6",
        "template_fnofht2",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "bonfrancisjhay@gmail.com",
        },
        "yy-PeWnE7WcPL5Hiu"
      );
      setStatus("sent");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = `w-full px-3 py-2 text-sm rounded-lg border outline-none transition
    ${dark
      ? "bg-neutral-900 border-neutral-600 text-white placeholder:text-neutral-500 focus:border-white"
      : "bg-white border-neutral-300 text-black placeholder:text-neutral-400 focus:border-black"}`;

  const btnClass = `border px-3 py-1.5 rounded transition flex items-center gap-2 text-sm
    ${dark
      ? "border-white hover:bg-white hover:text-black"
      : "border-black hover:bg-black hover:text-white"}`;

  return (
    <>
    <section ref={ref} className={`w-full ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="flex flex-col md:flex-row items-center md:items-center justify-start gap-6 md:gap-8 py-12 md:py-20 px-4 md:px-10 max-w-5xl mx-auto">

        {/* Profile Image */}
        <img
          src="/images/profile.png"
          alt="Francis Jhay Bon"
          className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full md:rounded-none flex-shrink-0"
        />

        {/* Info */}
        <div className="flex flex-col items-center md:items-start w-full">

          {/* Name + Toggle */}
          <div className="flex flex-row items-center justify-center md:justify-between w-full max-w-sm md:max-w-[600px] gap-4">
            <h1 className="text-xl md:text-2xl font-bold">Francis Jhay Bon</h1>
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
            Lapu-Lapu City, Cebu, Philippines
          </p>

          {/* Title */}
          <p className="text-lg mt-1">Web Developer</p>

          {/* Buttons */}
          <div className="flex gap-3 mt-3 flex-wrap justify-center md:justify-start">

            {/* Send Email — triggers modal */}
            <button onClick={() => setOpen(true)} className={btnClass}>
              <Mail size={16} />
              Send Email
            </button>

            <a href="https://github.com/bonfrancisjhay" className={btnClass}>
              <Github size={16} />
              GitHub
            </a>

            <Link to="/resume-analyzer" className={btnClass}>
              <FileSearch size={16} />
              Resume Analyzer
            </Link>

            
             <a href="/images/francisjhaybon-cv.pdf"
              download="FRANCIS_JHAY_BON_CV.pdf"
              className={btnClass}
            >
              <Download size={16} />
              Download CV
            </a>
           </div> {/* end buttons */}
        </div> {/* end info */}
      </div> {/* end flex row */}
    </section>
    {/* Email Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className={`w-full max-w-md rounded-xl p-6 border
            ${dark ? "bg-neutral-900 border-neutral-700 text-white" : "bg-white border-neutral-200 text-black"}`}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold">Send me a message</h2>
              <button
                onClick={() => setOpen(false)}
                className={`p-1 rounded transition ${dark ? "hover:bg-neutral-700" : "hover:bg-neutral-100"}`}
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className={`text-xs mb-1 block ${dark ? "text-neutral-400" : "text-neutral-500"}`}>Your name</label>
                <input
                  type="text"
                  placeholder="Francis Jhay Bon"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`text-xs mb-1 block ${dark ? "text-neutral-400" : "text-neutral-500"}`}>Your email</label>
                <input
                  type="email"
                  placeholder="bonfrancisjhay@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={`text-xs mb-1 block ${dark ? "text-neutral-400" : "text-neutral-500"}`}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Hi, I'd love to chat about..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "sending" || status === "sent"}
                className={`mt-1 w-full py-2 text-sm font-medium rounded-lg border transition
                  ${status === "sent"
                    ? "border-green-500 text-green-500"
                    : dark
                      ? "border-white hover:bg-white hover:text-black disabled:opacity-40"
                      : "border-black hover:bg-black hover:text-white disabled:opacity-40"}`}
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send message"}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

export default Hero;