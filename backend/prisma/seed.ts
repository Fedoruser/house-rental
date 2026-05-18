import { prisma } from '../lib/prisma'; // Твой кастомный путь к клиенту

const CATS = {
  scandi: 'Скандинавский',
  barn: 'Барнхаус',
  hiTech: 'Хай-Тек',
  classic: 'Классика',
  chalet: 'Шале',
  modular: 'Модульные дома',
};

const HOUSES_MOCK = [
  // --- СКАНДИНАВСКИЙ СТИЛЬ ---
  {
    title: 'Осло 120',
    category: CATS.scandi,
    area: '120 м²',
    price: 'от 5.4 млн ₽',
    capacity: 'Срок: 3 мес.',
    description:
      'Энергоэффективный каркасный дом в классическом северном стиле. Пановое остекление, второй свет в гостиной и просторная терраса для уютных вечеров.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Layers', label: 'Каркас 200мм' },
      { icon: 'Sun', label: 'Второй свет' },
      { icon: 'Home', label: 'Фундамент: УШП' },
    ],
  },
  {
    title: 'Берген 150',
    category: CATS.scandi,
    area: '150 м²',
    price: 'от 6.8 млн ₽',
    capacity: 'Срок: 3.5 мес.',
    description:
      'Двухэтажный технологичный коттедж скандинавской философии. Просторная мастер-спальня, кабинет и встроенная сауна с выходом на задний двор.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Maximize2', label: '2 этажа' },
      { icon: 'Activity', label: 'Встроенная сауна' },
      { icon: 'Thermometer', label: 'Теплый пол по всей площади' },
    ],
  },
  {
    title: 'Стокгольм 90',
    category: CATS.scandi,
    area: '90 м²',
    price: 'от 4.2 млн ₽',
    capacity: 'Срок: 2.5 мес.',
    description:
      'Компактный загородный дом для круглогодичного проживания. Минимализм, строгая эргономика и максимум полезного пространства без лишних коридоров.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Layout', label: '3 спальни' },
      { icon: 'Zap', label: 'Скрытая проводка' },
    ],
  },
  {
    title: 'Хельсинки 180',
    category: CATS.scandi,
    area: '180 м²',
    price: 'от 8.5 млн ₽',
    capacity: 'Срок: 4 мес.',
    description:
      'Премиальная усадьба в финском стиле. Огромная терраса, окружающая дом, каминный зал, панорамные окна в пол и гараж под общей кровлей.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Compass', label: 'Панорама в пол' },
      { icon: 'Shield', label: 'Кровля: кликфальц Ruukki' },
    ],
  },

  // --- БАРНХАУСЫ ---
  {
    title: 'Barn-110',
    category: CATS.barn,
    area: '110 м²',
    price: 'от 4.9 млн ₽',
    capacity: 'Срок: 3 мес.',
    description:
      'Ультрамодный амбарный дом. Строгие линии фасада из графитового кликфальца комбинируются с натуральным планкеном из лиственницы.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Layers', label: 'Стиль Barnhouse' },
      { icon: 'CheckCircle', label: 'Лиственница класс Экстра' },
    ],
  },
  {
    title: 'Barn-Max 200',
    category: CATS.barn,
    area: '200 м²',
    price: 'от 9.1 млн ₽',
    capacity: 'Срок: 4.5 мес.',
    description:
      'Монументальный двухэтажный Барнхаус для большой семьи. Высота потолков в зоне гостиной достигает 6 метров. Огромный стеклянный торец фасада.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'ArrowUp', label: 'Потолки 6 метров' },
      { icon: 'Box', label: 'Антресольный этаж' },
    ],
  },
  {
    title: 'Barn-Mini 75',
    category: CATS.barn,
    area: '75 м²',
    price: 'от 3.6 млн ₽',
    capacity: 'Срок: 2 мес.',
    description:
      'Идеальный гостевой дом-студия или стильный вариант под посуточную сдачу в аренду. Быстровозводимый сухой силовой каркас.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Clock', label: 'Сборка за 45 дней' },
      { icon: 'Grid', label: 'Свободная планировка' },
    ],
  },
  {
    title: 'Лофт-Барн 140',
    category: CATS.barn,
    area: '140 м²',
    price: 'от 6.3 млн ₽',
    capacity: 'Срок: 3.5 мес.',
    description:
      'Смелое сочетание индустриального стиля лофт и загородной архитектуры. Скрытые желоба, черные матовые оконные профили, строгая геометрия.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Feather', label: 'Утепление эко-ватой' },
      { icon: 'Cpu', label: 'Пакет "Умный дом"' },
    ],
  },

  // --- ХАЙ-ТЕК ---
  {
    title: 'Кибер Сити 210',
    category: CATS.hiTech,
    area: '210 м²',
    price: 'от 12.4 млн ₽',
    capacity: 'Срок: 5 мес.',
    description:
      'Флагманская вилла с плоской эксплуатируемой кровлей. Железобетонный монолитный каркас, вентилируемый фасад из широкоформатного керамогранита.',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'TrendingUp', label: 'Эксплуатируемая крыша' },
      { icon: 'Shield', label: 'Монолитный ЖБ каркас' },
    ],
  },
  {
    title: 'Футуро 160',
    category: CATS.hiTech,
    area: '160 м²',
    price: 'от 9.8 млн ₽',
    capacity: 'Срок: 4 мес.',
    description:
      'Максимум остекления, минимум глухих стен. Энергосберегающие стеклопакеты со скрытым профилем и архитектурная подсветка фасада.',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Sun', label: 'i-стекла с напылением' },
      { icon: 'EyeOff', label: 'Скрытые ливневки' },
    ],
  },
  {
    title: 'Куб 130',
    category: CATS.hiTech,
    area: '130 м²',
    price: 'от 7.9 млн ₽',
    capacity: 'Срок: 3.5 мес.',
    description:
      'Минималистичный кубический дизайн. Комбинированная премиум отделка: силиконовая декоративная штукатурка и вставки из HPL-панелей под дерево.',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Box', label: 'Кубическая форма' },
      { icon: 'Droplet', label: 'Комплексный дренаж' },
    ],
  },
  {
    title: 'Нео-Вилла 300',
    category: CATS.hiTech,
    area: '300 м²',
    price: 'от 18.5 млн ₽',
    capacity: 'Срок: 7 мес.',
    description:
      'Умная премиум-вилла. Интегрированный теплый гараж на два автомобиля, огромная крытая лаунж-зона, система приточно-вытяжной вентиляции с рекуперацией.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Truck', label: 'Гараж на 2 авто' },
      { icon: 'Award', label: 'Рекуперация воздуха' },
    ],
  },

  // --- КЛАССИКА ---
  {
    title: 'Усадьба Классик',
    category: CATS.classic,
    area: '170 м²',
    price: 'от 8.9 млн ₽',
    capacity: 'Срок: 5 мес.',
    description:
      'Основательный дом из крупноформатного поризованного камня (керамоблок) с облицовкой бельгийским кирпичом ручной формовки.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Grid', label: 'Стены: Керамоблок' },
      { icon: 'Lock', label: 'Импортный кирпич' },
    ],
  },
  {
    title: 'Поместье 240',
    category: CATS.classic,
    area: '240 м²',
    price: 'от 13.2 млн ₽',
    capacity: 'Срок: 6 мес.',
    description:
      'Двухэтажный особняк со сложной вальмовой кровлей из гибкой черепицы Shinglas. Полноценный монолитный подвал под прачечную и тренажерный зал.',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Server', label: 'Цокольный этаж' },
      { icon: 'Home', label: 'Мягкая кровля' },
    ],
  },
  {
    title: 'Бавария 140',
    category: CATS.classic,
    area: '140 м²',
    price: 'от 7.4 млн ₽',
    capacity: 'Срок: 4 мес.',
    description:
      'Уютный одноэтажный дом. Облицован методом баварской кладки с контрастным швом. Функциональная планировка: кухня-гостиная 45м², 3 изолированные спальни.',
    images: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Menu', label: 'Баварская кладка' },
      { icon: 'Maximize', label: '1 этаж без лестниц' },
    ],
  },
  {
    title: 'Резиденция 350',
    category: CATS.classic,
    area: '350 м²',
    price: 'от 22.0 млн ₽',
    capacity: 'Срок: 8 мес.',
    description:
      'Элитный двухэтажный загородный дом. Высокие потолки (3.4м), строгая колоннада парадного входа, кованые ограждения балконов и панорамный эркер.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Award', label: 'Потолки 3.4м' },
      { icon: 'ShieldCheck', label: 'Плита перекрытия ЖБ' },
    ],
  },

  // --- ШАЛЕ ---
  {
    title: 'Альпы 160',
    category: CATS.chalet,
    area: '160 м²',
    price: 'от 8.2 млн ₽',
    capacity: 'Срок: 4.5 мес.',
    description:
      'Настоящее комбинированное шале: первый этаж возводится из прочных газобетонных блоков Ytong, второй — из премиального клееного бруса заводского производства.',
    images: [
      'https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Shuffle', label: 'Комбинированный тип' },
      { icon: 'GitCommit', label: 'Клееный брус' },
    ],
  },
  {
    title: 'Тироль 210',
    category: CATS.chalet,
    area: '210 м²',
    price: 'от 11.5 млн ₽',
    capacity: 'Срок: 5.5 мес.',
    description:
      'Шале с характерной пологой двухскатной кровлей и мощными выносами балок до 2.5 метров для защиты стен от косых дождей и снега. Огромный балкон.',
    images: [
      'https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'ChevronsDown', label: 'Большой вынос кровли' },
      { icon: 'Compass', label: 'Открытые потолочные балки' },
    ],
  },
  {
    title: 'Шале Люкс 130',
    category: CATS.chalet,
    area: '130 м²',
    price: 'от 6.9 млн ₽',
    capacity: 'Срок: 4 мес.',
    description:
      'Одноэтажный проект в стиле швейцарского шале. Цоколь отделан диким природным камнем, стены выполнены из профилированного бруса камерной сушки.',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Eye', label: 'Панорамный обзор' },
      { icon: 'Image', label: 'Отделка натуральным камнем' },
    ],
  },
  {
    title: 'Кортина 280',
    category: CATS.chalet,
    area: '280 м²',
    price: 'от 15.6 млн ₽',
    capacity: 'Срок: 6.5 мес.',
    description:
      'Просторный дом-шале, разработанный специально для рельефных участков с уклоном. Интегрированная веранда с зоной барбекю под общей крышей.',
    images: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'MapPin', label: 'Подходит для склонов' },
      { icon: 'Flame', label: 'Зона барбекю встроена' },
    ],
  },

  // --- МОДУЛЬНЫЕ ДОМА ---
  {
    title: 'Куб-Модуль 45',
    category: CATS.modular,
    area: '45 м²',
    price: 'от 2.3 млн ₽',
    capacity: 'Срок: 21 день',
    description:
      'Стильный мини-дом фабричного производства. Привозится на участок в виде готовых модулей со стопроцентной чистовой отделкой, сантехникой и электрикой.',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Clock', label: 'Заводская готовность 100%' },
      { icon: 'Zap', label: 'Сантехника внутри' },
    ],
  },
  {
    title: 'Сканди-Модуль 80',
    category: CATS.modular,
    area: '80 м²',
    price: 'от 3.9 млн ₽',
    capacity: 'Срок: 30 дней',
    description:
      'Современный модульный дом из двух блоков. Монтаж на свайно-винтовой фундамент за один рабочий день без строительного мусора на участке.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Activity', label: 'Монтаж за 1 день' },
      { icon: 'Check', label: 'Скандинавская минеральная вата' },
    ],
  },
  {
    title: 'Спейс-Модуль 60',
    category: CATS.modular,
    area: '60 м²',
    price: 'от 3.2 млн ₽',
    capacity: 'Срок: 25 дней',
    description:
      'Футуристичный жилой модуль с алюминиевым силовым каркасом и панорамным остеклением переднего контура. Отличное решение для загородного глэмпинга премиум уровня.',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Cpu', label: 'Алюминиевый каркас' },
      { icon: 'Sun', label: 'Панорамный обзор фасада' },
    ],
  },
  {
    title: 'Фэмили-Модуль 110',
    category: CATS.modular,
    area: '110 м²',
    price: 'от 5.1 млн ₽',
    capacity: 'Срок: 40 дней',
    description:
      'Полноразмерный модульный дом для большой семьи, состоящий из трех стыкуемых секций. Скрытый крепеж модулей, бесшовная стыковка гидроизоляции.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      { icon: 'Maximize2', label: '3 готовых модуля' },
      { icon: 'Shield', label: 'Бесшовная гидроизоляция' },
    ],
  },
];

const REVIEWS_MOCK = [
  {
    name: 'Александр и Елена Кравцовы',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    houseType: 'Построен дом «Осло 120»',
    text: 'Ребята построили нам Скандинавский дом за 3 месяца, как и обещали в договоре! Бригада работала автономно, технадзор приезжал каждые 2 недели и присылал отчеты в Telegram. Качество сборки каркаса — монолит! Зимой дом держит тепло потрясающе, расходы на отопление минимальные.',
    rating: 5,
  },
  {
    name: 'Михаил Воронов',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    houseType: 'Построен дом «Barn-110»',
    text: 'Давно мечтал о Барнхаусе. Выбрал проект Barn-110. Сделали крутую комбинацию металла и лиственницы на фасаде. Все узлы примыкания кровли к стенам выполнены идеально, протечек нет (пережили уже 3 сильных ливня). Рекомендую компанию как профи.',
    rating: 5,
  },
  {
    name: 'Семья Савельевых',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    houseType: 'Построен дом «Бавария 140»',
    text: 'Строили классический кирпичный дом. Очень порадовало, что смета в процессе строительства не выросла ни на рубль — все зафиксировано изначально. Каменщики с золотыми руками, баварская кладка выглядит очень дорого, соседи ходят смотреть как на экскурсию.',
    rating: 5,
  },
  {
    name: 'Дмитрий К.',
    avatar:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    houseType: 'Построен дом «Кибер Сити 210»',
    text: 'Заказывал проект в стиле Хай-Тек со сложной плоской кровлей. Переживал за гидроизоляцию, но строители использовали мембрану премиум-класса с гарантией 25 лет. Эксплуатируемая крыша летом стала любимым местом для тусовок и загара. Инженерия на высшем уровне.',
    rating: 5,
  },
  {
    name: 'Игорь и Ольга Титовы',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    houseType: 'Построен дом «Альпы 160»',
    text: 'Шале — это любовь. Первый каменный этаж дает ощущение крепости, а второй этаж из бруса пахнет сосной. Запах в спальнях невероятный! Сроки немного сдвинулись на неделю из-за задержки поставки бруса с завода, но компания сделала за это приятную скидку на монтаж камина.',
    rating: 4,
  },
];

async function main() {
  console.log('🧹 Очистка старых данных (Feature, House, Review)...');
  await prisma.feature.deleteMany({});
  await prisma.house.deleteMany({});
  await prisma.review.deleteMany({});

  console.log(
    '🏗 Наполнение базы данных домами и характеристиками (24 объекта)...',
  );
  for (const houseData of HOUSES_MOCK) {
    const { features, ...houseFields } = houseData;
    await prisma.house.create({
      data: {
        ...houseFields,
        features: {
          create: features,
        },
      },
    });
  }

  console.log('💬 Заполнение базы сочными отзывами клиентов...');
  for (const reviewData of REVIEWS_MOCK) {
    await prisma.review.create({
      data: reviewData,
    });
  }

  console.log('🚀 База данных успешно заполнена продовыми данными!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка сидирования:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
