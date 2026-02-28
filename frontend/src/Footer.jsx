import { useTheme } from "./ThemeContext";
import { Mail, Github, MapPin } from "lucide-react";

function Footer() {
  const { dark } = useTheme();

  return (
    <footer className={`w-full border-t ${dark ? "bg-black text-white border-gray-800" : "bg-white text-black border-gray-200"}`}>

      {/* Bottom bar */}
      <div className={`text-center text-xs py-5 border-t
        ${dark ? "border-gray-800 text-gray-600" : "border-gray-200 text-gray-400"}`}>
        © {new Date().getFullYear()} Francis Jhay Bon. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;