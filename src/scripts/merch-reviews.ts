const reviews = document.querySelector<HTMLElement>('[data-merch-reviews]');

if (reviews) {
  const tabs = [...reviews.querySelectorAll<HTMLButtonElement>('.review-tab')];
  const panels = [...reviews.querySelectorAll<HTMLElement>('.review-panel')];
  const stories = [...reviews.querySelectorAll<HTMLElement>('.review-story')];
  const marker = reviews.querySelector<HTMLElement>('[data-review-marker]')!;
  const dialog = reviews.querySelector<HTMLDialogElement>('[data-merch-review-dialog]')!;
  const dialogAuthor = dialog.querySelector('#merch-review-author')!;
  const dialogText = dialog.querySelector('[data-dialog-review-text]')!;
  let selected = 0;

  const moveMarker = () => {
    const tab = tabs[selected];
    const inset = 12;
    const height = Math.max(0, tab.offsetHeight - 2 * inset);
    marker.style.transform = `translateY(${tab.offsetTop + inset}px) scaleY(${height / 100})`;
  };

  const select = (index: number, animate: boolean) => {
    if (index === selected) return;
    reviews.toggleAttribute('data-review-motion', animate);
    tabs[selected].setAttribute('aria-selected', 'false');
    tabs[selected].tabIndex = -1;
    panels[selected].dataset.selected = 'false';
    panels[selected].setAttribute('aria-hidden', 'true');
    panels[selected].inert = true;

    selected = index;
    tabs[selected].setAttribute('aria-selected', 'true');
    tabs[selected].tabIndex = 0;
    panels[selected].inert = false;
    panels[selected].removeAttribute('aria-hidden');
    panels[selected].dataset.selected = 'true';
    moveMarker();
  };

  const observer = new ResizeObserver(moveMarker);
  tabs.forEach((tab, index) => {
    observer.observe(tab);
    tab.addEventListener('click', event => select(index, event.detail > 0));
    tab.addEventListener('keydown', event => {
      let next: number;
      switch (event.key) {
        case 'ArrowDown': next = (index + 1) % tabs.length; break;
        case 'ArrowUp': next = (index + tabs.length - 1) % tabs.length; break;
        case 'Home': next = 0; break;
        case 'End': next = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      select(next, false);
      tabs[next].focus();
    });
  });

  reviews.dataset.reviewTabsReady = '';
  moveMarker();

  for (const button of reviews.querySelectorAll<HTMLButtonElement>('[data-review-more]')) {
    button.addEventListener('click', () => {
      const story = stories[Number(button.dataset.reviewMore)];
      dialogAuthor.textContent = story.querySelector('.review-meta > span')!.textContent;
      dialogText.textContent = story.querySelector('.review-story-text p')!.textContent;
      dialog.showModal();
    });
  }

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}
