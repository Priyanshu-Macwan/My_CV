import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TIMELINE } from '../constants/data'

/* ── Single timeline event ────────────────────────────── */
function TimelineItem({ event, index }) {
  const isLeft = event.side ? event.side === 'left' : index % 2 === 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <div ref={ref} className={`relative grid grid-cols-[1fr_40px_1fr] gap-0 items-start mb-10 tl-item ${inView ? 'visible' : ''}`}>
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
        className={isLeft ? 'pr-6' : 'invisible'}
      >
        {isLeft && <EventCard event={event} align="right" />}
      </motion.div>

      {/* Center dot + year */}
      <div className="flex flex-col items-center pt-4 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="tl-dot"
          style={{ boxShadow: `0 0 0 4px ${event.color || '#3B82F6'}22, 0 0 14px ${event.color || '#3B82F6'}50` }}
        />
        {/* Year label */}
        <div className="text-[10px] font-medium mt-1.5 whitespace-nowrap"
             style={{ color: event.color || '#3B82F6' }}>
          {event.year}
        </div>
      </div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 50 : 0 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
        className={!isLeft ? 'pl-6' : 'invisible'}
      >
        {!isLeft && <EventCard event={event} align="left" />}
      </motion.div>
    </div>
  )
}

function EventCard({ event, align }) {
  return (
    <div
      className="glass p-4 relative overflow-hidden glass-hover"
    >
      {/* Accent border side */}
      <div
        className="absolute top-0 bottom-0 w-0.5"
        style={{
          [align === 'left' ? 'left' : 'right']: 0,
          background: `linear-gradient(180deg, ${event.color || '#3B82F6'}, transparent)`,
        }}
      />
      <div className="text-xs font-medium mb-1" style={{ color: event.color || '#3B82F6' }}>
        {event.year}
      </div>
      <h4 className="text-sm font-medium text-slate-100 mb-1.5 leading-snug" style={{ fontWeight: 500 }}>
        {event.title}
      </h4>
      <p className="text-xs text-slate-500 leading-relaxed font-light">{event.detail || event.description}</p>
    </div>
  )
}

export default function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="timeline" className="section" style={{ background: 'rgba(0,0,0,0.1)' }}>
      <div className="wrap">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          ref={ref}
          className="mb-14 text-center"
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
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical center line */}
          <div className="tl-line absolute" />

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
        }
      `}</style>
    </section>
  )
}
