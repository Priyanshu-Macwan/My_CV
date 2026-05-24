import { useEffect } from 'react'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Skills   from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

export default function App() {
  useEffect(() => {
    const bgLayers = {
      hero:     document.getElementById('bg-hero'),
      about:    document.getElementById('bg-about'),
      skills:   document.getElementById('bg-skills'),
      projects: document.getElementById('bg-projects'),
      timeline: document.getElementById('bg-timeline'),
      contact:  document.getElementById('bg-contact'),
    };

    const sections = ['hero', 'about', 'skills', 'projects', 'timeline', 'contact'];
    let lastSection = 'hero';

    function getActiveSection() {
      const wh = window.innerHeight;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= wh * 0.45) return sections[i];
      }
      return 'hero';
    }

    function updateBg() {
      const active = getActiveSection();
      if (active === lastSection) return;
      lastSection = active;

      Object.values(bgLayers).forEach(l => {
        if (l) l.classList.remove('active');
      });
      if (bgLayers[active]) bgLayers[active].classList.add('active');
    }

    window.addEventListener('scroll', updateBg, { passive: true });
    updateBg();

    return () => window.removeEventListener('scroll', updateBg);
  }, []);

  return (
    <>
      <div id="scroll-bg">
        <div className="bg-layer active" id="bg-hero"     style={{ background: `radial-gradient(ellipse 60% 80% at 75% -10%, rgba(30,80,160,0.6) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(15,30,80,0.5) 0%, transparent 50%), #080e1a` }}></div>
        <div className="bg-layer"        id="bg-about"    style={{ background: `radial-gradient(ellipse 70% 60% at -10% 110%, rgba(100,40,180,0.5) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 90% 10%, rgba(30,15,80,0.4) 0%, transparent 50%), #0a0814` }}></div>
        <div className="bg-layer"        id="bg-skills"   style={{ background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6,100,120,0.55) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 100% 80%, rgba(6,60,80,0.35) 0%, transparent 50%), #060e10` }}></div>
        <div className="bg-layer"        id="bg-projects" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, rgba(30,20,100,0.6) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 90% 20%, rgba(59,40,140,0.3) 0%, transparent 50%), #07060f` }}></div>
        <div className="bg-layer"        id="bg-timeline" style={{ background: `radial-gradient(ellipse 60% 80% at 110% 50%, rgba(100,20,80,0.45) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 0% 30%, rgba(30,10,60,0.4) 0%, transparent 50%), #0a060c` }}></div>
        <div className="bg-layer"        id="bg-contact"  style={{ background: `radial-gradient(ellipse 80% 80% at 50% 100%, rgba(20,60,180,0.55) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 80% 0%, rgba(40,20,100,0.35) 0%, transparent 50%), #060810` }}></div>
      </div>
      <div id="scroll-grid"></div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
