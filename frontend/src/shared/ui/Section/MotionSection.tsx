import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

import styles from './Section.module.scss'

interface MotionSectionProps {
  children: ReactNode
  id: string
  className?: string

  fullscreen?: boolean

  snap?: boolean
}

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)',
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',

    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 20,
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
}

export const MotionSection = ({
  children,
  id,
  className,
  fullscreen = false,
  snap = true,
}: MotionSectionProps) => {
  return (
    <section
      id={id}
      className={`
        ${styles.section}
        ${fullscreen ? styles.fullscreen : ''}
        ${snap ? styles.snap : ''}
        ${className || ''}
      `}
    >
      <motion.div
        className={styles.contentWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
        }}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    </section>
  )
}
