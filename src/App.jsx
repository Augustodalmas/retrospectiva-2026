import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QS, ARQS, FORMATOS, CALC, TA, TB, TH, REACOES, calcArq, montaDados, humorDaReacao } from './data.js';
import { FinalRetro } from './FinalRetro.jsx';
import { Fit } from './Fit.jsx';
import { Icon, IC } from './Icon.jsx';
import { gerarPng, compartilhar, baixarTodos, copiarImagem } from './export.js';
import { s } from './css.js';
import { N, KICKER, Leque, Tile, LiberaBox } from './partes.jsx';
import { DeskEntrada, DeskRevela, DeskFinais, DeskGaleria, useTeclas } from './Desktop.jsx';
import { useDesktop } from './useDesktop.js';
import { Tartaruga, ANIM_DO_HUMOR } from './Tartaruga.jsx';

const TOPO = 'calc(env(safe-area-inset-top) + 18px)';
const BASE = 'calc(env(safe-area-inset-bottom) + 18px)';
const sortear = () => Math.floor(Math.random() * N);

const INICIAL = { tela: 'entrada', qi: 0, ans: {}, sorteado: null, el: 0, reacao: null, toast: '', liberado: false, gi: 0, ocupado: false };

export default function App() {
  const [st, setSt] = useState(INICIAL);
  const set = useCallback(patch => setSt(prev => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) })), []);
  const tAvanca = useRef(null);
  const tToast = useRef(null);
  const pngs = useRef(new Map());

  // Relógio do sorteio.
  useEffect(() => {
    if (st.tela !== 'sorteio') return;
    const iv = setInterval(() => set(p => {
      const el = p.el + 100;
      return el >= TA + TB + TH ? { tela: 'revela', el: 0 } : { el };
    }), 100);
    return () => clearInterval(iv);
  }, [st.tela, set]);

  useEffect(() => () => { clearTimeout(tAvanca.current); clearTimeout(tToast.current); }, []);

  const calc = calcArq(st.ans);
  const arq = ARQS[calc];
  const d = useMemo(() => montaDados(st.ans, arq), [st.ans, arq]);
  const sIdx = st.sorteado ?? 0;
  const fFinal = FORMATOS[sIdx];

  const flash = msg => { clearTimeout(tToast.current); set({ toast: msg }); tToast.current = setTimeout(() => set({ toast: '' }), 2400); };
  const setAns = (i, v) => set(p => ({ ans: { ...p.ans, [i]: v } }));
  const proxima = () => set(p => (p.qi < 9 ? { qi: p.qi + 1, reacao: null } : { tela: 'sorteio', el: 0, reacao: null, sorteado: sortear() }));
  const reagir = txt => {
    clearTimeout(tAvanca.current);
    if (!REACOES || !txt) { tAvanca.current = setTimeout(proxima, 260); return; }
    set({ reacao: txt });
    tAvanca.current = setTimeout(proxima, 1800); // tempo pra ler a reação
  };

  // PNGs ficam em cache por formato; as respostas não mudam depois do sorteio.
  const png = useCallback(formato => {
    let p = pngs.current.get(formato);
    if (!p) {
      p = gerarPng({ formato, d, arq });
      p.catch(() => pngs.current.delete(formato));
      pngs.current.set(formato, p);
    }
    return p;
  }, [d, arq]);

  // Gera antecipadamente o PNG do final sorteado, para o "Postar" abrir o menu na hora.
  useEffect(() => {
    if (st.tela === 'revela') png(fFinal.id).catch(() => {});
  }, [st.tela, fFinal.id, png]);

  // Compartilhar, baixar ou copiar a imagem libera os outros 8 finais.
  // Não dá pra confirmar que a pessoa postou de fato: vale a intenção.
  const liberar = msg => {
    if (st.liberado) { if (msg) flash(msg); return; }
    set({ liberado: true });
    flash('Pronto! Os outros 8 finais foram liberados.');
  };

  // modo 'share': menu de compartilhar (cai no download se não houver); 'baixar': download direto.
  const postar = async (formatos, modo = 'share') => {
    if (st.ocupado) return;
    set({ ocupado: true });
    try {
      const files = await Promise.all(formatos.map(f => png(f)));
      let r = 'downloaded';
      if (modo === 'share') r = await compartilhar(files);
      else baixarTodos(files);
      if (r !== 'cancelled') liberar(r === 'downloaded' ? (files.length > 1 ? `${files.length} imagens salvas` : 'Imagem salva') : '');
    } catch {
      flash('Não deu pra gerar a imagem. Tenta de novo?');
    } finally {
      set({ ocupado: false });
    }
  };

  const copiar = formato => {
    copiarImagem(png(formato))
      .then(() => liberar('Imagem copiada. É só colar na conversa.'))
      .catch(() => flash('Seu navegador não deixou copiar. Usa o Baixar imagem.'));
  };

  const iniciar = () => { pngs.current.clear(); set({ tela: 'q', qi: 0, ans: { 1: 7 }, reacao: null, liberado: false }); };

  const desk = useDesktop();
  const ctx = { st, set, d, arq, fFinal, sIdx, flash, postar, copiar };

  const tela = st.tela;
  return (
    <div className={desk ? 'app desk' : 'app'}>
      {tela === 'entrada' && desk && <DeskEntrada iniciar={iniciar} />}
      {tela === 'entrada' && !desk && (
        <div className="tela" style={{ padding: `calc(env(safe-area-inset-top) + 24px) 24px ${BASE}`, gap: 12 }}>
          <div style={s('display:flex;align-items:center;gap:8px')}><span style={s('font-family:var(--font-heading);font-size:20px')}>Minha Retro</span><span className="tag tag-accent">2026</span><Tartaruga size={72} style={{ marginLeft: 'auto' }} /></div>
          <h2 style={s('margin:4px 0 0;font-size:35px;line-height:1.04;text-wrap:balance')}>Seu 2026 vira jornal, boletim ou bula. A sorte decide.</h2>
          <p style={s('margin:0;font-size:15px;line-height:1.45')}>Responda 10 perguntas e a gente sorteia 1 de 9 finais pra você. Dois minutinhos, zero cadastro.</p>
          <Fit w={320} h={300} max={1.2} style={{ flex: 1 }}><Leque /></Fit>
          <button className="btn btn-primary btn-block" onClick={iniciar} style={s('padding:16px;font-size:17px')}>
            Bora fazer a minha <Icon spec={IC.seta} size={20} />
          </button>
        </div>
      )}

      {tela === 'q' && <Pergunta st={st} set={set} setAns={setAns} reagir={reagir} cancela={() => clearTimeout(tAvanca.current)} desk={desk} />}

      {tela === 'sorteio' && <Sorteio el={st.el} sIdx={sIdx} desk={desk} />}

      {tela === 'revela' && desk && <DeskRevela ctx={ctx} />}
      {tela === 'revela' && !desk && (
        <div className="tela escura" style={{ padding: `calc(env(safe-area-inset-top) + 10px) 19px ${BASE}`, gap: 10 }}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:46px')}>
            <span style={s('display:flex;flex-direction:column')}><span style={s('font-size:12px;font-weight:700;color:var(--color-neutral-300)')}>Seu final sorteado · 1 de 9</span><b style={{ fontSize: 16 }}>{fFinal.nome}</b></span>
            <span style={s('padding:5px 12px;border-radius:999px;background:var(--color-neutral-800);font-size:12px;font-weight:700;white-space:nowrap')}>{arq.nome}</span>
          </div>
          <Fit w={360} h={640} style={s('flex:1;animation:retroPop .6s ease-out both')}>
            <FinalRetro formato={fFinal.id} d={d} arq={arq} />
          </Fit>
          <div style={s('display:flex;flex-direction:column;gap:8px')}>
            <button className="btn btn-primary btn-block" disabled={st.ocupado} onClick={() => postar([fFinal.id])} style={s('padding:15px;font-size:17px;margin:0')}>
              <Icon spec={IC.share} size={20} />{st.ocupado ? 'Gerando imagem...' : 'Postar nos stories'}
            </button>
            <button className="btn btn-block btn-escuro" onClick={() => set(st.liberado ? { tela: 'galeria', gi: sIdx } : { tela: 'finais' })} style={s('padding:13px;font-size:16px;margin:0')}>
              <Icon spec={IC.cadeado} size={18} />{st.liberado ? 'Ver todos os finais' : 'Ver os outros 8 finais'}
            </button>
          </div>
        </div>
      )}

      {tela === 'finais' && desk && <DeskFinais ctx={ctx} />}
      {tela === 'finais' && !desk && (
        <div className="tela rola" style={{ padding: `${TOPO} 20px ${BASE}`, gap: 12 }}>
          <div style={s('display:flex;flex-direction:column;gap:4px')}>
            <h2 style={s('margin:0;font-size:28px;line-height:1.05')}>Seu ano tem mais 8 finais</h2>
            <span style={s('font-size:14px;line-height:1.4')}>Mesmas respostas, outros formatos. Toque pra espiar.</span>
          </div>
          <div style={s('display:grid;grid-template-columns:repeat(3,86px);gap:10px;justify-content:space-between')}>
            {FORMATOS.map((f, i) => {
              const seu = i === sIdx;
              const bloq = !seu && !st.liberado;
              return <Tile key={f.id} f={f} d={d} arq={arq} k={0.24} seu={seu} bloq={bloq}
                onClick={() => (bloq ? flash('Posta o seu final pra liberar ' + f.nome) : set(st.liberado ? { tela: 'galeria', gi: i } : { tela: 'revela' }))} />;
            })}
          </div>
          <div style={s('flex:1')} />
          {!st.liberado && (<>
            <LiberaBox />
            <button className="btn btn-primary btn-block" disabled={st.ocupado} onClick={() => postar([fFinal.id])} style={s('padding:15px;font-size:17px;margin:0')}>
              <Icon spec={IC.share} size={20} />{st.ocupado ? 'Gerando imagem...' : 'Postar e liberar'}
            </button>
          </>)}
          <button className="btn btn-ghost btn-block" onClick={() => set({ tela: 'revela' })} style={s('padding:8px;font-size:15px;margin:0')}>Voltar pro meu final</button>
        </div>
      )}

      {tela === 'galeria' && desk && <DeskGaleria ctx={ctx} />}
      {tela === 'galeria' && !desk && <Galeria st={st} set={set} d={d} arq={arq} postar={postar} />}

      {st.toast && (
        <div role="status" style={{ ...s('position:absolute;left:24px;right:24px;bottom:150px;padding:14px 18px;border-radius:999px;background:var(--color-text);color:var(--color-bg);font-size:14px;font-weight:600;text-align:center;box-shadow:var(--shadow-lg);z-index:6;text-wrap:pretty'), ...(desk ? s('left:50%;right:auto;bottom:40px;width:max-content;max-width:480px;transform:translateX(-50%)') : null) }}>{st.toast}</div>
      )}
    </div>
  );
}

function Pergunta({ st, set, setAns, reagir, cancela, desk }) {
  const q = QS[st.qi];
  const val = st.ans[st.qi];
  const nota = st.ans[1] ?? 7;
  const isOpt = !!q.opcoes && q.opcoes.some(x => x.label === val);
  const mostraBotao = q.tipo === 'nota' || q.tipo === 'texto' || (q.livre && !!val && !isOpt);
  const botao = q.tipo === 'texto' && !val ? 'Pular' : st.qi === 9 ? 'Ver meu final' : 'Próxima';
  const pick = x => { setAns(st.qi, x.label); reagir(x.reacao); };
  const onNext = () => {
    if (q.tipo === 'nota') reagir(nota >= 9 ? 'Ano de cria!' : nota >= 7 ? 'Tá pago' : nota >= 5 ? 'Raspando, mas foi' : 'Abraço apertado');
    else if (q.tipo === 'texto') reagir(val ? 'Bom gosto' : 'Sem trilha, tudo bem');
    else reagir('Anotado!');
  };
  const voltar = () => { cancela(); set(st.qi > 0 ? { qi: st.qi - 1, reacao: null } : { tela: 'entrada', reacao: null }); };
  const optStyle = on => ({ border: `2px solid ${on ? 'var(--color-accent)' : 'var(--color-divider)'}` });

  // Desktop: 1–9 escolhe a opção, Enter avança, Esc volta.
  const teclas = {};
  if (desk) {
    (q.opcoes || []).slice(0, 9).forEach((x, i) => { teclas[String(i + 1)] = () => pick(x); });
    if (mostraBotao) teclas.Enter = onNext;
    teclas.Escape = voltar;
  }
  useTeclas(teclas);

  return (
    <div className="tela rola" style={{ padding: desk ? '48px calc(50% - 320px)' : `${TOPO} 22px ${BASE}`, gap: 18, ...(desk ? { justifyContent: 'safe center' } : null) }}>
      <div style={s('display:flex;align-items:center;gap:12px')}>
        <button className="btn btn-ghost btn-icon" onClick={voltar} aria-label="Voltar" style={{ flex: 'none' }}><Icon spec={IC.voltar} size={22} /></button>
        <div style={s('flex:1;height:10px;border-radius:999px;background:var(--color-surface);overflow:hidden')}>
          <div style={{ ...s('height:100%;border-radius:999px;background:var(--color-accent);transition:width .3s'), width: `${(st.qi + 1) * 10}%` }} />
        </div>
        <span style={s('flex:none;font-size:13px;font-weight:700;min-width:34px;text-align:right')}>{st.qi + 1}/10</span>
      </div>
      <div style={s('display:flex;flex-direction:column;gap:6px')}>
        <span style={{ ...KICKER, color: 'var(--color-accent-700)' }}>Pergunta {st.qi + 1}</span>
        <h2 style={s('margin:0;font-size:32px;line-height:1.08;text-wrap:balance')}>{q.titulo}</h2>
      </div>

      {q.opcoes && q.tipo !== 'emoji' && (
        <div style={desk ? s('display:grid;grid-template-columns:1fr 1fr;gap:12px') : s('display:grid;grid-template-columns:1fr 1fr;gap:8px')}>
          {q.opcoes.map(x => {
            const on = val === x.label;
            // Celular: 2 colunas com cantos menos redondos, pra caber texto em 2 linhas sem rolar a tela.
            // Sugestão com etiqueta (música/série) ocupa 2 linhas também no desktop.
            const forma = desk && !x.cat ? s('padding:14px 20px;border-radius:999px;font:600 16px var(--font-body)') : s('padding:10px 14px;min-height:54px;border-radius:18px;font:600 15px/1.2 var(--font-body)');
            return (
              <button key={x.label} onClick={() => pick(x)} style={{ ...s('text-align:left;cursor:pointer;transition:background .15s'), ...forma, ...optStyle(on), background: on ? 'var(--color-accent)' : 'var(--color-neutral-100)', color: on ? 'var(--color-bg)' : 'var(--color-text)' }}>
                {x.cat && <span style={{ ...s('display:block;font-size:11px;font-weight:700;margin-bottom:2px'), opacity: on ? 0.85 : 0.6 }}>{x.cat}</span>}
                {x.label}
              </button>
            );
          })}
        </div>
      )}

      {q.tipo === 'emoji' && (
        <div style={{ ...s('display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px'), ...(desk ? { gridTemplateColumns: 'repeat(6,minmax(0,1fr))' } : null) }}>
          {q.opcoes.map(x => {
            const on = val === x.label;
            return (
              <button key={x.label} onClick={() => pick(x)} aria-label={x.label} style={{ ...s('aspect-ratio:1;border-radius:50%;font-size:34px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0'), border: `3px solid ${on ? 'var(--color-accent)' : 'var(--color-divider)'}`, background: on ? 'var(--color-accent-200)' : 'var(--color-neutral-100)' }}>{x.label}</button>
            );
          })}
        </div>
      )}

      {q.tipo === 'nota' && (
        <div style={s('display:flex;flex-direction:column;gap:16px;margin-top:10px')}>
          <div style={s('display:flex;align-items:baseline;gap:8px')}>
            <span style={s('font-family:var(--font-heading);font-size:140px;line-height:.9;color:var(--color-accent)')}>{nota}</span>
            <span style={s('font-family:var(--font-heading);font-size:30px')}>/10</span>
          </div>
          <input type="range" min="0" max="10" step="1" value={nota} onChange={ev => setAns(1, Number(ev.target.value))} aria-label="Nota do ano" style={s('width:100%;height:28px')} />
          <div style={s('display:flex;justify-content:space-between;font-size:13px;font-weight:600;color:var(--color-neutral-800)')}><span>0 · pra esquecer</span><span>10 · ano de cria</span></div>
        </div>
      )}

      {q.livre && (
        <input className="input" value={q.livre && !isOpt ? (val || '') : ''} maxLength={60}
          onChange={ev => { cancela(); set({ reacao: null }); setAns(st.qi, ev.target.value); }}
          onKeyDown={ev => { if (ev.key === 'Enter' && mostraBotao) onNext(); }}
          placeholder={q.placeholder} style={s('width:100%;box-sizing:border-box;border-radius:999px;padding:14px 20px;font-size:16px')} />
      )}
      {q.tipo === 'texto' && <span style={s('font-size:13px;color:var(--color-neutral-800);margin-top:-8px;padding-left:20px')}>Opcional. Pode pular se não lembrar.</span>}

      {!desk && <div style={{ flex: 1 }} />}
      {/* Celular: a bolha entra no lugar do botão (a tela avança sozinha depois da reação), sem cobrir as respostas. */}
      {mostraBotao && (desk || !st.reacao) && <button className="btn btn-primary btn-block" onClick={onNext} style={s('padding:16px;font-size:17px;margin:0')}>{botao}</button>}

      {/* Espaço reservado pra bolha no desktop, assim o bloco centralizado não pula quando ela aparece. */}
      {desk && !st.reacao && <div style={{ flex: 'none', height: 80 }} />}
      {st.reacao && (
        <div key={st.qi + st.reacao} ref={el => el && requestAnimationFrame(() => el.scrollIntoView({ block: 'nearest' }))}
          style={s('flex:none;min-height:80px;align-self:flex-start;max-width:100%;display:flex;align-items:flex-end;gap:4px')}>
          <Tartaruga humor={humorDaReacao(st.reacao)} anim={ANIM_DO_HUMOR[humorDaReacao(st.reacao)]} size={104} />
          <div style={s('min-width:0;display:flex;flex-direction:column;gap:4px;transform-origin:bottom left;animation:retroPop .35s ease-out both')}>
            <span style={s('font-size:11px;font-weight:700;color:var(--color-accent-2-800);padding-left:6px')}>Minha Retro</span>
            <span style={s('padding:12px 18px;border-radius:22px 22px 22px 6px;background:var(--color-accent-2-200);color:var(--color-accent-2-900);font-family:var(--font-heading);font-size:22px;line-height:1.1;box-shadow:var(--shadow-md)')}>{st.reacao}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Sorteio({ el, sIdx, desk }) {
  const faseCalc = el < TA;
  const tSpin = Math.min(1, Math.max(0, (el - TA) / TB));
  const passos = 20;
  const slotIdx = ((sIdx - passos + Math.floor(passos * (1 - Math.pow(1 - tSpin, 3)))) % N + 3 * N) % N;
  const parou = el >= TA + TB;
  const atual = parou ? sIdx : slotIdx;
  const fSlot = FORMATOS[atual];
  const calcMsg = CALC[Math.min(CALC.length - 1, Math.floor(el / TA * CALC.length))];
  const bolas = [['var(--color-accent-2-500)', 150, 0, 10, '0s'], ['var(--color-accent-400)', 96, 110, 0, '.4s'], ['var(--color-accent-2-300)', 64, 96, 104, '.8s']];

  return (
    <div className="tela" style={{ ...s('background:var(--color-accent-2-700);color:var(--color-accent-2-100);padding:0 26px;justify-content:center;gap:26px'), ...(desk ? { padding: '0 calc(50% - 220px)' } : null) }}>
      {faseCalc ? (<>
        <div style={s('position:relative;width:200px;height:170px')}>
          {bolas.map(([c, sz, x, y, dl], i) => (
            <div key={i} style={{ position: 'absolute', left: x, top: y, width: sz, height: sz, borderRadius: '50%', background: c, animation: `retroPulse 1.6s ease-in-out ${dl} infinite` }} />
          ))}
          <Tartaruga humor="pensando" anim="anda" size={170} style={s('position:absolute;left:10px;bottom:-6px')} />
        </div>
        <div style={s('display:flex;flex-direction:column;gap:10px')}>
          <span style={s('font-family:var(--font-heading);font-size:34px;line-height:1.1')}>Calculando seu ano...</span>
          <span style={s('font-size:17px;font-weight:600;min-height:48px')}>{calcMsg}</span>
        </div>
      </>) : (<>
        <Tartaruga key={parou ? 'festa' : 'gira'} humor={parou ? 'festa' : 'surpresa'} anim={parou ? 'pula' : 'anda'} size={120} />
        <span style={s('font-family:var(--font-heading);font-size:34px;line-height:1.1')}>{parou ? 'Deu ' + FORMATOS[sIdx].nome + '!' : 'Sorteando seu final...'}</span>
        <div style={{ ...s('padding:22px;border-radius:30px;background:var(--color-neutral-100);color:var(--color-text);display:flex;align-items:center;gap:16px'), boxShadow: parou ? '0 0 0 4px var(--color-accent-2-700), 0 0 0 7px var(--color-accent-300), var(--shadow-lg)' : 'var(--shadow-md)' }}>
          <span style={s('flex:none;width:68px;height:68px;border-radius:50%;background:var(--color-accent);color:var(--color-bg);display:flex;align-items:center;justify-content:center')}>
            <span key={parou ? 'fim' : 'gira'} style={{ display: 'flex', animation: parou ? 'retroPop .45s ease-out both' : 'none' }}><Icon spec={fSlot.ic} size={32} /></span>
          </span>
          <span style={s('display:flex;flex-direction:column;gap:2px')}>
            <span style={{ ...KICKER, color: 'var(--color-neutral-700)' }}>Seu final</span>
            <span style={s('font-family:var(--font-heading);font-size:24px;line-height:1.1')}>{fSlot.nome}</span>
          </span>
        </div>
        <div style={s('display:flex;gap:8px')}>
          {FORMATOS.map((f, i) => <span key={f.id} style={{ ...s('width:12px;height:12px;border-radius:50%'), background: i === atual ? 'var(--color-accent-300)' : 'var(--color-accent-2-800)' }} />)}
        </div>
      </>)}
    </div>
  );
}

function Galeria({ st, set, d, arq, postar }) {
  const gi = ((st.gi ?? 0) % N + N) % N;
  const f = FORMATOS[gi];
  return (
    <div className="tela escura" style={{ padding: `calc(env(safe-area-inset-top) + 12px) 19px ${BASE}`, gap: 8 }}>
      <div style={s('display:flex;gap:4px')}>
        {FORMATOS.map((x, i) => <div key={x.id} style={{ ...s('flex:1;height:4px;border-radius:999px'), background: i === gi ? 'var(--color-neutral-100)' : 'var(--color-neutral-700)' }} />)}
      </div>
      <div style={s('display:flex;align-items:center;justify-content:space-between;height:40px')}>
        <span style={s('font-size:14px;font-weight:700;white-space:nowrap')}>Final {gi + 1} de 9 · {f.nome}</span>
        <button onClick={() => set({ tela: 'revela' })} aria-label="Fechar" style={s('width:40px;height:40px;border-radius:50%;border:none;background:transparent;color:var(--color-neutral-100);cursor:pointer;display:flex;align-items:center;justify-content:center')}><Icon spec={IC.fechar} size={22} /></button>
      </div>
      <Fit w={360} h={640} style={{ flex: 1 }}>
        <FinalRetro formato={f.id} d={d} arq={arq} />
        <div onClick={() => set({ gi: (gi + N - 1) % N })} style={s('position:absolute;left:0;top:0;bottom:0;width:35%;cursor:w-resize')} />
        <div onClick={() => set({ gi: (gi + 1) % N })} style={s('position:absolute;right:0;top:0;bottom:0;width:65%;cursor:e-resize')} />
      </Fit>
      <div style={s('display:flex;flex-direction:column;gap:8px')}>
        <button className="btn btn-primary btn-block" disabled={st.ocupado} onClick={() => postar([f.id])} style={s('padding:15px;font-size:17px;margin:0')}>{st.ocupado ? 'Gerando imagem...' : 'Postar este final'}</button>
        <button className="btn btn-block btn-escuro" disabled={st.ocupado} onClick={() => postar(FORMATOS.map(x => x.id))} style={s('padding:13px;font-size:16px;margin:0')}>Baixar os 9 finais</button>
      </div>
    </div>
  );
}
