import { useEffect, useState } from 'react';
import type { MotionLevel, SiteSettings } from '../../content/types';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const revealSelector = [
  '.section-heading',
  '.about > *',
  '.practices > li',
  '.skills > *',
  '.strengths',
  '.certs > *',
  '.achievements > *',
  '.roles > *',
  '.work > *',
  '.duties > li',
  '.contact > *',
  '.stat',
].join(', ');

export const spotlightSelector = '.skill-card, .cert, .achievement, .stat, .role, .case, .fact-sheet, .pipeline';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches;

export const useEffectiveMotion = (requested: MotionLevel): MotionLevel => {
  const [reduced, setReduced] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia(reducedMotionQuery);
    const onChange = (event: MediaQueryListEvent): void => setReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced ? 'off' : requested;
};

export const useSiteAppearance = (settings: SiteSettings, motion: MotionLevel): void => {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.motion = motion;
  }, [settings.theme, motion]);
};

export const useReveal = (motion: MotionLevel, contentKey: string): void => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (motion === 'off') {
      targets.forEach((target) => target.classList.add('is-in'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    targets.forEach((target) => {
      const siblingIndex = target.parentElement ? Array.from(target.parentElement.children).indexOf(target) : 0;
      target.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 6) * 70}ms`);
      target.classList.add('reveal');
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [motion, contentKey]);
};

export const useSpotlight = (motion: MotionLevel): void => {
  useEffect(() => {
    if (motion !== 'full' || !window.matchMedia('(pointer: fine)').matches) {
      return undefined;
    }

    let frame = 0;

    const onMove = (event: PointerEvent): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const origin = event.target instanceof Element ? event.target : null;
        const card = origin?.closest<HTMLElement>(spotlightSelector);

        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);

        if (!card) {
          return;
        }

        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - box.left}px`);
        card.style.setProperty('--my', `${event.clientY - box.top}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [motion]);
};
