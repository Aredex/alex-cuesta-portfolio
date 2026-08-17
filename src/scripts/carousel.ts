/**
 * Capabilities carousel — production port of the prototype's
 * layoutCarousel/moveCarousel (handoff/design/Alex Cuesta - Home v2.dc.html,
 * lines 361-390).
 *
 * The sizing/index math is exported as small pure functions so it can be
 * unit tested without a DOM. `initCapabilitiesCarousel` is the only part
 * that touches the document, and it degrades to the viewport's native
 * horizontal scroll (see CapabilitiesCarousel.astro's CSS) if it never runs.
 */

export interface CarouselDimensions {
  perView: number;
  slideWidth: number;
  maxIndex: number;
}

const BREAKPOINT_LARGE = 1040;
const BREAKPOINT_MEDIUM = 680;
const RESIZE_DEBOUNCE_MS = 100;
const DEFAULT_GAP = 32;

/** 3 slides at ≥1040px viewport width, 2 at ≥680px, otherwise 1. */
export function getSlidesPerView(viewportWidth: number): number {
  if (viewportWidth >= BREAKPOINT_LARGE) return 3;
  if (viewportWidth >= BREAKPOINT_MEDIUM) return 2;
  return 1;
}

/** Slide width so `perView` slides plus `perView - 1` gaps exactly fill the viewport. */
export function getSlideWidth(viewportWidth: number, gap: number, perView: number): number {
  return (viewportWidth - gap * (perView - 1)) / perView;
}

/** Highest index that still leaves `perView` slides visible. */
export function getMaxIndex(totalSlides: number, perView: number): number {
  return Math.max(0, totalSlides - perView);
}

/** Circular navigation — wraps past either end instead of clamping. */
export function getNextIndex(current: number, direction: 1 | -1, maxIndex: number): number {
  const next = current + direction;
  if (next < 0) return maxIndex;
  if (next > maxIndex) return 0;
  return next;
}

export function computeDimensions(
  viewportWidth: number,
  gap: number,
  totalSlides: number
): CarouselDimensions {
  const perView = getSlidesPerView(viewportWidth);
  const slideWidth = getSlideWidth(viewportWidth, gap, perView);
  const maxIndex = getMaxIndex(totalSlides, perView);
  return { perView, slideWidth, maxIndex };
}

/** `CAPACIDAD {from}–{to} DE {total}` counter text. */
export function getCounterText(index: number, perView: number, total: number): string {
  const from = index + 1;
  const to = Math.min(total, index + perView);
  return `CAPACIDAD ${from}–${to} DE ${total}`;
}

function readGap(track: HTMLElement): number {
  const raw = window.getComputedStyle(track).columnGap;
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : DEFAULT_GAP;
}

/**
 * Wires a carousel's DOM: layout on mount + on resize (debounced), circular
 * prev/next buttons, and left/right arrow-key navigation while the carousel
 * (viewport or buttons) has focus. No autoplay.
 *
 * `root` must contain, as descendants: `[data-capabilities-viewport]`,
 * `[data-capabilities-track]` with one or more `[data-capabilities-slide]`
 * children, `[data-capabilities-prev]`, `[data-capabilities-next]` buttons
 * and a `[data-capabilities-counter]` text node host.
 */
export function initCapabilitiesCarousel(root: HTMLElement): void {
  const viewport = root.querySelector<HTMLElement>('[data-capabilities-viewport]');
  const track = root.querySelector<HTMLElement>('[data-capabilities-track]');
  const prevButton = root.querySelector<HTMLButtonElement>('[data-capabilities-prev]');
  const nextButton = root.querySelector<HTMLButtonElement>('[data-capabilities-next]');
  const counter = root.querySelector<HTMLElement>('[data-capabilities-counter]');
  const slides = track
    ? Array.from(track.querySelectorAll<HTMLElement>('[data-capabilities-slide]'))
    : [];

  if (!viewport || !track || !prevButton || !nextButton || !counter || slides.length === 0) {
    return;
  }

  let index = 0;
  let dimensions: CarouselDimensions = { perView: slides.length, slideWidth: 0, maxIndex: 0 };

  function render(gap: number): void {
    track!.style.transform = `translateX(${-index * (dimensions.slideWidth + gap)}px)`;
    counter!.textContent = getCounterText(index, dimensions.perView, slides.length);
  }

  function layout(): void {
    const gap = readGap(track!);
    dimensions = computeDimensions(viewport!.clientWidth, gap, slides.length);
    index = Math.min(index, dimensions.maxIndex);

    for (const slide of slides) {
      slide.style.flex = `0 0 ${dimensions.slideWidth}px`;
      slide.style.maxWidth = `${dimensions.slideWidth}px`;
    }

    render(gap);
  }

  function move(direction: 1 | -1): void {
    index = getNextIndex(index, direction, dimensions.maxIndex);
    render(readGap(track!));
  }

  prevButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));

  root.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  });

  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(layout, RESIZE_DEBOUNCE_MS);
  });

  layout();

  // Switch from the native horizontal-scroll fallback only after layout and
  // listeners are ready, then expose the same readiness boundary to tests.
  viewport.classList.add('is-active');
  prevButton.disabled = false;
  nextButton.disabled = false;
  root.dataset.carouselReady = 'true';
}
