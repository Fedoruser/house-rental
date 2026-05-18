export interface Feature {
  icon: string
  label: string
}

export interface House {
  id: number
  title: string
  category: HouseCategory
  area: string
  price: string
  capacity: string
  description: string
  images: string[]
  features: Feature[]
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: number
  name: string
  avatar: string
  houseType: string
  text: string
  rating: number
  isApproved: boolean
  createdAt: string
}

export interface CatalogApiResponse {
  catalog: Record<HouseCategory, House[]>
  allHouses: House[]
  reviews: Review[]
}

export interface CreateLeadDto {
  name: string
  phone: string
  message?: string
  source: 'hero_form' | 'contacts_form'
}

export interface LeadResponse {
  success: boolean
  data: {
    id: number
    name: string
    phone: string
    source: string
    status: string
    createdAt: string
  }
}

export type HouseCategory =
  | 'Скандинавский'
  | 'Барнхаус'
  | 'Хай-Тек'
  | 'Классика'
  | 'Шале'
  | 'Модульные дома'
