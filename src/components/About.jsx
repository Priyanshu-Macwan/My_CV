import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PERSONAL, STATS } from '../constants/data'

/* ── Animated counter ───────────────────────────────── */
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 })
  const raf = useRef(null)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start    = performance.now()
    const animate  = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)   // ease-out cubic
      setCount(Math.floor(eased * value))
      if (progress < 1) raf.current = requestAnimationFrame(animate)
      else setCount(value)
    }
    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Photo avatar (reused from Hero, same treatment) ── */
function SmallAvatar() {
  const [hovered, setHovered] = useState(false)
  const url = PERSONAL.photo

  return (
    <div
      className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
      style={{
        width: 140, height: 140,
        border: `2px solid ${hovered ? '#3B82F6' : 'rgba(59,130,246,0.3)'}`,
        boxShadow: hovered ? '0 0 24px rgba(59,130,246,0.35)' : 'none',
        filter: hovered ? 'grayscale(0%) brightness(1)' : 'grayscale(15%) contrast(1.1) brightness(0.95)',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 350ms ease',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {url
        ? <img src={url} alt={PERSONAL.name} className="w-full h-full object-cover rounded-full" />
        : (
          <div className="flex flex-col items-center select-none">
            <span className="font-semibold text-blue-400 text-4xl leading-none">PM</span>
            <span className="text-slate-500 text-xs mt-1">Priyanshu</span>
          </div>
        )
      }
    </div>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
}

const PARAGRAPHS = [
  "I'm a second-year CSE student at CHARUSAT, passionate about building software that solves real problems — not just academic exercises.",
  "I've independently shipped 5+ projects spanning full-stack web apps, IoT hardware systems, and decentralized architecture — without waiting for coursework to catch up.",
  "Currently deepening my skills in Data Science and ML, preparing for GATE-CS, and looking for internship opportunities to contribute to real engineering teams.",
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="wrap">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-14"
        >
          <div className="eyebrow">About Me</div>
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600 }}>
            Who I <span className="grad-text">am</span>
          </h2>
          {/* Blue underline accent */}
          <div className="mt-2 h-0.5 w-12 rounded-full" style={{ background: '#3B82F6' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-start">
          {/* Left: photo */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.19,1,0.22,1] } } }}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col items-center gap-3"
          >
            <SmallAvatar />
            <div className="text-center">
              <div className="text-sm font-medium text-slate-200">{PERSONAL.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">CHARUSAT · B.Tech CSE</div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Frontend', 'Systems', 'Data'].map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-blue-400"
                      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: paragraphs */}
          <div className="flex flex-col gap-5">
            {PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.19,1,0.22,1] } } }}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="text-slate-400 leading-relaxed font-light"
                style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}
              >
                {para}
              </motion.p>
            ))}

            {/* Quick facts */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.35 } } }}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-4 mt-2"
            >
              {[
                { icon: '📍', text: PERSONAL.location },
                { icon: '🎓', text: 'Semester 4 · 2nd Year' },
                { icon: '🏫', text: 'CHARUSAT University' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Stat counters ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.19,1,0.22,1] } } }}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="glass glass-hover text-center py-8 px-4 relative overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)' }} />
              <div className="font-semibold text-blue-400 mb-1" style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: 1 }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-300 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
