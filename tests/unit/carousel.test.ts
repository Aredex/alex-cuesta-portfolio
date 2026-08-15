import { describe, expect, it, vi } from 'vitest';
import {
  computeDimensions,
  getCounterText,
  getMaxIndex,
  getNextIndex,
  getSlideWidth,
  getSlidesPerView,
  initCapabilitiesCarousel,
} from '../../src/scripts/carousel';

describe('getSlidesPerView', () => {
  it('shows 3 slides at or above 1040px', () => {
    expect(getSlidesPerView(1440)).toBe(3);
    expect(getSlidesPerView(1040)).toBe(3);
  });

  it('shows 2 slides between 680px and 1039px', () => {
    expect(getSlidesPerView(1039)).toBe(2);
    expect(getSlidesPerView(680)).toBe(2);
  });

  it('shows 1 slide below 680px', () => {
    expect(getSlidesPerView(679)).toBe(1);
    expect(getSlidesPerView(320)).toBe(1);
  });
});

describe('getSlideWidth', () => {
  it('fills the viewport exactly with perView slides and their gaps', () => {
    // 3 slides, 2 gaps of 32px, in a 1000px viewport.
    expect(getSlideWidth(1000, 32, 3)).toBeCloseTo((1000 - 64) / 3);
  });

  it('equals the full viewport width when only one slide is visible', () => {
    expect(getSlideWidth(500, 32, 1)).toBe(500);
  });
});

describe('getMaxIndex', () => {
  it('is total slides minus slides per view', () => {
    expect(getMaxIndex(4, 3)).toBe(1);
    expect(getMaxIndex(4, 2)).toBe(2);
    expect(getMaxIndex(4, 1)).toBe(3);
  });

  it('never goes below 0, even if perView exceeds the slide count', () => {
    expect(getMaxIndex(4, 6)).toBe(0);
  });
});

describe('getNextIndex', () => {
  it('wraps to maxIndex when moving before 0', () => {
    expect(getNextIndex(0, -1, 1)).toBe(1);
  });

  it('wraps to 0 when moving past maxIndex', () => {
    expect(getNextIndex(1, 1, 1)).toBe(0);
  });

  it('moves normally within bounds', () => {
    expect(getNextIndex(0, 1, 2)).toBe(1);
    expect(getNextIndex(1, -1, 2)).toBe(0);
  });
});

describe('computeDimensions', () => {
  it('composes perView/slideWidth/maxIndex for a given viewport', () => {
    const dims = computeDimensions(1440, 32, 4);
    expect(dims.perView).toBe(3);
    expect(dims.slideWidth).toBeCloseTo((1440 - 64) / 3);
    expect(dims.maxIndex).toBe(1);
  });
});

describe('getCounterText', () => {
  it('formats CAPACIDAD {from}-{to} DE {total}', () => {
    expect(getCounterText(0, 3, 4)).toBe('CAPACIDAD 1–3 DE 4');
    expect(getCounterText(1, 3, 4)).toBe('CAPACIDAD 2–4 DE 4');
  });

  it('clamps "to" at the total slide count', () => {
    expect(getCounterText(3, 3, 4)).toBe('CAPACIDAD 4–4 DE 4');
  });
});

describe('initCapabilitiesCarousel', () => {
  it('keeps the native-scroll fallback when the required DOM contract is incomplete', () => {
    const root = {
      querySelector: () => null,
    } as unknown as HTMLElement;

    expect(() => initCapabilitiesCarousel(root)).not.toThrow();
  });

  it('lays out slides and responds to click, keyboard and resize events', () => {
    type Handler = (event: { key?: string; preventDefault?: () => void }) => void;
    const eventTarget = () => {
      const listeners = new Map<string, Handler[]>();
      return {
        listeners,
        addEventListener(type: string, handler: Handler) {
          listeners.set(type, [...(listeners.get(type) ?? []), handler]);
        },
        dispatch(type: string, event: Parameters<Handler>[0] = {}) {
          for (const handler of listeners.get(type) ?? []) handler(event);
        },
      };
    };

    const slides = Array.from({ length: 4 }, () => ({ style: { flex: '', maxWidth: '' } }));
    const trackEvents = eventTarget();
    const track = {
      ...trackEvents,
      style: { transform: '' },
      querySelectorAll: () => slides,
    };
    const viewport = {
      ...eventTarget(),
      clientWidth: 1000,
      classList: { add: vi.fn() },
    };
    const previous = eventTarget();
    const next = eventTarget();
    const counter = { textContent: '' };
    const rootEvents = eventTarget();
    const nodes = new Map<string, unknown>([
      ['[data-capabilities-viewport]', viewport],
      ['[data-capabilities-track]', track],
      ['[data-capabilities-prev]', previous],
      ['[data-capabilities-next]', next],
      ['[data-capabilities-counter]', counter],
    ]);
    const root = {
      ...rootEvents,
      querySelector: (selector: string) => nodes.get(selector) ?? null,
    } as unknown as HTMLElement;

    const windowEvents = eventTarget();
    vi.stubGlobal('window', {
      ...windowEvents,
      getComputedStyle: () => ({ columnGap: '32px' }),
      clearTimeout: vi.fn(),
      setTimeout: (callback: () => void) => {
        callback();
        return 1;
      },
    });

    initCapabilitiesCarousel(root);

    expect(viewport.classList.add).toHaveBeenCalledWith('is-active');
    expect(counter.textContent).toBe('CAPACIDAD 1–2 DE 4');
    expect(slides.every((slide) => slide.style.flex.startsWith('0 0 '))).toBe(true);

    next.dispatch('click');
    expect(counter.textContent).toBe('CAPACIDAD 2–3 DE 4');
    expect(track.style.transform).toContain('translateX(-');

    const preventDefault = vi.fn();
    rootEvents.dispatch('keydown', { key: 'ArrowLeft', preventDefault });
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(counter.textContent).toBe('CAPACIDAD 1–2 DE 4');

    previous.dispatch('click');
    expect(counter.textContent).toBe('CAPACIDAD 3–4 DE 4');

    viewport.clientWidth = 600;
    windowEvents.dispatch('resize');
    expect(counter.textContent).toBe('CAPACIDAD 3–3 DE 4');
    expect(slides[0].style.maxWidth).toBe('600px');

    vi.unstubAllGlobals();
  });
});
