import {
  Trees,
  Droplets,
  Users,
  Car,
  Wifi,
  Flame,
  Wind,
  Coffee,
  Maximize2,
} from 'lucide-react'
import React from 'react'

export interface HouseFeature {
  icon: React.ReactNode
  label: string
}

export type HouseCategory =
  | 'Все'
  | 'С бассейном'
  | 'У леса'
  | 'Для двоих'
  | 'Большие компании'
  | 'A-Frame'

export interface House {
  id: number
  title: string
  category: Exclude<HouseCategory, 'Все'>
  price: string
  priceValue: number
  area: string
  capacity: string
  images: string[]
  features: HouseFeature[]
  description: string
}

export const CATALOG_CATEGORIES: HouseCategory[] = [
  'Все',
  'A-Frame',
  'С бассейном',
  'Для двоих',
  'У леса',
  'Большие компании',
]

export const ALL_HOUSES: House[] = [
  {
    id: 1,
    title: 'Modern Villa',
    category: 'С бассейном',
    area: '120м²',
    price: '15 000 ₽',
    priceValue: 15000,
    capacity: '6 гостей',
    images: ['/house/1.webp', '/house/2.webp', '/house/3.webp'],
    description:
      'Ультрасовременная вилла с панорамными окнами и собственной террасой. Пространство спроектировано так, чтобы объединить уют домашнего очага с передовыми технологиями комфорта.',
    features: [
      { icon: <Wifi size={18} />, label: 'Wi-Fi 6' },
      { icon: <Droplets size={18} />, label: 'Бассейн' },
      { icon: <Trees size={18} />, label: 'Вид на лес' },
      { icon: <Car size={18} />, label: 'Парковка' },
    ],
  },
  {
    id: 2,
    title: 'A-Frame Forest',
    category: 'A-Frame',
    area: '65 м²',
    price: '12 000 ₽',
    priceValue: 12000,
    capacity: '4 гостя',
    images: [
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1200',
    ],
    description:
      'Уютный домик-шалаш с панорамным видом на сосновый бор. Идеальное место для тех, кто хочет сбежать от городской суеты.',
    features: [
      { icon: <Trees size={18} />, label: 'В лесу' },
      { icon: <Flame size={18} />, label: 'Костровая зона' },
      { icon: <Wifi size={18} />, label: 'Wi-Fi' },
    ],
  },
  {
    id: 3,
    title: 'Scandi Duo',
    category: 'Для двоих',
    area: '40 м²',
    price: '9 500 ₽',
    priceValue: 9500,
    capacity: '2 гостя',
    images: [
      'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?q=80&w=1200',
      'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?q=80&w=1200',
    ],
    description:
      'Компактный скандинавский домик, созданный специально для романтических выходных.',
    features: [
      { icon: <Coffee size={18} />, label: 'Завтрак включен' },
      { icon: <Users size={18} />, label: 'Приватность' },
    ],
  },
  {
    id: 4,
    title: 'Sky Pool Villa',
    category: 'С бассейном',
    area: '120 м²',
    price: '25 000 ₽',
    priceValue: 25000,
    capacity: '6 гостей',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200',
    ],
    description:
      'Современная вилла с открытым подогреваемым бассейном. Панорамное остекление и минималистичный дизайн.',
    features: [
      { icon: <Droplets size={18} />, label: 'Теплый бассейн' },
      { icon: <Wind size={18} />, label: 'Кондиционер' },
      { icon: <Car size={18} />, label: 'Парковка' },
    ],
  },
  {
    id: 5,
    title: 'Family Mansion',
    category: 'Большие компании',
    area: '250 м²',
    price: '35 000 ₽',
    priceValue: 35000,
    capacity: '12 гостей',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200',
      'https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=1200',
    ],
    description:
      'Огромный коттедж для семейных праздников или корпоративных выездов. Большая кухня-гостиная и зона барбекю.',
    features: [
      { icon: <Users size={18} />, label: 'Много спален' },
      { icon: <Flame size={18} />, label: 'Большая веранда' },
      { icon: <Car size={18} />, label: 'Парковка' },
    ],
  },
  {
    id: 6,
    title: 'Hidden Lake A-Frame',
    category: 'A-Frame',
    area: '75 м²',
    price: '14 500 ₽',
    priceValue: 14500,
    capacity: '4 гостя',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200',
      'https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1200',
    ],
    description:
      'Стильный дом-треугольник на первой линии озера. Собственный пирс и лодка включены в стоимость.',
    features: [
      { icon: <Droplets size={18} />, label: 'У озера' },
      { icon: <Trees size={18} />, label: 'Лес' },
      { icon: <Wifi size={18} />, label: 'Wi-Fi' },
    ],
  },
]
