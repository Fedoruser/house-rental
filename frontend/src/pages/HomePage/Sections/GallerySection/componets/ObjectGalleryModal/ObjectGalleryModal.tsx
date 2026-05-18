// import { useState, useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Thumbs, FreeMode, Navigation } from 'swiper/modules'
// import { type Swiper as SwiperType } from 'swiper'
// import styles from './GallerySection.module.scss'

// interface Props {
//   object: any // Замени на свой интерфейс
// }

// export const ObjectGalleryContent = ({ object }: Props) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

//   // Принудительная очистка при размонтировании
//   useEffect(() => {
//     return () => {
//       if (thumbsSwiper && !thumbsSwiper.destroyed) {
//         thumbsSwiper.destroy()
//       }
//     }
//   }, [thumbsSwiper])

//   return (
//     <div className={styles.galleryBlock}>
//       {/* Главный слайдер */}
//       <Swiper
//         spaceBetween={10}
//         navigation={true}
//         thumbs={{
//           swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//         }}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className={styles.bigImage}
//       >
//         {object.images.map((img: string, idx: number) => (
//           <SwiperSlide key={`main-${idx}`}>
//             <img src={img} alt="Object view" loading="lazy" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Слайдер миниатюр */}
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className={styles.thumbs}
//       >
//         {object.images.map((img: string, idx: number) => (
//           <SwiperSlide key={`thumb-${idx}`} className={styles.thumbSlide}>
//             <img src={img} alt="Thumbnail" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   )
// }
