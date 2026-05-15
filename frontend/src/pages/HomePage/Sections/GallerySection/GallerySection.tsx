import { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Thumbs, FreeMode, Navigation } from 'swiper/modules'
import { type Swiper as SwiperType } from 'swiper'
import { Button, Modal, Tag } from 'antd'
import { Maximize2, Users, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Твой MotionSection (Shared слой)
import { MotionSection } from '@shared/ui/Section/MotionSection'

// Константы и типы (из того файла, что мы собрали выше)

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import styles from './GallerySection.module.scss'
import { ALL_HOUSES, House } from '../../../../constants'

/**
 * Вспомогательный компонент для слайдеров внутри модалки.
 * key={house.id} снаружи заставляет React полностью пересоздавать этот компонент,
 * что предотвращает конфликты внутренних состояний Swiper при переключении объектов.
 */
const ModalGalleryContent = ({ house }: { house: House }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <div className={styles.galleryBlock}>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.bigImage}
      >
        {house.images.map((img, idx) => (
          <SwiperSlide key={`main-${house.id}-${idx}`}>
            <img src={img} alt={`${house.title} view ${idx}`} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbs}
      >
        {house.images.map((img, idx) => (
          <SwiperSlide
            key={`thumb-${house.id}-${idx}`}
            className={styles.thumbSlide}
          >
            <img src={img} alt="thumbnail" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export const GallerySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  // Находим индекс текущего объекта в общем массиве
  const activeIndex = useMemo(
    () => ALL_HOUSES.findIndex(obj => obj.id === selectedId),
    [selectedId],
  )

  const activeObject = ALL_HOUSES[activeIndex]

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % ALL_HOUSES.length
    setSelectedId(ALL_HOUSES[nextIndex].id)
  }

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + ALL_HOUSES.length) % ALL_HOUSES.length
    setSelectedId(ALL_HOUSES[prevIndex].id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedId(null)
  }

  return (
    <MotionSection fullscreen id="gallery">
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.title}>Наши объекты</h2>
        </header>

        {/* Главный Coverflow слайдер на странице */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          className={styles.mainSwiper}
        >
          {ALL_HOUSES.map(obj => (
            <SwiperSlide
              key={obj.id}
              className={styles.slide}
              onClick={() => {
                setSelectedId(obj.id)
                setIsModalOpen(true)
              }}
            >
              <div className={styles.imageContainer}>
                <img src={obj.images[0]} alt={obj.title} />
                <div className={styles.slideOverlay}>
                  <div className={styles.slideInfo}>
                    <Tag className={styles.categoryTag}>{obj.category}</Tag>
                    <h3>{obj.title}</h3>
                    <p>
                      {obj.area} • {obj.price}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Детальная модалка */}
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={1100}
          centered
          destroyOnClose // Важно для сброса стейта Swiper при закрытии
          className={styles.premiumModal}
          closeIcon={
            <div className={styles.closeBtn}>
              <X size={20} />
            </div>
          }
        >
          {activeObject && (
            <div className={styles.modalLayout}>
              {/* Навигация между объектами внутри модалки */}
              <div className={styles.modalNav}>
                <button className={styles.navAction} onClick={handlePrev}>
                  <ChevronLeft size={20} />
                  <span>Назад</span>
                </button>
                <div className={styles.navCounter}>
                  {activeIndex + 1} / {ALL_HOUSES.length}
                </div>
                <button className={styles.navAction} onClick={handleNext}>
                  <span>Вперед</span>
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className={styles.topSection}>
                {/* Контент галереи с ключом для ререндера */}
                <ModalGalleryContent
                  key={activeObject.id}
                  house={activeObject}
                />

                <div className={styles.shortInfo}>
                  <div className={styles.headerInfo}>
                    <Tag color="#000" className={styles.topTag}>
                      {activeObject.category}
                    </Tag>
                    <h1>{activeObject.title}</h1>
                  </div>

                  <div className={styles.quickStats}>
                    <div className={styles.stat}>
                      <Maximize2 size={18} />
                      <span>{activeObject.area}</span>
                    </div>
                    <div className={styles.stat}>
                      <Users size={18} />
                      <span>{activeObject.capacity}</span>
                    </div>
                  </div>

                  <div className={styles.amenities}>
                    {activeObject.features.map((f, i) => (
                      <div key={i} className={styles.amenityItem}>
                        {f.icon}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.bookingCard}>
                    <div className={styles.priceContainer}>
                      <span className={styles.label}>Стоимость суток</span>
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
                      Забронировать отдых
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.bottomSection}>
                <h3>Об объекте</h3>
                <p>{activeObject.description}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MotionSection>
  )
}
