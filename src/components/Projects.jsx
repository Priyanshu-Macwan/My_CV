import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PROJECTS } from '../constants/data'

/* ── Icon helpers ─────────────────────────────────────── */
function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function ExternalIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"/>
    </svg>
  )
}

/* ── Card image placeholder ──────────────────────────── */
function CardVisual({ p, height = '200px' }) {
  const artDataMap = {
    'SonicDNA': {
      background: 'linear-gradient(135deg, #040d1e 0%, #0a1a35 100%)',
      svg: (
        <svg width="100%" height="100%" opacity="0.15" style={{position:'absolute', inset:0}}>
          <defs>
            <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M10 10 L50 10 L50 30 M30 10 L30 50 M10 40 L40 40 L40 50" stroke="#3B82F6" strokeWidth="1" fill="none"/>
              <circle cx="10" cy="10" r="3" fill="#3B82F6"/>
              <circle cx="50" cy="30" r="3" fill="#06B6D4"/>
              <circle cx="30" cy="50" r="3" fill="#8B5CF6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      )
    },
    'RestaurantAI': {
      background: 'linear-gradient(135deg, #050e18, #081820)',
      svg: (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      )
    },
    'EcoH2': {
      background: 'linear-gradient(135deg, #080818, #10103a)',
      svg: (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg, rgba(139,92,246,0.1) 25%, transparent 25%, transparent 50%, rgba(139,92,246,0.1) 50%, rgba(139,92,246,0.1) 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }} />
      )
    },
    'Face_Detection': {
      background: 'linear-gradient(135deg, #0c0808, #1a0818)',
      svg: (
        <svg width="100%" height="100%" opacity="0.1" style={{position:'absolute', inset:0}}>
          <defs>
            <pattern id="hex" width="30" height="52" patternUnits="userSpaceOnUse">
              <path d="M15 0 L30 8.66 L30 26 L15 34.64 L0 26 L0 8.66 Z" fill="none" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
      )
    },
    'Student-portal': {
      background: 'linear-gradient(135deg, #060a10, #0a1020)',
      svg: (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      )
    }
  }

  const art = artDataMap[p.name] || {
    background: `linear-gradient(135deg, ${p.gradientFrom}22, ${p.gradientTo}14, transparent)`,
    svg: (
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${p.gradientFrom}08 1px, transparent 1px), linear-gradient(90deg, ${p.gradientFrom}08 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
    )
  };

  return (
    <div
      className="relative overflow-hidden shrink-0 pc-img"
      style={{
        height,
        background: art.background,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {p.image ? (
        <div className="absolute inset-0 overflow-hidden">
          <div 
             className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-105"
             style={{ backgroundImage: `url(${p.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.95)] via-[rgba(15,23,42,0.2)] to-transparent" />
        </div>
      ) : (
        <div className="pf-img-inner absolute inset-0">
          {art.svg}
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(8,14,26,0.9))', zIndex: 5 }} />
      {!p.image && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ opacity: 0.7 }}>
          <span style={{ fontSize: 56, filter: `drop-shadow(0 0 24px ${p.gradientFrom}60)` }}>
            {p.emoji}
          </span>
        </div>
      )}
      <div className="absolute top-3 left-3 z-20">
        <span className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-300"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
          {p.tag}
        </span>
      </div>
    </div>
  )
}

/* ── Card buttons ────────────────────────────────────── */
function CardButtons({ p }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-glass text-xs">
        <GithubIcon /> GitHub
      </a>
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-xs">
          <ExternalIcon /> Live Demo
        </a>
      )}
    </div>
  )
}

/* ── Stack pills ─────────────────────────────────────── */
function StackPills({ stack, accent }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {stack.map(s => (
        <span key={s} className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-400"
              style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}>
          {s}
        </span>
      ))}
    </div>
  )
}

/* ── Featured card ───────────────────────────────────── */
function FeaturedCard({ p }) {
  const isSonic = p.id === 'sonicdna';
  return (
    <div className="glass project-card overflow-hidden relative group" style={isSonic ? { boxShadow: '0 0 45px rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.2)' } : {}}>
      {/* Featured badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-blue-300 tracking-wide"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
          ★ Featured
        </span>
      </div>
      <CardVisual p={p} height="340px" />
      <div className="p-7">
        <h3 className="font-semibold text-slate-100 mb-2" style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 600 }}>
          {p.name}
        </h3>
        <p className="text-slate-400 leading-relaxed font-light text-sm">{p.description}</p>
        <StackPills stack={p.stack} accent={p.gradientFrom} />
        <CardButtons p={p} />
      </div>
    </div>
  )
}

/* ── Medium card ─────────────────────────────────────── */
function MediumCard({ p }) {
  return (
    <div className="glass project-card overflow-hidden flex flex-col group">
      <CardVisual p={p} height="200px" />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-100 text-base mb-1.5" style={{ fontWeight: 600 }}>{p.name}</h3>
        <p className="text-slate-400 text-sm leading-relaxed font-light flex-1">{p.description}</p>
        <StackPills stack={p.stack} accent={p.gradientFrom} />
        <CardButtons p={p} />
      </div>
    </div>
  )
}

/* ── Compact card (horizontal) ───────────────────────── */
function CompactCard({ p }) {
  return (
    <div className="glass project-card overflow-hidden flex gap-0 group">
      {/* Side visual strip */}
      <div className="shrink-0 w-24 sm:w-32 flex items-center justify-center relative overflow-hidden"
           style={{ background: `linear-gradient(180deg, ${p.gradientFrom}18, ${p.gradientTo}10)` }}>
        {p.image ? (
          <div className="absolute inset-0 bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-105" style={{ backgroundImage: `url(${p.image})` }} />
        ) : (
          <span style={{ fontSize: 28, filter: `drop-shadow(0 0 12px ${p.gradientFrom}50)` }}>{p.emoji}</span>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-slate-100 text-sm leading-tight" style={{ fontWeight: 600 }}>{p.name}</h3>
            <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium text-slate-500"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {p.tag}
            </span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-2">{p.description}</p>
        </div>
        <CardButtons p={p} />
      </div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 })

  const featured = PROJECTS.find(p => p.variant === 'featured')
  const medium   = PROJECTS.filter(p => p.variant === 'medium')
  const compact  = PROJECTS.filter(p => p.variant === 'compact')

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="wrap">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-14"
        >
          <div className="eyebrow">Projects</div>
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600 }}>
            Things I've <span className="grad-text">built</span>
          </h2>
          <p className="text-slate-500 mt-3 font-light" style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', maxWidth: 480 }}>
            Real projects, shipped code — from IoT hardware to full-stack web apps.
          </p>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-5"
        >
          {/* Row 1: featured */}
          {featured && (
            <motion.div variants={cardVariants}>
              <FeaturedCard p={featured} />
            </motion.div>
          )}

          {/* Row 2: 2 medium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {medium.map(p => (
              <motion.div key={p.id} variants={cardVariants}>
                <MediumCard p={p} />
              </motion.div>
            ))}
          </div>

          {/* Row 3: 2 compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {compact.map(p => (
              <motion.div key={p.id} variants={cardVariants}>
                <CompactCard p={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
