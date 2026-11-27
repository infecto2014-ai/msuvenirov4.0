const rail = document.querySelector<HTMLElement>('[data-showcase]');
const dialog = document.querySelector<HTMLDialogElement>('[data-product-dialog]');

if (rail && dialog) {
  const title = dialog.querySelector('h3')!;
  const description = dialog.querySelector('p')!;
  const image = dialog.querySelector('img')!;
  const details = dialog.querySelector('a')!;
  const order = dialog.querySelector<HTMLButtonElement>('[data-order-product]')!;
  let opener: HTMLAnchorElement | undefined;

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
    delete rail?.dataset.dragging;
  }

  rail.addEventListener('pointerup', release);
  rail.addEventListener('pointercancel', release);
  rail.addEventListener('lostpointercapture', release);
  rail.addEventListener('pointerleave', (event) => {
    if (!dragged) release(event);
  });

  rail.addEventListener('click', (event) => {
    if (dragged && event.detail !== 0) {
      event.preventDefault();
      return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-description]');
    if (!link || typeof dialog.showModal !== 'function') return;
    event.preventDefault();

    const label = link.getAttribute('aria-label') ?? '';
    const productImage = link.querySelector('img')!;
    title.textContent = label;
    description.textContent = link.dataset.description ?? '';
    image.src = productImage.currentSrc || productImage.src;
    details.href = link.href;
    order.dataset.orderProduct = label;
    opener = link;
    link.focus({ preventScroll: true });
    dialog.showModal();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  order.addEventListener('click', () => {
    dialog.close();
    opener?.focus({ preventScroll: true });
  });
}
