// Peças usadas tanto no layout mobile quanto no desktop.
import { ARQS, EXEMPLO, FORMATOS, montaDados } from './data.js';
import { FinalRetro } from './FinalRetro.jsx';
import { Icon, IC } from './Icon.jsx';
import { s } from './css.js';

export const N = FORMATOS.length;
export const EX = { d: montaDados(EXEMPLO, ARQS.p), arq: ARQS.p };
export const KICKER = s('font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase');

// Card de exemplo inclinado (leque da entrada).
export function Mini({ formato, left, top, w, k, rot, sombra = 'var(--shadow-md)' }) {
  return (
    <div style={{ position: 'absolute', left, top, width: w, height: Math.round(640 * k), borderRadius: w > 140 ? 10 : 9, overflow: 'hidden', transform: `rotate(${rot}deg)`, boxShadow: sombra }}>
      <div style={{ width: 360, height: 640, transform: `scale(${k})`, transformOrigin: '0 0' }}>
        <FinalRetro formato={formato} d={EX.d} arq={EX.arq} />
      </div>
    </div>
  );
}

// Leque com 3 finais de exemplo (320x300).
export function Leque() {
  return (<>
    <Mini formato="figurinha" left={176} top={30} w={136} k={0.378} rot={9} />
    <Mini formato="boletim" left={98} top={12} w={136} k={0.378} rot={1} />
    <Mini formato="jornal" left={4} top={24} w={153} k={0.425} rot={-6} sombra="var(--shadow-lg)" />  </>);
}

// Miniatura de um final na grade "outros finais" (k = escala do card de 360x640).
export function Tile({ f, d, arq, k, seu, bloq, ativo, onClick }) {
  const w = Math.round(360 * k), h = Math.round(640 * k);
  const grande = k > 0.3;
  return (
    <button aria-label={f.nome} onClick={onClick}
      style={{ ...s('position:relative;padding:0;border:none;border-radius:8px;overflow:hidden;cursor:pointer;background:var(--color-surface);box-shadow:var(--shadow-sm)'), width: w, height: h, outline: ativo ? '3px solid var(--color-accent-300)' : 'none', outlineOffset: 2 }}>
      <div style={{ width: 360, height: 640, transform: `scale(${k})`, transformOrigin: '0 0', pointerEvents: 'none', filter: bloq ? `blur(${grande ? 7 : 5}px)` : 'none' }}>
        <FinalRetro formato={f.id} d={d} arq={arq} />
      </div>
      {bloq && (
        <div style={s('position:absolute;inset:0;background:color-mix(in srgb, var(--color-neutral-900) 42%, transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:0 6px;color:var(--color-neutral-100);text-align:center')}>
          <span style={{ ...s('border-radius:50%;background:var(--color-neutral-100);color:var(--color-text);display:flex;align-items:center;justify-content:center'), width: grande ? 40 : 30, height: grande ? 40 : 30 }}><Icon spec={IC.cadeado} size={grande ? 18 : 14} sw={3} /></span>
          <b style={{ fontSize: grande ? 14 : 11, lineHeight: 1.2 }}>{f.nome}</b>
        </div>
      )}
      {seu && <span style={s('position:absolute;left:5px;top:5px;padding:3px 8px;border-radius:999px;background:var(--color-accent);color:var(--color-bg);font-size:11px;font-weight:700')}>Seu final</span>}
    </button>
  );
}

// Caixa "Liberar os 8 finais": compartilhar o seu final libera os outros.
export function LiberaBox() {
  return (
    <div style={s('display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:var(--radius-lg);background:var(--color-surface);color:var(--color-text)')}>
      <span style={s('flex:none;width:38px;height:38px;border-radius:50%;background:var(--color-accent);color:var(--color-bg);display:flex;align-items:center;justify-content:center')}><Icon spec={IC.cadeado} size={18} sw={3} /></span>
      <span style={s('display:flex;flex-direction:column;gap:2px')}><b style={{ fontSize: 15 }}>Liberar os 8 finais</b><span style={{ fontSize: 12, lineHeight: 1.35 }}>Posta o seu final e os outros liberam na hora. De graça.</span></span>
    </div>
  );
}
