import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const rail = document.querySelector<HTMLElement>('[data-showcase]');

if (rail) {
  gsap.registerPlugin(ScrollTrigger);

  const marks = rail.querySelectorAll<HTMLElement>('[data-print-mark]');
  const strokes = rail.querySelectorAll<HTMLElement>('[data-print-mark] > span');
  const pieces = rail.querySelectorAll<HTMLElement>('.piece');
  const links = rail.querySelectorAll<HTMLAnchorElement>('.piece-link');
  const layers = [...marks, ...pieces];
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', (context) => {
    gsap.from(strokes, {
      opacity: 0,
      scale: 0.82,
      duration: 0.48,
      ease: 'power2.out',
      stagger: 0.045,
      scrollTrigger: { trigger: rail, start: 'clamp(top 90%)', once: true },
    });

    gsap.fromTo(layers, { y: 0 }, {
      y: (index) => index < marks.length ? 10 + (index % 3) * 7 : 4 + (index % 3) * 4,
      ease: 'none',
      scrollTrigger: {
        trigger: rail,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: 0.45,
      },
    });

    gsap.fromTo(layers, { x: 0 }, {
      x: (index) => index < marks.length ? 24 + (index % 3) * 10 : 6 + (index % 3) * 5,
      ease: 'none',
      scrollTrigger: { scroller: rail, horizontal: true, start: 0, end: 'max', scrub: 0.4 },
    });

    gsap.set(links, { opacity: 0, y: 18 });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        context.add(() => {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.56,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          });
        });
      }
    }, { threshold: 0.14 });

    for (const link of links) observer.observe(link);
    return () => observer.disconnect();
  });
}
