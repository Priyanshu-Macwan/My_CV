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
        {/* HERO BACKGROUND */}
        <div className="bg-layer active" id="bg-hero">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-hero.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(ellipse 65% 80% at 75% -10%, rgba(59,130,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 15% 85%, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />
          <div className="glowing-blob blue" style={{ width: '450px', height: '450px', top: '-10%', left: '55%' }} />
          <div className="glowing-blob purple" style={{ width: '380px', height: '380px', bottom: '10%', left: '-10%' }} />
        </div>

        {/* ABOUT BACKGROUND */}
        <div className="bg-layer" id="bg-about">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-about.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(ellipse 75% 60% at -10% 110%, rgba(139,92,246,0.08) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 90% 10%, rgba(59,130,246,0.18) 0%, transparent 65%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', bottom: '-10%', left: '-10%' }} />
          <div className="glowing-blob cyan" style={{ width: '350px', height: '350px', top: '10%', right: '5%' }} />
        </div>

        {/* SKILLS BACKGROUND */}
        <div className="bg-layer" id="bg-skills">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-skills.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(ellipse 85% 55% at 50% -20%, rgba(6,182,212,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 100% 80%, rgba(59,130,246,0.18) 0%, transparent 60%)' }} />
          <div className="glowing-blob cyan" style={{ width: '500px', height: '500px', top: '-25%', left: '20%' }} />
          <div className="glowing-blob blue" style={{ width: '350px', height: '350px', bottom: '10%', right: '-10%' }} />
        </div>

        {/* PROJECTS BACKGROUND */}
        <div className="bg-layer" id="bg-projects">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-projects.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(ellipse 75% 75% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%), radial-gradient(ellipse 55% 35% at 90% 20%, rgba(59,130,246,0.18) 0%, transparent 60%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', top: '15%', left: '25%' }} />
          <div className="glowing-blob blue" style={{ width: '380px', height: '380px', top: '-10%', right: '-5%' }} />
        </div>

        {/* TIMELINE BACKGROUND */}
        <div className="bg-layer" id="bg-timeline">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-timeline.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(ellipse 65% 85% at 110% 50%, rgba(139,92,246,0.08) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 0% 30%, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', top: '25%', right: '-10%' }} />
          <div className="glowing-blob cyan" style={{ width: '380px', height: '380px', bottom: '10%', left: '-10%' }} />
        </div>

        {/* CONTACT BACKGROUND */}
        <div className="bg-layer" id="bg-contact">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-contact.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)' }} />
          <div className="glowing-blob blue" style={{ width: '500px', height: '500px', top: '25%', left: '25%' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', bottom: '20%', right: '20%' }} />
        </div>
      </div>
      <div id="scroll-grid"></div>
      <div id="noise-overlay"></div>

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
