import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MotionSection } from '@shared/ui/Section/MotionSection'

import styles from './ReviewsSection.module.scss'

export const REVIEWS = [
  {
    id: 1,
    name: 'Анна Смирнова',
    role: 'Семейный отдых',
    text: 'Очень уютный дом и невероятная атмосфера. Всё было идеально для семейного отдыха. Дети в восторге от игровой зоны!',
  },
  {
    id: 2,
    name: 'Дмитрий Волков',
    role: 'Любитель бани',
    text: 'Отличная баня, красивый вид и очень чисто. Обязательно приедем снова. Сервис на высоте!',
  },
  {
    id: 3,
    name: 'Мария Иванова',
    role: 'Дизайнер',
    text: 'Пожалуй лучший загородный отдых за последнее время. Всё продумано до мелочей в интерьере.',
  },
  {
    id: 4,
    name: 'Алексей Козлов',
    role: 'Природа и уют',
    text: 'Современный интерьер, тишина и природа. Остались очень довольны качеством сервиса.',
  },
]

export const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = useCallback(() => {
    setDirection(1)
    setActiveIndex(prev => (prev === REVIEWS.length - 1 ? 0 : prev + 1))
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    const interval = setInterval(handleNext, 8000)
    return () => clearInterval(interval)
  }, [handleNext])

  const renderStars = () => (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#FFC107"
          />
        </motion.svg>
      ))}
    </div>
  )

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
    }),
  }

  return (
    <MotionSection id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={styles.label}
            >
              Впечатления
            </motion.span>
            <h2>Отзывы гостей</h2>
          </div>

          <div className={styles.sliderContainer}>
            <button
              className={`${styles.navBtn} ${styles.prev}`}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.slider}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className={styles.card}
                >
                  <div className={styles.quoteMark}>“</div>
                  <div className={styles.cardHeader}>{renderStars()}</div>
                  <p className={styles.text}>{REVIEWS[activeIndex].text}</p>
                  <div className={styles.footer}>
                    <div className={styles.avatar}>
                      {REVIEWS[activeIndex].name.charAt(0)}
                    </div>
                    <div className={styles.info}>
                      <div className={styles.name}>
                        {REVIEWS[activeIndex].name}
                      </div>
                      <div className={styles.role}>
                        {REVIEWS[activeIndex].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className={`${styles.navBtn} ${styles.next}`}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className={styles.dots}>
            {REVIEWS.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeDot"
                    className={styles.activeLine}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
