import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { PERSONAL, ORBIT_PILLS } from '../constants/data'

/* ── Typewriter hook ─────────────────────────────────── */
function useTypewriter(phrases, speed = 60, pause = 1800, deleteSpeed = 35) {
  const [display, setDisplay] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    const current = phrases[phraseIdx]
    if (!deleting && charIdx < current.length) {
      timer.current = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timer.current = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timer.current = setTimeout(() => setCharIdx(c => c - 1), deleteSpeed)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    }
    return () => clearTimeout(timer.current)
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause, deleteSpeed])

  useEffect(() => { setDisplay(phrases[phraseIdx].slice(0, charIdx)) }, [charIdx, phraseIdx, phrases])
  return display
}

/* ── Stagger variants ────────────────────────────────── */
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] } },
}

/* ── Photo / Avatar ──────────────────────────────────── */
function PhotoAvatar({ size = 180, className = '' }) {
  const url = PERSONAL.photo

  return (
    <div
      className={`photo-circle ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="photo-circle-inner">
        {url
          ? <img src={url} alt={PERSONAL.name} />
          : (
            <div className="flex flex-col items-center justify-center select-none w-full h-full">
              <span
                className="font-semibold"
                style={{ fontSize: size * 0.28, color: '#60A5FA', lineHeight: 1 }}
              >
                PM
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}

/* ── Orbit pill ──────────────────────────────────────── */
function OrbitPill({ pill }) {
  return (
    <div
      className="orbit-pill"
      style={{
        '--dur': pill.orbitDuration,
        '--start': pill.startAngle + 'deg',
        '--r': pill.orbitRadius + 'px',
      }}
    >
      <div className="glass px-2.5 py-1 text-[10px] font-medium text-slate-300 whitespace-nowrap"
           style={{ borderRadius: 999 }}>
        {pill.label}
      </div>
    </div>
  )
}

/* ── Magnetic Button ─────────────────────────────────── */
function MagneticButton({ children, className, href, download, id, target, rel }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * 0.28, y: y * 0.28 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      id={id}
      download={download}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const typed = useTypewriter(PERSONAL.titles)
  const heroRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    heroRef.current.style.setProperty('--mx', x + '%')
    heroRef.current.style.setProperty('--my', y + '%')

    const rx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ry = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setMousePos({ x: rx * 12, y: ry * 12 })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        paddingTop: 64,
        paddingLeft: 'clamp(2rem, 8vw, 7rem)',
        paddingRight: 'clamp(2rem, 8vw, 7rem)',
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        boxSizing: 'border-box',
        '--mx': '50%',
        '--my': '50%',
        background: 'radial-gradient(600px circle at var(--mx) var(--my), rgba(59,130,246,0.05), transparent 50%)'
      }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage:
               'linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)',
             backgroundSize: '56px 56px',
             maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
           }}
      />

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-center py-16">

          {/* ── LEFT COLUMN ──────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col relative"
          >
            {/* Focal highlight behind text */}
            <div className="absolute -inset-10 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.12), transparent 70%)',
              filter: 'blur(30px)',
              zIndex: -1
            }} />

            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-green-400"
                    style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <span className="pulse-dot" />
                Open to Internships
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="font-extrabold leading-tight tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-200"
              style={{
                fontSize: 'clamp(46px, 7vw, 78px)',
                textShadow: '0 0 80px rgba(59,130,246,0.25)',
                letterSpacing: '-0.04em',
                lineHeight: 1.05
              }}
            >
              {PERSONAL.name}
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="mb-5" style={{ minHeight: 32 }}>
              <span className="grad-text font-semibold" style={{ fontSize: 'clamp(18px, 2.8vw, 24px)', filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.25))' }}>
                {typed}
                <span className="inline-block w-0.5 h-5 ml-0.5 bg-blue-400 align-middle animate-pulse" />
              </span>
            </motion.div>

            {/* Hook */}
            <motion.p variants={fadeUp} className="text-slate-400 mb-8 font-light leading-relaxed"
                      style={{ fontSize: 'clamp(14px, 1.6vw, 17px)', maxWidth: '520px' }}>
              I build real things — from web apps to ESP32 hardware.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3.5 mb-8">
              <MagneticButton href="#projects" id="hero-view-projects" className="btn btn-primary text-sm px-6 py-3">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                View Projects
              </MagneticButton>
              <MagneticButton
                href={PERSONAL.resumeUrl || "/resume/resume.pdf"}
                id="hero-download-resume"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-sm px-6 py-3"
              >
                Download Resume ↗
              </MagneticButton>
            </motion.div>

            {/* Social row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {[
                {
                  label: 'GitHub', href: PERSONAL.github,
                  icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
                },
                {
                  label: 'LinkedIn', href: PERSONAL.linkedin,
                  icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
                {
                  label: 'Email', href: `mailto:${PERSONAL.email}`,
                  icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all text-xs font-medium no-underline"
                  aria-label={s.label}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="hidden md:flex items-center justify-center relative"
            style={{ height: 420 }}
          >
            {/* Glow blobs - layered rotating */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.12, 0.95, 1],
                  rotate: [0, 90, 180, 360],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  width: 380, height: 380,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)',
                  top: '50%', left: '50%',
                  x: '-50%', y: '-50%',
                  filter: 'blur(60px)',
                }}
              />
              <motion.div
                animate={{
                  scale: [1, 0.92, 1.08, 1],
                  rotate: [360, 270, 180, 0],
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute"
                style={{
                  width: 300, height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
                  top: '55%', left: '45%',
                  x: '-50%', y: '-50%',
                  filter: 'blur(45px)',
                }}
              />
            </div>

            {/* Outer floating orb ring */}
            <div
              className="float-orb absolute rounded-full pointer-events-none"
              style={{
                width: 300, height: 300,
                background: 'radial-gradient(circle, rgba(59,130,246,0.15), rgba(139,92,246,0.08), transparent 70%)',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            />

            {/* Orbit ring dashes */}
            <div className="absolute rounded-full pointer-events-none"
                 style={{ width: 260, height: 260, border: '1px dashed rgba(255,255,255,0.06)' }} />

            {/* Central photo */}
            <PhotoAvatar size={180} className="relative z-10" />

            {/* Orbiting pills */}
            {ORBIT_PILLS.map(pill => (
              <OrbitPill key={pill.label} pill={pill} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-[10px] uppercase tracking-widest">scroll</span>
        <div className="bounce-arrow">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
