import { PERSONAL } from '../constants/data'

export default function Footer() {
  return (
    <footer
      className="py-8 text-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <p className="text-slate-600 text-xs font-light tracking-wide">
        Built by{' '}
        <span className="text-blue-500 font-medium">{PERSONAL.name}</span>
        {' '}· {new Date().getFullYear()}
        {' '}·{' '}
        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-300 transition-colors no-underline"
        >
          View Source
        </a>
      </p>
    </footer>
  )
}
