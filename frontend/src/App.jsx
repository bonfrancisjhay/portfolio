import { ThemeProvider, useTheme } from './ThemeContext';
import './index.css'
import Hero from './Hero';
import About from './About';
import TechStack from './TechStack';
import Projects from './Projects';
import Experience from './Experience';
import Certificate from './Certificate';
import Gallery from './Gallery';
import Footer from './Footer';
import Chat from './Chat';


function AppContent() {
  const { dark } = useTheme();

  return (
    <div className={`w-full min-h-screen ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Hero />
      <About />

      {/* Grid: TechStack+Projects LEFT, Experience RIGHT */}
      <div className="max-w-5xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
        
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <TechStack />
          <Projects />
        </div>

        {/* RIGHT */}
        <Experience />

      </div>
        <Certificate />
        <Gallery />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Footer />
      <Chat />
    </ThemeProvider>
  );
}

export default App;