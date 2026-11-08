// Layouts de tela larga (>= 900px). Mesma lógica e mesmos cards do mobile; muda só a disposição.
import { useEffect } from 'react';
import { FORMATOS } from './data.js';
import { FinalRetro } from './FinalRetro.jsx';
import { Fit } from './Fit.jsx';
import { Icon, IC } from './Icon.jsx';
import { Leque, Tile, LiberaBox, N, KICKER } from './partes.jsx';
import { podeCompartilhar } from './export.js';
import { Tartaruga } from './Tartaruga.jsx';
import { s } from './css.js';

const LINHA = s('flex-direction:row;align-items:center;justify-content:center;gap:56px;padding:40px 48px');
const PAINEL = s('flex:none;width:340px;display:flex;flex-direction:column;gap:14px');
const CARD_ALTO = s('height:100%;max-height:820px;aspect-ratio:9/16;min-width:0');
const LADO = s('flex:1;padding:12px 10px;font-size:14px;margin:0;white-space:nowrap');

// Atalhos de teclado enquanto a tela está aberta.
function useTeclas(mapa) {
  useEffect(() => {
    const fn = ev => {
      if (ev.target.closest?.('input, textarea')) return;
      const acao = mapa[ev.key];
      if (acao) { ev.preventDefault(); acao(); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  });
}

// No desktop o principal é baixar; os stories são postados pelo celular.
function BotoesPostar({ ctx, formato }) {
  const { st, postar, copiar } = ctx;
  return (<>
    <button className="btn btn-primary btn-block" disabled={st.ocupado} onClick={() => postar([formato], 'baixar')} style={s('padding:15px;font-size:17px;margin:0')}>
      <Icon spec={IC.baixar} size={20} />{st.ocupado ? 'Gerando imagem...' : 'Baixar imagem'}
    </button>
    <div style={s('display:flex;gap:8px')}>
      <button className="btn btn-block btn-escuro" onClick={() => copiar(formato)} style={LADO}><Icon spec={IC.copiar} size={18} />Copiar imagem</button>
      {podeCompartilhar && <button className="btn btn-block btn-escuro" disabled={st.ocupado} onClick={() => postar([formato], 'share')} style={LADO}><Icon spec={IC.share} size={18} />Compartilhar</button>}
    </div>
    <span style={s('font-size:13px;line-height:1.4;opacity:.65')}>Pra postar nos stories, abre no celular ou manda a imagem pra ele.</span>
  </>);
}

export function DeskEntrada({ iniciar }) {
  return (
    <div className="tela" style={{ ...LINHA, gap: 72 }}>
      <div style={s('flex:0 1 480px;display:flex;flex-direction:column;gap:16px')}>
        <div style={s('display:flex;align-items:center;gap:8px')}><span style={s('font-family:var(--font-heading);font-size:22px')}>Minha Retro</span><span className="tag tag-accent">2026</span></div>
        <h1 style={s('margin:4px 0 0;font-size:54px;line-height:1.02;text-wrap:balance')}>Seu 2026 vira jornal, boletim ou bula. A sorte decide.</h1>
        <p style={s('margin:0;font-size:18px;line-height:1.5;max-width:420px')}>Responda 10 perguntas e a gente sorteia 1 de 9 finais pra você. Dois minutinhos, zero cadastro.</p>
        <div style={s('display:flex;align-items:flex-end;gap:24px;margin-top:12px')}>
          <button className="btn btn-primary" onClick={iniciar} style={s('padding:18px 32px;font-size:18px;margin:0')}>
            Bora fazer a minha <Icon spec={IC.seta} size={20} />
          </button>
          <Tartaruga size={120} />
        </div>
      </div>
      <Fit w={320} h={300} max={1.9} style={s('flex:0 1 600px;height:min(560px, 80vh)')}><Leque /></Fit>
    </div>
  );
}

export function DeskRevela({ ctx }) {
  const { st, set, d, arq, fFinal, sIdx } = ctx;
  return (
    <div className="tela escura" style={LINHA}>
      <Fit w={360} h={640} style={{ ...CARD_ALTO, ...s('animation:retroPop .6s ease-out both') }}>
        <FinalRetro formato={fFinal.id} d={d} arq={arq} />
      </Fit>
      <div style={PAINEL}>
        <span style={{ ...KICKER, color: 'var(--color-neutral-300)' }}>Seu final sorteado · 1 de 9</span>
        <h2 style={s('margin:0;font-size:34px;line-height:1.05')}>{fFinal.nome}</h2>
        <span style={s('align-self:flex-start;padding:5px 12px;border-radius:999px;background:var(--color-neutral-800);font-size:13px;font-weight:700')}>{arq.nome}</span>
        <p style={s('margin:0 0 8px;font-size:15px;line-height:1.5;color:var(--color-neutral-300)')}>{arq.texto}</p>
        <BotoesPostar ctx={ctx} formato={fFinal.id} />
        <button className="btn btn-ghost btn-block" onClick={() => set(st.liberado ? { tela: 'galeria', gi: sIdx } : { tela: 'finais' })} style={s('padding:10px;font-size:16px;margin:4px 0 0;color:var(--color-accent-300)')}>
          <Icon spec={IC.cadeado} size={18} />{st.liberado ? 'Ver todos os finais' : 'Ver os outros 8 finais'}
        </button>
      </div>
    </div>
  );
}

// Grade 3x3 com tiles a 1/3 do tamanho do card (120x213).
const K = 1 / 3, GW = 120 * 3 + 32, GH = 213 * 3 + 32;

export function DeskFinais({ ctx }) {
  const { st, set, d, arq, sIdx, fFinal, flash } = ctx;
  return (
    <div className="tela" style={LINHA}>
      <Fit w={GW} h={GH} style={s('height:100%;max-height:900px;aspect-ratio:392/671;min-width:0')}>
        <div style={s('display:grid;grid-template-columns:repeat(3,120px);gap:16px')}>
          {FORMATOS.map((f, i) => {
            const seu = i === sIdx;
            const bloq = !seu && !st.liberado;
            return <Tile key={f.id} f={f} d={d} arq={arq} k={K} seu={seu} bloq={bloq}
              onClick={() => (bloq ? flash('Posta o seu final pra liberar ' + f.nome) : set(st.liberado ? { tela: 'galeria', gi: i } : { tela: 'revela' }))} />;
          })}
        </div>
      </Fit>
      <div style={PAINEL}>
        <h2 style={s('margin:0;font-size:34px;line-height:1.05')}>Seu ano tem mais 8 finais</h2>
        <span style={s('font-size:15px;line-height:1.45;margin-bottom:8px')}>Mesmas respostas, outros formatos. Clica pra espiar.</span>
        {!st.liberado && (<>
          <LiberaBox />
          <BotoesPostar ctx={ctx} formato={fFinal.id} />
        </>)}
        <button className="btn btn-ghost btn-block" onClick={() => set({ tela: 'revela' })} style={s('padding:8px;font-size:15px;margin:0')}>Voltar pro meu final</button>
      </div>
    </div>
  );
}

const SETA = s('flex:none;width:52px;height:52px;border-radius:50%;border:none;background:var(--color-neutral-800);color:var(--color-neutral-100);cursor:pointer;display:flex;align-items:center;justify-content:center');

export function DeskGaleria({ ctx }) {
  const { st, set, d, arq, postar } = ctx;
  const gi = ((st.gi ?? 0) % N + N) % N;
  const f = FORMATOS[gi];
  const ant = () => set({ gi: (gi + N - 1) % N });
  const prox = () => set({ gi: (gi + 1) % N });
  const fechar = () => set({ tela: 'revela' });
  useTeclas({ ArrowLeft: ant, ArrowRight: prox, Escape: fechar });

  return (
    <div className="tela escura" style={{ ...LINHA, gap: 40 }}>
      <button onClick={ant} aria-label="Final anterior" style={SETA}><Icon spec={IC.voltar} size={26} /></button>
      <Fit w={360} h={640} style={CARD_ALTO}>
        <FinalRetro formato={f.id} d={d} arq={arq} />
      </Fit>
      <button onClick={prox} aria-label="Próximo final" style={SETA}><Icon spec={IC.avancar} size={26} /></button>
      <div style={PAINEL}>
        <div style={s('display:flex;align-items:flex-start;justify-content:space-between;gap:12px')}>
          <span style={s('display:flex;flex-direction:column;gap:4px')}>
            <span style={{ ...KICKER, color: 'var(--color-neutral-300)' }}>Final {gi + 1} de 9</span>
            <h2 style={s('margin:0;font-size:30px;line-height:1.05')}>{f.nome}</h2>
          </span>
          <button onClick={fechar} aria-label="Fechar" style={{ ...SETA, width: 40, height: 40, background: 'transparent' }}><Icon spec={IC.fechar} size={22} /></button>
        </div>
        <div style={s('display:grid;grid-template-columns:repeat(3,72px);gap:10px;margin:6px 0 10px')}>
          {FORMATOS.map((x, i) => <Tile key={x.id} f={x} d={d} arq={arq} k={0.2} ativo={i === gi} onClick={() => set({ gi: i })} />)}
        </div>
        <BotoesPostar ctx={ctx} formato={f.id} />
        <button className="btn btn-ghost btn-block" disabled={st.ocupado} onClick={() => postar(FORMATOS.map(x => x.id), 'baixar')} style={s('padding:10px;font-size:16px;margin:0;color:var(--color-accent-300)')}>Baixar os 9 finais</button>
      </div>
    </div>
  );
}

export { useTeclas };
