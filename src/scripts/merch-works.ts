import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enableMouseDragScroll } from './mouse-drag-scroll';

const section = document.querySelector<HTMLElement>('[data-merch-works]');
const rail = section?.querySelector<HTMLElement>('[data-merch-works-rail]');
const dialog = section?.querySelector<HTMLDialogElement>('[data-merch-work-dialog]');

if (section && rail && dialog) {
  const enlarged = dialog.querySelector('img')!;
  const caption = dialog.querySelector('figcaption')!;
  const wasDragged = enableMouseDragScroll(rail);

  rail.addEventListener('click', (event) => {
    if (wasDragged(event)) {
      event.preventDefault();
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element).closest<HTMLAnchorElement>('.work-photo');
    if (!link || typeof dialog.showModal !== 'function') return;
    event.preventDefault();

    const photo = link.querySelector('img')!;
    enlarged.src = link.href;
    enlarged.alt = photo.alt;
    caption.textContent = link.nextElementSibling?.textContent ?? '';

    link.focus({ preventScroll: true });
    dialog.showModal();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(rail.querySelectorAll('.work-photo'), {
      opacity: 0,
      duration: 0.55,
      stagger: 0.075,
      ease: 'power2.out',
      scrollTrigger: { trigger: rail, start: 'clamp(top 89%)', once: true },
    });

    gsap.fromTo(rail.querySelectorAll('.work-photo img'), { y: -10 }, {
      y: (index) => index % 2 === 0 ? 12 : 6,
      ease: 'none',
      scrollTrigger: {
        trigger: rail,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: 0.45,
      },
    });
  });
}
