import { useSyncExternalStore } from 'react';

// Desktop = tela larga (>= 900px). Abaixo disso o app usa o layout mobile.
const mq = window.matchMedia('(min-width: 900px)');
const assinar = cb => { mq.addEventListener('change', cb); return () => mq.removeEventListener('change', cb); };

export function useDesktop() {
  return useSyncExternalStore(assinar, () => mq.matches);
}
