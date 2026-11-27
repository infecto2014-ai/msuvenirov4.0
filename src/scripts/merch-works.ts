import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const section = document.querySelector<HTMLElement>('[data-merch-works]');
const stage = section?.querySelector<HTMLElement>('[data-works-stage]');
const rail = section?.querySelector<HTMLElement>('[data-merch-works-rail]');
const controls = section?.querySelector<HTMLElement>('[data-works-controls]');
const dialog = section?.querySelector<HTMLDialogElement>('[data-merch-work-dialog]');

if (stage && rail && controls && dialog) {
  const links = [...rail.querySelectorAll<HTMLAnchorElement>('.work-photo')];
  const enlarged = dialog.querySelector('img')!;
  const caption = dialog.querySelector('figcaption')!;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const step = 360 / links.length;
  const spin = { angle: 0 };
  let active = 0;
  let drag: { id: number; x: number; y: number; angle: number } | undefined;
  let dragged = false;

  function renderTurn() {
    rail!.style.setProperty('--turn', `${spin.angle}deg`);
  }

  function activate(index: number) {
    const front = (index % links.length + links.length) % links.length;
    links.forEach((link, i) => {
      link.tabIndex = i === front ? 0 : -1;
      if (i === front) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    if (rail!.contains(document.activeElement)) links[front].focus({ preventScroll: true });
  }

  function turnTo(index: number) {
    active = index;
    activate(index);
    gsap.killTweensOf(spin);
    gsap.to(spin, {
      angle: -index * step,
      duration: reducedMotion.matches ? 0 : 0.46,
      ease: 'power3.out',
      onUpdate: renderTurn,
    });
  }

  stage.dataset.circular = '';
  controls.hidden = false;
  activate(0);

  controls.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-work-step]');
    if (button) turnTo(active + Number(button.dataset.workStep));
  });

  stage.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    turnTo(active + (event.key === 'ArrowRight' ? 1 : -1));
  });

  stage.addEventListener('dragstart', (event) => event.preventDefault());

  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    dragged = false;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: spin.angle };
  });

  stage.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!dragged) {
      if (Math.abs(distance) < 8 || Math.abs(distance) < Math.abs(event.clientY - drag.y)) return;
      gsap.killTweensOf(spin);
      drag.angle = spin.angle;
      dragged = true;
      stage.setPointerCapture(event.pointerId);
      stage.dataset.dragging = '';
    }
    spin.angle = drag.angle + distance / Math.min(stage.clientWidth, 800) * 210;
    renderTurn();
  });

  function finishDrag(event: PointerEvent) {
    if (!drag || drag.id !== event.pointerId) return;
    if (dragged) {
      const distance = event.clientX - drag.x;
      const origin = Math.round(-drag.angle / step);
      const nearest = Math.round(-spin.angle / step);
      const destination = event.type === 'pointerup' && Math.abs(distance) >= 24 && nearest === origin
        ? origin - Math.sign(distance)
        : nearest;
      turnTo(destination);
    }
    drag = undefined;
    delete stage!.dataset.dragging;
  }

  stage.addEventListener('pointerup', finishDrag);
  stage.addEventListener('pointercancel', finishDrag);
  stage.addEventListener('lostpointercapture', (event) => {
    // Touch initially captures on the photo, then the stage takes over.
    if (event.target === stage) finishDrag(event);
  });
  stage.addEventListener('pointerleave', (event) => {
    if (!dragged) finishDrag(event);
  });

  stage.addEventListener('click', (event) => {
    if (dragged && event.detail !== 0) {
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
    caption.textContent = photo.alt;

    link.focus({ preventScroll: true });
    dialog.showModal();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from(links, {
      opacity: 0,
      duration: 0.55,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: { trigger: stage, start: 'clamp(top 89%)', once: true },
    });

    gsap.fromTo(rail, { '--scroll-turn': '-6deg' }, {
      '--scroll-turn': '6deg',
      ease: 'none',
      scrollTrigger: {
        trigger: stage,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: 0.45,
      },
    });
  });
}
