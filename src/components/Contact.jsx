import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PERSONAL } from '../constants/data'

const LINKS = [
  {
    id: 'contact-github',
    label: 'GitHub',
    href: PERSONAL.github,
    icon: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    sub: PERSONAL.github.replace('https://', ''),
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    href: PERSONAL.linkedin,
    icon: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    sub: 'priyanshu-macwan-697b72324',
  },
  {
    id: 'contact-email',
    label: 'Email',
    href: `mailto:${PERSONAL.email}`,
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    sub: PERSONAL.email,
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="wrap text-center" style={{ maxWidth: 680 }}>
        {/* Eyebrow */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-6"
        >
          <div className="eyebrow justify-center">
            <span style={{ width: 28, height: 1.5, background: '#3B82F6', borderRadius: 1, display: 'inline-block' }} />
            Contact
            <span style={{ width: 28, height: 1.5, background: '#3B82F6', borderRadius: 1, display: 'inline-block' }} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.05 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="font-semibold tracking-tight mb-4"
          style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 600, letterSpacing: '-1.5px', lineHeight: 1.05 }}
        >
          Let's build <span className="grad-text">something.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-slate-400 font-light mb-14"
          style={{ fontSize: 'clamp(14px, 1.6vw, 17px)' }}
        >
          Open to internships, collaborations, and interesting problems.
        </motion.p>

        {/* Icon link cards */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {LINKS.map(link => (
            <motion.a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19,1,0.22,1] } } }}
              className="glass contact-card flex flex-col items-center gap-3 p-7 no-underline"
              style={{ minWidth: 160, flex: 1 }}
            >
              <div className="cc-icon text-slate-400 transition-colors duration-300">{link.icon}</div>
              <div>
                <div className="text-sm font-medium text-slate-200 mb-0.5">{link.label}</div>
                <div className="text-[10px] text-slate-600 truncate" style={{ maxWidth: 140 }}>{link.sub}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Availability badge */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-12"
        >
          <div className="eyebrow-badge" style={{ marginBottom: 0 }}>
            <span className="eyebrow-dot" />
            Available for opportunities · 2025
          </div>
        </motion.div>
      </div>
    </section>
  )
}
