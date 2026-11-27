const reviews = document.querySelector<HTMLElement>('[data-merch-reviews]');
const dialog = reviews?.querySelector<HTMLDialogElement>('[data-merch-review-dialog]');

if (reviews && dialog && typeof dialog.showModal === 'function') {
  const dialogText = dialog.querySelector('[data-dialog-review-text]')!;
  const dialogAuthor = dialog.querySelector('#merch-review-author')!;
  const dialogMeta = dialog.querySelector('[data-dialog-review-meta]')!;
  const cards = [...reviews.querySelectorAll<HTMLElement>('[data-review-card]')];
  const previews = cards.map(card => ({
    text: card.querySelector<HTMLElement>('[data-review-text]')!,
    more: card.querySelector<HTMLElement>('[data-review-more]')!,
  }));

  const updatePreviews = () => {
    for (const { text, more } of previews) {
      more.hidden = text.scrollHeight <= text.parentElement!.clientHeight + 1;
    }
  };
  new ResizeObserver(updatePreviews).observe(reviews);
  document.fonts.ready.then(updatePreviews);

  reviews.addEventListener('click', event => {
    const link = (event.target as Element).closest<HTMLElement>('[data-review-more]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const card = link.closest('[data-review-card]')!;
    dialogText.textContent = card.querySelector('[data-review-text]')!.textContent;
    dialogAuthor.textContent = card.querySelector('[data-review-name]')!.textContent;
    dialogMeta.textContent = card.querySelector('[data-review-meta]')!.textContent;
    link.focus({ preventScroll: true });
    dialog.showModal();
  });

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}
