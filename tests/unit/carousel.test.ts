import { describe, expect, it } from 'vitest';
import {
  computeDimensions,
  getCounterText,
  getMaxIndex,
  getNextIndex,
  getSlideWidth,
  getSlidesPerView,
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
