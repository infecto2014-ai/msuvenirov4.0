const reviews = document.querySelector<HTMLElement>('[data-merch-reviews]');
const track = reviews?.querySelector<HTMLElement>('[data-review-track]');
const previous = reviews?.querySelector<HTMLButtonElement>('[data-review-prev]');
const next = reviews?.querySelector<HTMLButtonElement>('[data-review-next]');
const playback = reviews?.querySelector<HTMLButtonElement>('[data-review-play]');
const dialog = reviews?.querySelector<HTMLDialogElement>('[data-merch-review-dialog]');

if (reviews && track && previous && next && playback && dialog) {
  const cards = [...track.querySelectorAll<HTMLElement>('[data-review-card]')];
  const compact = matchMedia('(max-width: 42rem)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dialogText = dialog.querySelector('[data-dialog-review-text]')!;
  const dialogAuthor = dialog.querySelector('#merch-review-author')!;
  const dialogMeta = dialog.querySelector('[data-dialog-review-meta]')!;
  const dialogSource = dialog.querySelector<HTMLAnchorElement>('[data-dialog-review-source]')!;
  let playing = !reduced.matches;
  let visible = false;
  let timer: number | undefined;
  let targetPage: number | undefined;

  const updatePlayback = () => {
    playback.hidden = reduced.matches;
    playback.textContent = playing ? 'Приостановить' : 'Продолжить листание';
    window.clearTimeout(timer);
    const focused = document.activeElement !== playback && reviews.contains(document.activeElement);
    if (playing && visible && !document.hidden && !track.matches(':hover') && !focused && !dialog.open) {
      timer = window.setTimeout(() => move(1), 5000);
    }
  };

  const stop = () => {
    playing = false;
    updatePlayback();
  };

  const move = (direction: number) => {
    const perPage = compact.matches ? 1 : 2;
    const stride = cards[1].offsetLeft - cards[0].offsetLeft;
    const pageCount = Math.ceil(cards.length / perPage);
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const current = targetPage ?? (atEnd ? pageCount - 1 : Math.round(track.scrollLeft / (stride * perPage)));
    targetPage = (current + direction + pageCount) % pageCount;
    track.scrollTo({ left: targetPage * stride * perPage, behavior: reduced.matches ? 'instant' : 'smooth' });
    updatePlayback();
  };

  previous.hidden = false;
  next.hidden = false;
  previous.addEventListener('click', () => { stop(); move(-1); });
  next.addEventListener('click', () => { stop(); move(1); });
  playback.addEventListener('click', () => {
    playing = !playing;
    updatePlayback();
  });
  track.addEventListener('scrollend', () => { targetPage = undefined; });
  track.addEventListener('pointerdown', () => { targetPage = undefined; stop(); });
  track.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      targetPage = undefined;
      stop();
    }
  }, { passive: true });
  track.addEventListener('pointerenter', updatePlayback);
  track.addEventListener('pointerleave', () => window.requestAnimationFrame(updatePlayback));
  reviews.addEventListener('focusin', updatePlayback);
  reviews.addEventListener('focusout', () => window.requestAnimationFrame(updatePlayback));
  document.addEventListener('visibilitychange', updatePlayback);
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else updatePlayback(); });
  compact.addEventListener('change', () => { targetPage = undefined; });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.28;
    updatePlayback();
  }, { threshold: 0.28 }).observe(track);
  updatePlayback();

  const previews = cards.map(card => ({
    text: card.querySelector<HTMLElement>('[data-review-text]')!,
    more: card.querySelector<HTMLElement>('[data-review-more]')!,
  }));
  const updatePreviews = () => {
    for (const { text, more } of previews) {
      more.hidden = text.scrollHeight <= text.parentElement!.clientHeight + 1;
    }
  };
  new ResizeObserver(updatePreviews).observe(track);
  document.fonts.ready.then(updatePreviews);

  track.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLElement>('[data-review-more]');
    if (!link || typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const card = cards[Number(link.dataset.reviewMore)];
    const source = card.querySelector<HTMLAnchorElement>('[data-review-source]');
    dialogText.textContent = card.querySelector('[data-review-text]')!.textContent;
    dialogAuthor.textContent = card.querySelector('[data-review-name]')!.textContent;
    dialogMeta.textContent = card.querySelector('[data-review-meta]')!.textContent;
    dialogSource.hidden = !source;
    if (source) dialogSource.href = source.href;
    link.focus({ preventScroll: true });
    dialog.showModal();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}
