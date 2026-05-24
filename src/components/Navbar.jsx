import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PERSONAL } from '../constants/data'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setActive(e.target.id)
        }
      })
    }, { threshold: 0.4 })

    const ids = NAV_LINKS.map(l => l.href.slice(1))
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-black/25'
          : 'border-b border-transparent bg-transparent'
      }`}
      style={{ height: 64 }}
    >
      <div className="wrap h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
               style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
            PM
          </div>
          <span className="text-slate-200 font-medium text-sm tracking-wide hidden sm:block">
            {PERSONAL.name.split(' ')[0]}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 navbar-links">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 no-underline ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute bottom-[-4px] left-2 right-2 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
          <motion.a
            href={`mailto:${PERSONAL.email}`}
            className="ml-3 btn btn-primary text-xs px-4 py-2"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
          aria-label="Menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full inset-x-0 border-t border-white/5"
            style={{ background: 'rgba(15,23,42,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="wrap py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
