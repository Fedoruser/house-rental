import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MotionSection } from '@shared/ui/Section/MotionSection'

import styles from './CatalogSection.module.scss'
import { ALL_HOUSES } from '../../../../constants'

export const CatalogSection = () => {
  const [activeTab, setActiveTab] = useState('Все')

  // Автоматически собираем уникальные категории из данных
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(ALL_HOUSES.map(h => h.category)),
    )
    return ['Все', ...uniqueCategories]
  }, [])

  const filteredHouses = useMemo(() => {
    if (activeTab === 'Все') return ALL_HOUSES
    return ALL_HOUSES.filter(house => house.category === activeTab)
  }, [activeTab])

  return (
    <MotionSection id="catalog">
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Каталог домов
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Подборка лучших вариантов для вашего отдыха
          </motion.p>
        </div>

        <div className={styles.filterWrapper}>
          <div className={styles.filterContainer}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeTab === cat ? styles.active : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                <span className={styles.btnText}>{cat}</span>
                {activeTab === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className={styles.activeBg}
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка с анимацией */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredHouses.map(house => (
              <motion.div
                layout
                key={house.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <img src={house.images[0]} alt={house.title} loading="lazy" />
                  <div className={styles.cardInfo}>
                    <div className={styles.textGroup}>
                      <h3>{house.title}</h3>
                      <p>{house.area}</p>
                    </div>
                    <div className={styles.priceGroup}>
                      <span className={styles.price}>{house.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionSection>
  )
}
