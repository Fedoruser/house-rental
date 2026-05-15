import { ScrollIndicator } from '@shared/ui/ScrollIndicator/ScrollIndicator'
import styles from './HomePage.module.scss'
import { CatalogSection } from './Sections/CatalogSection/CatalogSection'
import { ContactsSection } from './Sections/ContactsSection/ContactsSection'
import { GallerySection } from './Sections/GallerySection/GallerySection'
import { HeroSection } from './Sections/HeroSection/HeroSection'
import { ReviewsSection } from './Sections/ReviewsSection/ReviewsSection'

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <ScrollIndicator />
      <HeroSection />
      <GallerySection />
      <CatalogSection />
      <ReviewsSection />
      <ContactsSection />
    </div>
  )
}
