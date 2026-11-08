// Mascote da Dalmas Studio (de dalmas-tartaruga-icone.svg), separado em partes para animar.
// humor: feliz | festa | risada | surpresa | triste | choro | amor | calma | pensando
// anim:  parada (respira e pisca) | fala (balança a cabeça) | anda (patinhas) | pula (comemora)
//        treme (gargalhada) | susto (dá um pulinho pra trás) | murcha (abaixa a cabeça) | zen (flutua devagar)
//        fixa (sem animação nenhuma, para os cards que viram PNG)
import { useId } from 'react';

const TINTA = '#4A2E25';
const PELE = '#EBD3AE';
const LINHA = { stroke: TINTA, strokeWidth: 9, strokeLinejoin: 'round', strokeLinecap: 'round' };
const CASCO = 'M92 352 C92 222 166 132 250 132 C334 132 408 222 408 352 Z';
const CORACAO = 'M0 14 C-16 2 -14 -12 -6 -12 C-2 -12 0 -8 0 -6 C0 -8 2 -12 6 -12 C14 -12 16 2 0 14 Z';
const TRACO = { fill: 'none', stroke: TINTA, strokeWidth: 7, strokeLinecap: 'round' };

// Movimento que combina com cada humor (usado na bolha de reação).
export const ANIM_DO_HUMOR = { feliz: 'fala', festa: 'pula', risada: 'treme', surpresa: 'susto', triste: 'murcha', choro: 'murcha', amor: 'fala', calma: 'zen', pensando: 'parada' };

function Olho({ humor }) {
  if (humor === 'festa' || humor === 'risada') return <path d="M438 244 Q452 228 466 244" {...TRACO} />; // ^
  if (humor === 'calma') return <path d="M438 238 Q452 252 466 238" {...TRACO} />; // olhinho fechado sorrindo
  if (humor === 'amor') return <path d={CORACAO} transform="translate(452 242) scale(1.25)" fill="#D2483A" />;
  const r = humor === 'surpresa' ? 16 : 14;
  const dy = humor === 'pensando' ? -5 : humor === 'triste' ? 4 : 0; // olhando pra cima / pra baixo
  return (
    <g className="t-olho">
      <circle cx="452" cy="240" r={r} fill={TINTA} />
      <circle cx="457" cy={234 + dy} r="5" fill="#FBF2E3" /><circle cx="447" cy={246 + dy} r="2.2" fill="#FBF2E3" />
      {(humor === 'triste' || humor === 'choro') && <path d="M432 237 L472 228 L472 220 L432 220 Z" fill={PELE} />}
      {(humor === 'triste' || humor === 'choro') && <path d="M436 216 L466 206" {...TRACO} strokeWidth="5" />}
    </g>
  );
}

function Boca({ humor }) {
  if (humor === 'festa' || humor === 'risada') return <path d="M460 262 Q474 288 490 258 Z" fill={TINTA} stroke={TINTA} strokeWidth="5" strokeLinejoin="round" />;
  if (humor === 'surpresa') return <ellipse cx="476" cy="270" rx="7" ry="9" fill={TINTA} />;
  if (humor === 'pensando') return <path d="M464 268 L484 264" {...TRACO} strokeWidth="6" />;
  if (humor === 'triste') return <path d="M462 272 Q474 262 486 272" {...TRACO} strokeWidth="6" />;
  return <path d="M462 265 Q474 275 486 263" {...TRACO} strokeWidth="6" />;
}

// Enfeites em volta da cabeça.
function Extras({ humor }) {
  if (humor === 'pensando') return <g className="t-pensa" fill={TINTA}><circle cx="470" cy="170" r="7" /><circle cx="492" cy="150" r="9" /><circle cx="510" cy="124" r="11" /></g>;
  if (humor === 'choro') return <path className="t-lagrima" d="M440 262 Q432 276 440 282 Q448 276 440 262 Z" fill="#6FA8D6" />;
  if (humor === 'amor') return (
    <g className="t-sobe" fill="#D2483A">
      <path d={CORACAO} transform="translate(486 176) scale(.9)" /><path d={CORACAO} transform="translate(420 160) scale(.6)" /><path d={CORACAO} transform="translate(508 140) scale(.5)" />
    </g>
  );
  if (humor === 'festa') return (
    <g className="t-sobe" fill="#E2A13B">
      <circle cx="400" cy="160" r="7" /><circle cx="500" cy="150" r="6" /><rect x="450" y="132" width="12" height="12" rx="2" transform="rotate(20 456 138)" /><circle cx="520" cy="200" r="5" />
    </g>
  );
  if (humor === 'risada') return <g fill={TINTA} className="t-sobe" style={{ font: '700 50px var(--font-heading)' }}><text x="486" y="186">k</text><text x="514" y="150">k</text></g>;
  if (humor === 'surpresa') return <text x="488" y="186" fill={TINTA} className="t-sobe" style={{ font: '700 76px var(--font-heading)' }}>!</text>;
  if (humor === 'calma') return <g fill={TINTA} className="t-sobe" style={{ font: '700 40px var(--font-heading)' }}><text x="492" y="196">z</text><text x="516" y="160">z</text></g>;
  return null;
}

export function Tartaruga({ humor = 'feliz', anim = 'parada', size = 80, style }) {
  const clip = 'casco' + useId().replace(/:/g, '');
  return (
    <svg className={'tart tart-' + anim} viewBox="48 120 468 330" width={size} height={Math.round(size * 330 / 468)}
      role="img" aria-label="Tartaruga da Dalmas Studio" style={{ overflow: 'visible', flex: 'none', ...style }}>
      <defs><clipPath id={clip}><path d={CASCO} /></clipPath></defs>
      <ellipse className="t-sombra" cx="262" cy="426" rx="185" ry="15" fill="#D2B083" opacity=".45" />
      <g className="t-corpo">
        {/* patas de trás */}
        <rect className="t-pata t-pata-b" x="196" y="336" width="58" height="76" rx="27" fill="#D2B083" {...LINHA} />
        <rect className="t-pata t-pata-a" x="360" y="336" width="58" height="76" rx="27" fill="#D2B083" {...LINHA} />
        <path className="t-rabo" d="M104 336 Q66 344 60 326 Q76 316 112 318 Z" fill="#EBD3AE" {...LINHA} />
        {/* pescoço + cabeça */}
        <g className="t-cabeca">
          <line x1="376" y1="324" x2="430" y2="270" stroke={TINTA} strokeWidth="88" strokeLinecap="round" />
          <circle cx="446" cy="250" r="58" fill="#EBD3AE" {...LINHA} />
          <line x1="376" y1="324" x2="430" y2="270" stroke="#EBD3AE" strokeWidth="70" strokeLinecap="round" />
          <ellipse cx="466" cy="278" rx="14" ry="9" fill="#E8957C" opacity=".75" />
          <Olho humor={humor} />
          <Boca humor={humor} />
          <Extras humor={humor} />
        </g>
        {/* patas da frente */}
        <g className="t-pata t-pata-a"><rect x="128" y="340" width="62" height="78" rx="28" fill="#EBD3AE" {...LINHA} /><circle cx="146" cy="406" r="5" fill="#D2B083" /><circle cx="162" cy="409" r="5" fill="#D2B083" /></g>
        <g className="t-pata t-pata-b"><rect x="300" y="340" width="62" height="78" rx="28" fill="#EBD3AE" {...LINHA} /><circle cx="318" cy="406" r="5" fill="#D2B083" /><circle cx="334" cy="409" r="5" fill="#D2B083" /></g>
        {/* casco */}
        <path d={CASCO} fill="#B9563A" />
        <g clipPath={`url(#${clip})`} fill="#D47A55" stroke="#D47A55" strokeWidth="16" strokeLinejoin="round">
          <polygon points="250,192 296,218 296,268 250,294 204,268 204,218" />
          <polygon points="250,104 290,126 290,160 250,170 210,160 210,126" />
          <polygon points="160,226 180,236 180,286 150,318 112,318 120,252" />
          <polygon points="340,226 320,236 320,286 350,318 388,318 380,252" />
          <polygon points="206,304 250,320 294,304 300,340 200,340" />
        </g>
        <g clipPath={`url(#${clip})`} fill="#FBF2E3">
          <circle cx="250" cy="243" r="7" /><circle cx="204" cy="218" r="4.5" /><circle cx="296" cy="218" r="4.5" />
          <circle cx="204" cy="268" r="4.5" /><circle cx="296" cy="268" r="4.5" /><circle cx="250" cy="170" r="4.5" />
        </g>
        <path d="M138 250 C146 206 178 170 214 156" fill="none" stroke="#FBF2E3" strokeWidth="12" strokeLinecap="round" opacity=".45" />
        <path d={CASCO} fill="none" {...LINHA} />
        <rect x="76" y="334" width="348" height="38" rx="19" fill="#8F3F2A" {...LINHA} />
      </g>
    </svg>
  );
}
