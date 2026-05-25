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

      const idx = sections.indexOf(active);
      const label = document.getElementById('astro-label');
      if (label) {
        const labelNames = ['Hero','About','Skills','Projects','Journey','Contact'];
        label.textContent = '📍 ' + labelNames[idx];
        label.classList.add('show');
        clearTimeout(window._labelTimer);
        window._labelTimer = setTimeout(() => label.classList.remove('show'), 2000);
      }
    }

    function updateScrollTraveller() {
      const traveller = document.getElementById('scroll-traveller');
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      
      if (traveller) {
        const minTop = window.innerHeight * 0.15;
        const maxTop = window.innerHeight * 0.85;
        const topPos = minTop + scrollPercent * (maxTop - minTop);
        traveller.style.transform = `translateY(${topPos}px)`;
      }

      // Background atmosphere parallax
      const atmospheres = document.querySelectorAll('.bg-layer-atmosphere');
      atmospheres.forEach(el => {
        el.style.transform = `translateY(${scrollPercent * 10}%)`; // drifts down
      });

      // Grid parallax
      const grid = document.getElementById('scroll-grid');
      if (grid) {
        grid.style.transform = `translateY(-${scrollPercent * 5}%)`; // drifts up slightly
      }
    }

    window.addEventListener('scroll', updateBg, { passive: true });
    window.addEventListener('scroll', updateScrollTraveller, { passive: true });
    updateBg();
    updateScrollTraveller();

    return () => window.removeEventListener('scroll', updateBg);
  }, []);

  return (
    <>
      <div id="scroll-bg">
        {/* HERO BACKGROUND */}
        <div className="bg-layer active" id="bg-hero">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-hero.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 800px at 70% 30%, rgba(59,130,246,0.15) 0%, transparent 80%), radial-gradient(circle 600px at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
          <div className="glowing-blob blue" style={{ width: '450px', height: '450px', top: '10%', right: '15%' }} />
          <div className="glowing-blob purple" style={{ width: '380px', height: '380px', bottom: '10%', left: '5%' }} />
        </div>

        {/* ABOUT BACKGROUND */}
        <div className="bg-layer" id="bg-about">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-about.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 900px at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 75%), radial-gradient(circle 500px at 20% 70%, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', top: '5%', right: '10%' }} />
          <div className="glowing-blob cyan" style={{ width: '350px', height: '350px', bottom: '20%', left: '10%' }} />
        </div>

        {/* SKILLS BACKGROUND */}
        <div className="bg-layer" id="bg-skills">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-skills.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 850px at 20% 80%, rgba(6,182,212,0.15) 0%, transparent 70%), radial-gradient(circle 600px at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />
          <div className="glowing-blob cyan" style={{ width: '500px', height: '500px', bottom: '5%', left: '10%' }} />
          <div className="glowing-blob blue" style={{ width: '350px', height: '350px', top: '15%', right: '15%' }} />
        </div>

        {/* PROJECTS BACKGROUND */}
        <div className="bg-layer" id="bg-projects">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-projects.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 1000px at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 80%), radial-gradient(circle 700px at 10% 30%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', top: '35%', left: '35%' }} />
          <div className="glowing-blob blue" style={{ width: '380px', height: '380px', bottom: '20%', right: '20%' }} />
        </div>

        {/* TIMELINE BACKGROUND */}
        <div className="bg-layer" id="bg-timeline">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-timeline.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 800px at 10% 20%, rgba(217,70,239,0.12) 0%, transparent 70%), radial-gradient(circle 600px at 90% 80%, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', top: '15%', left: '10%' }} />
          <div className="glowing-blob cyan" style={{ width: '380px', height: '380px', bottom: '15%', right: '10%' }} />
        </div>

        {/* CONTACT BACKGROUND */}
        <div className="bg-layer" id="bg-contact">
          <div className="bg-layer-image" style={{ backgroundImage: 'url(/images/bg-contact.png)' }} />
          <div className="bg-layer-atmosphere" style={{ background: 'radial-gradient(circle 900px at 50% 100%, rgba(59,130,246,0.2) 0%, transparent 75%), radial-gradient(circle 600px at 50% 30%, rgba(139,92,246,0.05) 0%, transparent 60%)' }} />
          <div className="glowing-blob blue" style={{ width: '500px', height: '500px', bottom: '5%', left: '30%' }} />
          <div className="glowing-blob purple" style={{ width: '450px', height: '450px', bottom: '20%', right: '15%' }} />
        </div>
      </div>
      <div id="scroll-grid"></div>
      <div id="noise-overlay"></div>

      <div className="relative z-10">
        <Navbar />
        
        <div id="scroll-traveller">
          <svg id="astronaut-svg" width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            {/* Jetpack */}
            <rect x="16" y="32" width="32" height="20" rx="4" fill="#0f172a" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
            <path d="M 22 52 L 22 56 M 42 52 L 42 56" stroke="rgba(139,92,246,0.8)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 20 58 Q 22 62 24 58 M 40 58 Q 42 62 44 58" fill="none" stroke="#06B6D4" strokeWidth="1.5"/>

            {/* Helmet */}
            <ellipse cx="32" cy="22" rx="14" ry="15" fill="#1e293b" stroke="rgba(59,130,246,0.8)" strokeWidth="1.5"/>
            {/* Visor */}
            <ellipse cx="32" cy="21" rx="9" ry="8" fill="rgba(59,130,246,0.15)" stroke="rgba(6,182,212,0.6)" strokeWidth="1"/>
            {/* Visor reflection */}
            <ellipse cx="28" cy="18" rx="3" ry="2" fill="rgba(255,255,255,0.12)" transform="rotate(-20,28,18)"/>
            
            {/* Body suit */}
            <rect x="20" y="35" width="24" height="18" rx="8" fill="#1e293b" stroke="rgba(59,130,246,0.5)" strokeWidth="1.2"/>
            {/* Chest panel */}
            <rect x="26" y="39" width="12" height="8" rx="3" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.8"/>
            {/* Panel dots */}
            <circle cx="29" cy="42" r="1.2" fill="#3B82F6" opacity="0.9"/>
            <circle cx="32" cy="42" r="1.2" fill="#8B5CF6" opacity="0.9"/>
            <circle cx="35" cy="42" r="1.2" fill="#06B6D4" opacity="0.9"/>
            
            {/* Left arm */}
            <rect x="10" y="37" width="10" height="6" rx="3" fill="#1e293b" stroke="rgba(59,130,246,0.4)" strokeWidth="1" transform="rotate(-15,10,37)"/>
            {/* Right arm */}
            <rect x="44" y="37" width="10" height="6" rx="3" fill="#1e293b" stroke="rgba(59,130,246,0.4)" strokeWidth="1" transform="rotate(15,54,37)"/>
            
            {/* Left leg */}
            <rect x="22" y="51" width="8" height="10" rx="3" fill="#1e293b" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
            {/* Right leg */}
            <rect x="34" y="51" width="8" height="10" rx="3" fill="#1e293b" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
          </svg>
          <div id="astro-label"></div>
        </div>

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
