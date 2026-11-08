import { useLayoutEffect, useRef, useState } from 'react';

// Escala um conteúdo de tamanho fixo (w x h) para caber no espaço do pai, centralizado.
export function Fit({ w, h, max = Infinity, children, style }) {
  const ref = useRef(null);
  const [k, setK] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(() => setK(Math.min(max, el.clientWidth / w, el.clientHeight / h)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h, max]);
  return (
    <div ref={ref} style={{ position: 'relative', minHeight: 0, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <div style={{ width: w * k, height: h * k, position: 'relative', flex: 'none', visibility: k ? 'visible' : 'hidden' }}>
        <div style={{ position: 'relative', width: w, height: h, transform: `scale(${k})`, transformOrigin: '0 0' }}>{children}</div>
      </div>
    </div>
  );
}
