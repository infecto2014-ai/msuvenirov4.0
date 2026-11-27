import { enableMouseDragScroll } from './mouse-drag-scroll';

const rail = document.querySelector<HTMLElement>('[data-showcase]');
const dialog = document.querySelector<HTMLDialogElement>('[data-product-dialog]');

if (rail && dialog) {
  const title = dialog.querySelector('h3')!;
  const description = dialog.querySelector('p')!;
  const image = dialog.querySelector('img')!;
  const details = dialog.querySelector('a')!;
  const order = dialog.querySelector<HTMLButtonElement>('[data-order-product]')!;
  let opener: HTMLAnchorElement | undefined;

  const wasDragged = enableMouseDragScroll(rail);

  rail.addEventListener('click', (event) => {
    if (wasDragged(event)) {
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
