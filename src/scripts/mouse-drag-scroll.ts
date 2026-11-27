export function enableMouseDragScroll(rail: HTMLElement) {
  let pointer: { id: number; x: number; scroll: number } | undefined;
  let dragged = false;

  rail.addEventListener('dragstart', (event) => event.preventDefault());

  rail.addEventListener('pointerdown', (event) => {
    dragged = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, scroll: rail.scrollLeft };
  });

  rail.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const distance = event.clientX - pointer.x;
    if (!dragged && Math.abs(distance) < 6) return;
    if (!dragged) {
      dragged = true;
      rail.setPointerCapture(event.pointerId);
      rail.dataset.dragging = '';
    }
    rail.scrollLeft = pointer.scroll - distance;
  });

  function release(event: PointerEvent) {
    if (pointer?.id !== event.pointerId) return;
    pointer = undefined;
    delete rail.dataset.dragging;
  }

  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', release);
  rail.addEventListener('pointerleave', (event) => {
    if (!dragged) release(event);
  });

  return (event: MouseEvent) => dragged && event.detail !== 0;
}
