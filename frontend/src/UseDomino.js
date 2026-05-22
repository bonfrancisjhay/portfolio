import { useEffect, useRef } from 'react';

export function useDomino(index = 0, delay = 120) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden and shifted down
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'none';

    const timer = setTimeout(() => {
      el.style.transition =
        `opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * delay);

    return () => clearTimeout(timer);
  }, [index, delay]);

  return ref;
}