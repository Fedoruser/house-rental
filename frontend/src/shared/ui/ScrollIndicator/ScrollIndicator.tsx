import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ScrollIndicator.module.scss'

const sections = [
  { id: 'about', label: 'Главная' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
]

export const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px', // Считаем секцию активной, когда она на середине экрана
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Подписываемся на все секции
    sections.forEach(section => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.wrapper}>
      {sections.map(section => (
        <div
          key={section.id}
          className={styles.dotContainer}
          onClick={() => scrollToSection(section.id)}
        >
          {/* Подсказка при наведении (Apple Style) */}
          <AnimatePresence>
            <motion.span className={styles.label}>{section.label}</motion.span>
          </AnimatePresence>

          {/* Сама точка */}
          <motion.div
            className={styles.dot}
            animate={{
              scale: activeSection === section.id ? 1.5 : 1,
              backgroundColor:
                activeSection === section.id
                  ? 'var(--color-primary)'
                  : 'rgba(0, 0, 0, 0.2)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>
      ))}
    </div>
  )
}
