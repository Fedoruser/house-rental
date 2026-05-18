import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation, Thumbs } from 'swiper/modules'
import { type Swiper as SwiperType } from 'swiper'
import { Button, Modal, Tag, Spin } from 'antd'
import * as Icons from 'lucide-react'

import { MotionSection } from '@shared/ui/Section/MotionSection'
import { useHouses } from '@shared/hooks/useHouses'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import styles from './CatalogSection.module.scss'
import { House } from '@shared/types/types'

const LucideIcon = ({ name, size = 18 }: { name: string; size?: number }) => {
  const isValidIcon = name in Icons

  if (!isValidIcon) {
    return <Icons.HelpCircle size={size} style={{ opacity: 0.6 }} />
  }

  const IconComponent = Icons[
    name as keyof typeof Icons
  ] as React.ComponentType<{ size?: number }>

  return <IconComponent size={size} />
}

const ModalGalleryContent = ({ house }: { house: House }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <div className={styles.modalGalleryBlock}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.modalBigImage}
      >
        {house.images.map((img, idx) => (
          <SwiperSlide key={`modal-main-${house.id}-${idx}`}>
            <img src={img} alt={`${house.title} view ${idx}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.modalThumbs}
      >
        {house.images.map((img, idx) => (
          <SwiperSlide
            key={`modal-thumb-${house.id}-${idx}`}
            className={styles.modalThumbSlide}
          >
            <img src={img} alt="thumbnail" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const CatalogSection = () => {
  const [activeTab, setActiveTab] = useState<string>('Все')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const swiperRef = useRef<{ swiper: SwiperType } | null>(null)

  const { data, isLoading, isError } = useHouses()
  const catalog = data?.catalog

  const categories = useMemo<string[]>(() => {
    if (!catalog) return ['Все']
    return ['Все', ...Object.keys(catalog)]
  }, [catalog])

  const allHouses = useMemo<House[]>(() => {
    if (!catalog) return []
    return Object.values(catalog).flat() as House[]
  }, [catalog])

  const filteredHouses = useMemo<House[]>(() => {
    if (!catalog) return []
    if (activeTab === 'Все') return allHouses

    if (activeTab in catalog) {
      return catalog[activeTab as keyof typeof catalog] || []
    }

    return []
  }, [activeTab, catalog, allHouses])

  const activeIndex = useMemo<number>(
    () => filteredHouses.findIndex(obj => obj.id === selectedId),
    [selectedId, filteredHouses],
  )

  const activeObject = filteredHouses[activeIndex] as House | undefined

  const handleNext = () => {
    if (filteredHouses.length === 0) return
    const nextIndex = (activeIndex + 1) % filteredHouses.length
    setSelectedId(filteredHouses[nextIndex].id)
  }

  const handlePrev = () => {
    if (filteredHouses.length === 0) return
    const prevIndex =
      (activeIndex - 1 + filteredHouses.length) % filteredHouses.length
    setSelectedId(filteredHouses[prevIndex].id)
  }

  const handleTabChange = (cat: string) => {
    setActiveTab(cat)
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0, 300)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedId(null)
  }

  return (
    <MotionSection id="catalog" fullscreen snap>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Каталог домов
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Подборка лучших вариантов для вашего отдыха
          </motion.p>
        </div>

        <div className={styles.filterWrapper}>
          <div className={styles.filterContainer}>
            {!isLoading &&
              !isError &&
              categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeTab === cat ? styles.active : ''}`}
                  onClick={() => handleTabChange(cat)}
                >
                  <span className={styles.btnText}>{cat}</span>
                  {activeTab === cat && (
                    <motion.div
                      layoutId="activeTab"
                      className={styles.activeBg}
                      transition={{
                        type: 'spring',
                        bounce: 0.15,
                        duration: 0.4,
                      }}
                    />
                  )}
                </button>
              ))}
          </div>
        </div>

        <div className={styles.sliderContainer}>
          {isLoading ? (
            <div className={styles.centerBox}>
              <Spin size="large" tip="Загрузка доступных объектов..." />
            </div>
          ) : isError ? (
            <div className={styles.centerBox}>
              <p className={styles.errorText}>
                Не удалось загрузить каталог товаров
              </p>
            </div>
          ) : (
            <Swiper
              ref={swiperRef}
              modules={[FreeMode, Mousewheel]}
              spaceBetween={24}
              slidesPerView="auto"
              grabCursor={true}
              freeMode={{
                enabled: true,
                sticky: false,
                momentumRatio: 0.4,
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
              }}
              breakpoints={{
                320: { spaceBetween: 16 },
                768: { spaceBetween: 20 },
                1024: { spaceBetween: 24 },
              }}
              className={styles.swiperWrapperCustom}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredHouses.map((house: House) => (
                  <SwiperSlide
                    key={house.id}
                    className={styles.swiperSlideCustom}
                    onClick={() => {
                      setSelectedId(house.id)
                      setIsModalOpen(true)
                    }}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className={styles.card}
                    >
                      <div className={styles.cardContent}>
                        <div className={styles.imageWrapper}>
                          <img
                            src={house.images[0]}
                            alt={house.title}
                            loading="lazy"
                          />
                          {house.capacity && (
                            <span className={styles.durationBadge}>
                              {house.capacity}
                            </span>
                          )}
                        </div>

                        <div className={styles.cardInfo}>
                          <div className={styles.textGroup}>
                            <h3>{house.title}</h3>
                            <p className={styles.area}>{house.area}</p>
                          </div>

                          <div className={styles.priceGroup}>
                            <span className={styles.price}>{house.price}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </AnimatePresence>
            </Swiper>
          )}
        </div>

        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1100}
          centered
          destroyOnClose
          className={styles.premiumModal}
          closeIcon={
            <div className={styles.closeBtn}>
              <Icons.X size={18} />
            </div>
          }
        >
          {activeObject && (
            <div className={styles.modalLayout}>
              <div className={styles.modalNav}>
                <button className={styles.navAction} onClick={handlePrev}>
                  <Icons.ChevronLeft size={18} />
                  <span>Назад</span>
                </button>
                <div className={styles.navCounter}>
                  {activeIndex + 1} / {filteredHouses.length}
                </div>
                <button className={styles.navAction} onClick={handleNext}>
                  <span>Вперед</span>
                  <Icons.ChevronRight size={18} />
                </button>
              </div>

              <div className={styles.modalScrollableArea}>
                <div className={styles.topSection}>
                  <ModalGalleryContent
                    key={activeObject.id}
                    house={activeObject}
                  />

                  <div className={styles.shortInfo}>
                    <div className={styles.mainInfoGroup}>
                      <div className={styles.headerInfo}>
                        <Tag color="#000" className={styles.topTag}>
                          {activeObject.category}
                        </Tag>
                        <h1>{activeObject.title}</h1>
                      </div>

                      <div className={styles.quickStats}>
                        <div className={styles.stat}>
                          <Icons.Maximize2 size={16} />
                          <span>{activeObject.area}</span>
                        </div>
                        {activeObject.capacity && (
                          <div className={styles.stat}>
                            <Icons.Users size={16} />
                            <span>{activeObject.capacity}</span>
                          </div>
                        )}
                      </div>

                      {activeObject.features &&
                        activeObject.features.length > 0 && (
                          <div className={styles.amenities}>
                            {activeObject.features.map((feat, index) => (
                              <div key={index} className={styles.amenityItem}>
                                <LucideIcon name={feat.icon} size={15} />
                                <span className={styles.amenityLabel}>
                                  {feat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className={styles.bookingCard}>
                      <div className={styles.priceContainer}>
                        <span className={styles.label}>Стоимость</span>
                        <span className={styles.priceValue}>
                          {activeObject.price}
                        </span>
                      </div>
                      <Button
                        type="primary"
                        block
                        size="large"
                        className={styles.mainActionBtn}
                      >
                        Забронировать проживание
                      </Button>
                    </div>
                  </div>
                </div>

                <div className={styles.bottomSection}>
                  <h3>Описание объекта</h3>
                  <p>{activeObject.description}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MotionSection>
  )
}
