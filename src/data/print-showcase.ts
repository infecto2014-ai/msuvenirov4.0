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

export const printShowcase = [
  {
    name: 'Печать на футболках',
    text: 'Нанесём рисунок, надпись или логотип. Можно выбрать футболку у нас или принести свою.',
    href: '/pechat-na-futbolkah', image: tshirt, size: 'large', position: 'low',
  },
  {
    name: 'Печать на кружках',
    text: 'Печатаем фотографии, рисунки и надписи на кружках. Подберём модель под ваш макет.',
    href: '/pechat-na-kruzhkah', image: mug, size: 'small', position: 'high',
  },
  {
    name: 'Печать на шопперах',
    text: 'Нанесём ваш дизайн на хлопковый шоппер, модель для сублимации или вашу сумку.',
    href: '/pechat-na-shopperah', image: shopper, size: 'medium', position: 'middle',
  },
  {
    name: 'Печать на закатных значках',
    text: 'Закатные значки с вашим рисунком, логотипом или надписью.',
    href: '/znachki', image: badges, size: 'small', position: 'high',
  },
  {
    name: 'Печать на худи',
    text: 'Наносим принты на худи. Можно добавить рисунок спереди, на спине или рукаве.',
    href: '/pechat-na-hudi', image: hoodie, size: 'large', position: 'low',
  },
  {
    name: 'Печать на кепках',
    text: 'Печатаем логотипы, рисунки и надписи на бейсболках. Можно принести свою.',
    href: '/pechat-na-kepkah', image: cap, size: 'small', position: 'middle',
  },
  {
    name: 'Печать на спортивной форме',
    text: 'Нанесём фамилии, номера и эмблемы на форму для команды.',
    href: '/pechat-na-sportivnoy-forme', image: sport, size: 'medium', position: 'low',
  },
  {
    name: 'Печать на вымпелах',
    text: 'Вымпел с вашим рисунком или эмблемой.',
    href: '/vympely', image: pennant, size: 'small', position: 'high',
  },
  {
    name: '3D-стикеры',
    text: 'Объёмные стикеры с вашим изображением. Можно сделать отдельную наклейку или набор.',
    href: '/nakleyki', image: stickers, size: 'small', position: 'low',
  },
  {
    name: 'Печать на спецодежде',
    text: 'Нанесём логотип или надпись на рабочую одежду.',
    href: '/pechat-na-specodezhde', image: workwear, size: 'large', position: 'middle',
  },
] as const;
