import tshirt from '@/assets/showcase/tshirt.png';
import mug from '@/assets/showcase/mug.png';
import shopper from '@/assets/showcase/shopper.png';
import badges from '@/assets/showcase/badges.png';
import hoodie from '@/assets/showcase/hoodie.png';
import cap from '@/assets/showcase/cap.png';
import sport from '@/assets/showcase/sport.png';
import pennant from '@/assets/showcase/pennant.png';
import stickers from '@/assets/showcase/stickers.png';
import workwear from '@/assets/showcase/workwear.png';

// Layout is x, y, width, height and tilt. Captions have their own x and y in the same units.
export const printShowcase = [
  {
    name: 'Печать на футболках',
    text: 'Нанесём рисунок, надпись или логотип. Можно выбрать футболку у нас или принести свою.',
    href: '/pechat-na-futbolkah', image: tshirt, layout: [1, 6, 49, 44, -7], caption: [12, 4],
  },
  {
    name: 'Печать на кружках',
    text: 'Печатаем фотографии, рисунки и надписи на кружках. Подберём модель под ваш макет.',
    href: '/pechat-na-kruzhkah', image: mug, layout: [44, 0, 25, 23, 2], caption: [54, -2.4],
  },
  {
    name: 'Печать на шопперах',
    text: 'Нанесём ваш дизайн на хлопковый шоппер, модель для сублимации или вашу сумку.',
    href: '/pechat-na-shopperah', image: shopper, layout: [61, 10, 36, 41, 8], caption: [79, 54.3],
  },
  {
    name: 'Печать на закатных значках',
    text: 'Закатные значки с вашим рисунком, логотипом или надписью.',
    href: '/znachki', image: badges, layout: [90, 1, 21, 20, -6], caption: [99, -0.8],
  },
  {
    name: 'Печать на худи',
    text: 'Наносим принты на худи. Можно добавить рисунок спереди, на спине или рукаве.',
    href: '/pechat-na-hudi', image: hoodie, layout: [102, 9, 42, 43, 5], caption: [122, 54.4],
  },
  {
    name: 'Печать на кепках',
    text: 'Печатаем логотипы, рисунки и надписи на бейсболках. Можно принести свою.',
    href: '/pechat-na-kepkah', image: cap, layout: [133, 0, 27, 18, -8], caption: [145, -2.4],
  },
  {
    name: 'Печать на спортивной форме',
    text: 'Нанесём фамилии, номера и эмблемы на форму для команды.',
    href: '/pechat-na-sportivnoy-forme', image: sport, layout: [146, 19, 33, 33, 5], caption: [154, 20],
  },
  {
    name: 'Печать на вымпелах',
    text: 'Вымпел с вашим рисунком или эмблемой.',
    href: '/vympely', image: pennant, layout: [161, 0, 23, 24, -8], caption: [171, -2.4],
  },
  {
    name: '3D-стикеры',
    text: 'Объёмные стикеры с вашим изображением. Можно сделать отдельную наклейку или набор.',
    href: '/nakleyki', image: stickers, layout: [178, 26, 24, 20, 7], caption: [184, 24.6],
  },
  {
    name: 'Печать на спецодежде',
    text: 'Нанесём логотип или надпись на рабочую одежду.',
    href: '/pechat-na-specodezhde', image: workwear, layout: [198, 5, 42, 44, -4], caption: [212, 8],
  },
] as const;
