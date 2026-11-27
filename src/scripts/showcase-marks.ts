import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const rail = document.querySelector<HTMLElement>('[data-showcase]');

if (rail) {
  gsap.registerPlugin(ScrollTrigger);

  const marks = rail.querySelectorAll<HTMLElement>('[data-print-mark]');
  const strokes = rail.querySelectorAll<HTMLElement>('[data-print-mark] > span');
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(strokes, {
      opacity: 0,
      scale: 0.82,
      duration: 0.48,
      ease: 'power2.out',
      stagger: 0.045,
      scrollTrigger: { trigger: rail, start: 'clamp(top 90%)', once: true },
    });

    gsap.fromTo(marks, { y: 0 }, {
      y: (index) => 10 + (index % 3) * 7,
      ease: 'none',
      scrollTrigger: {
        trigger: rail,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: 0.45,
      },
    });

    gsap.fromTo(marks, { x: 0 }, {
      x: (index) => 24 + (index % 3) * 10,
      ease: 'none',
      scrollTrigger: { scroller: rail, horizontal: true, start: 0, end: 'max', scrub: 0.4 },
    });
  });
}
