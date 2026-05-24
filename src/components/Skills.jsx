import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SKILLS } from '../constants/data'

const GROUPS = [
  {
    key: 'languages',
    label: 'Languages',
    icon: '⟨/⟩',
    accent: '#3B82F6',
    pillClass: 'lang',
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Tools',
    icon: '◈',
    accent: '#8B5CF6',
    pillClass: 'fw',
  },
  {
    key: 'embedded',
    label: 'Embedded & Data Science',
    icon: '⚙',
    accent: '#06B6D4',
    pillClass: 'data',
  },
]

function PillGroup({ group, skills, inView }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.19,1,0.22,1] } },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="glass p-6"
    >
      {/* Group header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{
            background: `${group.accent}18`,
            border: `1px solid ${group.accent}30`,
            color: group.accent,
          }}
        >
          {group.icon}
        </div>
        <span className="text-sm font-medium text-slate-200">{group.label}</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-xs text-slate-600">{skills.length} items</span>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className={`skill-pill ${group.pillClass}`}>
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section" style={{ background: 'rgba(0,0,0,0.12)' }} ref={ref}>
      <div className="wrap">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-14"
        >
          <div className="eyebrow">Skills</div>
          <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 600 }}>
            What I work <span className="grad-text">with</span>
          </h2>
          <p className="text-slate-500 mt-3 font-light" style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', maxWidth: 480 }}>
            A curated stack built across real shipped projects — from web to hardware.
          </p>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="flex flex-col gap-4"
        >
          {SKILLS.map((skillGroup, i) => {
            const pillClassMap = { 'blue': 'lang', 'purple': 'fw', 'cyan': 'data' };
            const group = {
              key: skillGroup.group,
              label: skillGroup.group,
              icon: skillGroup.group === 'Languages' ? '⟨/⟩' : (skillGroup.group.includes('Framework') ? '◈' : '⚙'),
              accent: skillGroup.accent === 'blue' ? '#3B82F6' : (skillGroup.accent === 'purple' ? '#8B5CF6' : '#06B6D4'),
              pillClass: pillClassMap[skillGroup.accent] || 'lang'
            };
            return (
              <PillGroup
                key={group.key}
                group={group}
                skills={skillGroup.items}
                inView={inView}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
