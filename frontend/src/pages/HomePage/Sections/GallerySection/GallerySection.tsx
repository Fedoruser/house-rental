import { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Thumbs, FreeMode, Navigation } from 'swiper/modules'
import { type Swiper as SwiperType } from 'swiper'
import { Button, Modal, Tag, Spin } from 'antd'
import * as Icons from 'lucide-react'

import { MotionSection } from '@shared/ui/Section/MotionSection'
import { useHouses } from '@shared/hooks/useHouses'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import styles from './GallerySection.module.scss'
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
          <SwiperSlide key={`main-${house.id}-${idx}`}>
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
            key={`thumb-${house.id}-${idx}`}
            className={styles.modalThumbSlide}
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

  const { data, isLoading, isError } = useHouses()

  const allHouses = useMemo<House[]>(() => {
    if (!data?.catalog) return []
    return Object.values(data.catalog).flat() as House[]
  }, [data])

  const activeIndex = useMemo(
    () => allHouses.findIndex(obj => obj.id === selectedId),
    [selectedId, allHouses],
  )

  const activeObject = allHouses[activeIndex]

  const handleNext = () => {
    if (allHouses.length === 0) return
    const nextIndex = (activeIndex + 1) % allHouses.length
    setSelectedId(allHouses[nextIndex].id)
  }

  const handlePrev = () => {
    if (allHouses.length === 0) return
    const prevIndex = (activeIndex - 1 + allHouses.length) % allHouses.length
    setSelectedId(allHouses[prevIndex].id)
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

        {isLoading ? (
          <div className={styles.centerBox}>
            <Spin size="large" tip="Загрузка объектов..." />
          </div>
        ) : isError ? (
          <div className={styles.centerBox}>
            <p className={styles.errorText}>
              Не удалось загрузить данные галереи
            </p>
          </div>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={allHouses.length > 1 ? 1 : 0}
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
            {allHouses.map(obj => (
              <SwiperSlide
                key={obj.id}
                className={styles.slide}
                onClick={() => {
                  setSelectedId(obj.id)
                  setIsModalOpen(true)
                }}
              >
                <div className={styles.imageContainer}>
                  <img src={obj.images[0]} alt={obj.title} loading="lazy" />
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
        )}

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
                  {activeIndex + 1} / {allHouses.length}
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
                    <div className={styles.mainScrollContent}>
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
                            {activeObject.features.map((f, i) => (
                              <div key={i} className={styles.amenityItem}>
                                <LucideIcon name={f.icon} size={16} />
                                <span>{f.label}</span>
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
            </div>
          )}
        </Modal>
      </div>
    </MotionSection>
  )
}
