import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TIMELINE } from '../constants/data'

const ACCENT_COLORS = ['#3B82F6', '#A855F7', '#06B6D4'] // blue, purple, cyan

/* ── Single timeline event ────────────────────────────── */
function TimelineItem({ event, index }) {
  const isLeft = event.side ? event.side === 'left' : index % 2 === 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })
  const dotColor = ACCENT_COLORS[index % ACCENT_COLORS.length]

  return (
    <div ref={ref} className={`relative grid grid-cols-[1fr_40px_1fr] gap-0 items-start mb-16 tl-item ${inView ? 'visible' : ''}`}>
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -35 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
        className={isLeft ? 'pr-8 text-right' : 'invisible'}
      >
        {isLeft && <EventCard event={event} align="right" accentColor={dotColor} />}
      </motion.div>

      {/* Center dot + year */}
      <div className="flex flex-col items-center pt-4 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="tl-dot"
          style={{
            borderColor: inView ? dotColor : 'rgba(255, 255, 255, 0.15)',
            background: inView ? dotColor : '#020617',
            boxShadow: inView
              ? `0 0 0 5px ${dotColor}1a, 0 0 16px ${dotColor}60`
              : '0 0 0 4px rgba(255,255,255,0.01)',
          }}
        />
        {/* Year label */}
        <div className="text-[10px] font-semibold mt-2.5 tracking-wider whitespace-nowrap"
             style={{ color: inView ? dotColor : 'var(--text-muted)' }}>
          {event.year}
        </div>
      </div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 35 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
        className={!isLeft ? 'pl-8' : 'invisible'}
      >
        {!isLeft && <EventCard event={event} align="left" accentColor={dotColor} />}
      </motion.div>
    </div>
  )
}

function EventCard({ event, align, accentColor }) {
  return (
    <div
      className="glass p-5 relative overflow-hidden glass-hover"
      style={{ borderLeft: align === 'left' ? `2px solid ${accentColor}` : undefined, borderRight: align === 'right' ? `2px solid ${accentColor}` : undefined }}
    >
      <div className="text-xs font-semibold mb-1" style={{ color: accentColor }}>
        {event.year}
      </div>
      <h4 className="text-sm font-semibold text-slate-100 mb-2 leading-snug">
        {event.title}
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed font-light">{event.detail || event.description}</p>
    </div>
  )
}

export default function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const containerRef = useRef(null)

  // Track scroll position of timeline container to draw glowing progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smoothly map progress to scaleY
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="timeline" className="section" style={{ background: 'rgba(0,0,0,0.06)' }}>
      <div className="wrap">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          ref={ref}
          className="mb-16 text-center"
        >
          <div className="eyebrow justify-center">Timeline</div>
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600 }}>
            My <span className="grad-text">Journey</span>
          </h2>
          <p className="text-slate-500 mt-3 font-light text-sm max-w-sm mx-auto">
            Key milestones from 2024 to now — everything I've shipped, learned, and competed in.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto timeline-container">
          {/* Vertical center line */}
          <div className="tl-line absolute" />
          
          {/* Glowing active progress line */}
          <motion.div
            className="tl-progress-line absolute"
            style={{ scaleY }}
          />

          {TIMELINE.map((event, i) => (
            <TimelineItem key={`${event.year}-${event.title}`} event={event} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile responsive: stack all left */}
      <style>{`
        @media (max-width: 640px) {
          .tl-item {
            grid-template-columns: 32px 1fr !important;
            margin-bottom: 3rem !important;
          }
          .tl-item > div:first-child  { display: none !important; }
          .tl-item > div:nth-child(2) { grid-column: 1; }
          .tl-item > div:nth-child(3) {
            grid-column: 2;
            padding-left: 16px !important;
            padding-right: 0 !important;
            visibility: visible !important;
          }
          .tl-item > div:nth-child(3) .glass { display: block !important; }
          .tl-line { left: 20px !important; }
          .tl-progress-line { left: 20px !important; }
        }
      `}</style>
    </section>
  )
}
