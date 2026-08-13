/**
 * Scroll-triggered reveal for elements marked `data-reveal`.
 *
 * Production implementation of the prototype's reveal-on-scroll effect,
 * using IntersectionObserver instead of scroll listeners (the prototype used
 * scroll listeners only because of its design-tool sandbox).
 *
 * Content marked `data-reveal` is fully visible by default — the hidden
 * state (`opacity:0; translateY(16px)`) is applied only from this script via
 * the `.reveal-ready` class, so the page renders correctly with JS disabled
 * or before this script runs.
 *
 * This module does NOT run itself on import. Each page is responsible for
 * calling `initReveal()` once, e.g. from an inline `<script>` at the bottom
 * of the page:
 *
 *   <script>
 *     import { initReveal } from '../scripts/reveal';
 *     initReveal();
 *   </script>
 */

const REVEAL_SELECTOR = '[data-reveal]';
const READY_CLASS = 'reveal-ready';
const VISIBLE_CLASS = 'reveal-visible';

let styleInjected = false;

/** Injects the transition/hidden-state CSS once per page, JS-only. */
function ensureRevealStyles(): void {
  if (styleInjected) return;
  styleInjected = true;

  const style = document.createElement('style');
  style.textContent = `
    .${READY_CLASS} {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 560ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .${READY_CLASS}.${VISIBLE_CLASS} {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

/**
 * Arms IntersectionObserver-based reveal animations for every
 * `[data-reveal]` element currently in the document.
 *
 * No-op (leaves everything visible) when the user prefers reduced motion.
 */
export function initReveal(): void {
  if (typeof window === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (elements.length === 0) return;

  ensureRevealStyles();

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.classList.add(VISIBLE_CLASS);
        obs.unobserve(target);
      }
    },
    {
      threshold: 0,
      // Element is considered "entered" once it reaches ~92% of the
      // viewport height, approximated by trimming the bottom margin.
      rootMargin: '0px 0px -8% 0px',
    }
  );

  for (const el of elements) {
    const delay = el.dataset.revealDelay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    el.classList.add(READY_CLASS);
    observer.observe(el);
  }
}
