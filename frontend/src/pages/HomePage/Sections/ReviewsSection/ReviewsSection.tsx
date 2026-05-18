import { useEffect, useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { MotionSection } from '@shared/ui/Section/MotionSection'

import styles from './ReviewsSection.module.scss'
import { useHouses } from '@shared/hooks/useHouses'

export const ReviewsSection = () => {
  const { data, isLoading, isError } = useHouses()

  const reviews = useMemo(() => {
    return data?.reviews?.filter(review => review.isApproved) || []
  }, [data])

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = useCallback(() => {
    if (!reviews.length) return

    setDirection(1)
    setActiveIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1))
  }, [reviews])

  const handlePrev = useCallback(() => {
    if (!reviews.length) return

    setDirection(-1)
    setActiveIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1))
  }, [reviews])

  useEffect(() => {
    if (!reviews.length) return

    const interval = setInterval(handleNext, 8000)

    return () => clearInterval(interval)
  }, [handleNext, reviews])

  const renderStars = (rating: number) => (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.05 }}
        >
          <Star
            size={18}
            fill={i < rating ? '#FFC107' : 'transparent'}
            color={i < rating ? '#FFC107' : '#d1d5db'}
            strokeWidth={1.8}
          />
        </motion.div>
      ))}
    </div>
  )

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
    }),
  }

  if (isLoading) {
    return (
      <MotionSection id="reviews" className={styles.section}>
        <div className="container">
          <div className={styles.loading}>Загружаем отзывы...</div>
        </div>
      </MotionSection>
    )
  }

  if (isError || !reviews.length) {
    return null
  }

  const activeReview = reviews[activeIndex]

  return (
    <MotionSection id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={styles.label}
            >
              Реальные отзывы
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Что говорят наши клиенты
            </motion.h2>
          </div>

          <div className={styles.sliderContainer}>
            <button
              className={`${styles.navBtn} ${styles.prev}`}
              onClick={handlePrev}
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft size={24} />
            </button>

            <div className={styles.slider}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeReview.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: 'spring',
                      stiffness: 280,
                      damping: 28,
                    },
                    opacity: { duration: 0.25 },
                  }}
                  className={styles.card}
                >
                  <div className={styles.glow} />
                  <div className={styles.quoteMark}>“</div>

                  <div className={styles.cardHeader}>
                    {renderStars(activeReview.rating)}

                    <div className={styles.houseType}>
                      {activeReview.houseType}
                    </div>
                  </div>

                  <p className={styles.text}>{activeReview.text}</p>

                  <div className={styles.footer}>
                    <img
                      src={activeReview.avatar}
                      alt={activeReview.name}
                      className={styles.avatar}
                    />

                    <div className={styles.info}>
                      <div className={styles.name}>{activeReview.name}</div>

                      <div className={styles.role}>Проверенный клиент</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className={`${styles.navBtn} ${styles.next}`}
              onClick={handleNext}
              aria-label="Следующий отзыв"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className={styles.dots}>
            {reviews.map((review, index) => (
              <button
                key={review.id}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.active : ''
                }`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
              >
                {index === activeIndex && (
                  <motion.div
                    layoutId="activeDot"
                    className={styles.activeLine}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
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
