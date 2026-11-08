// Os 9 finais (cards 9:16, 360x640). Portado de "Final Retro" do design.
import { s } from './css.js';
import { Icon, IC, IC_ARQ } from './Icon.jsx';
import { STAR } from './data.js';
import { Tartaruga } from './Tartaruga.jsx';

// Cara da tartaruga na figurinha, conforme o perfil sorteado.
const HUMOR_ARQ = { v: 'surpresa', s: 'choro', p: 'pensando', t: 'festa', z: 'calma', c: 'risada' };

const MARCA = 'faça a sua · retro.dalmasstudio.com.br';
const LABEL = s('font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--color-neutral-700)');
const H_SEC = s('font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-700)');
const SPACER = s('flex:1');

function Recibo({ d, arq, marca }) {
  const dash = <div style={s('border-top:2px dashed var(--color-neutral-400)')} />;
  const linha = s('display:flex;justify-content:space-between;font-size:12px');
  return (
    <div style={{ ...s('position:absolute;inset:0'), background: arq.tint2 }}>
      <div style={s('position:absolute;left:28px;right:28px;top:32px;background:var(--color-neutral-100);transform:rotate(-1.5deg);box-shadow:var(--shadow-md);padding:22px 22px 20px;display:flex;flex-direction:column;gap:9px')}>
        <div style={s('position:absolute;left:0;right:0;top:-8px;height:8px;background:radial-gradient(circle at 8px 8px, var(--color-neutral-100) 6px, transparent 6.5px) 0 0/16px 8px repeat-x')} />
        <div style={s('position:absolute;left:0;right:0;bottom:-8px;height:8px;background:radial-gradient(circle at 8px 0, var(--color-neutral-100) 6px, transparent 6.5px) 0 0/16px 8px repeat-x')} />
        <div style={s('display:flex;flex-direction:column;align-items:center;gap:3px;text-align:center')}>
          <span style={s('font-size:11px;font-weight:700;letter-spacing:.12em')}>MINHA RETRO LTDA.</span>
          <span style={s('font-family:var(--font-heading);font-size:28px;line-height:1.05')}>Cupom do ano</span>
          <span style={s('font-size:10px;font-weight:600;color:var(--color-neutral-700);letter-spacing:.04em')}>CNPJ 20.26.000/0001-26 · 31/12/2026 23:59</span>
        </div>
        {dash}
        {d.recibo.map((r, i) => (
          <div key={i} style={s('display:flex;justify-content:space-between;gap:12px;font-size:12px;line-height:1.3')}>
            <span style={s('font-weight:600;text-transform:uppercase;letter-spacing:.02em')}>{r.item}</span>
            <span style={s('flex:none;font-weight:700;font-variant-numeric:tabular-nums')}>{r.valor}</span>
          </div>
        ))}
        {dash}
        <div style={s('display:flex;justify-content:space-between;align-items:baseline')}>
          <span style={s('font-family:var(--font-heading);font-size:22px')}>Total</span>
          <span style={s('font-family:var(--font-heading);font-size:22px')}>Nota {d.nota}/10</span>
        </div>
        <div style={linha}><span>Pagamento</span><b>Boleto e fé</b></div>
        <div style={linha}><span>Troco</span><b>2027 inteirinho</b></div>
        <div style={{ ...linha, gap: 12 }}><span>Cliente</span><b style={{ textAlign: 'right' }}>{arq.nome}</b></div>
        {dash}
        <div style={s('height:36px;border-radius:4px;background:repeating-linear-gradient(90deg, var(--color-text) 0 2px, transparent 2px 4px, var(--color-text) 4px 5px, transparent 5px 8px, var(--color-text) 8px 11px, transparent 11px 13px)')} />
        <span style={s('text-align:center;font-size:12px;font-weight:700')}>Volte sempre (em 2027)</span>
      </div>
      {marca && <div style={{ ...s('position:absolute;left:30px;bottom:20px;font-size:11px;font-weight:600'), color: arq.deep }}>{MARCA}</div>}
    </div>
  );
}

function Jornal({ d, arq, marca }) {
  return (
    <div style={s('position:absolute;inset:0;background:var(--color-neutral-100);padding:26px 24px 22px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px')}>
      <div style={s('display:flex;flex-direction:column;gap:6px')}>
        <div style={s('display:flex;justify-content:space-between;align-items:center')}>
          <span style={s('font-family:var(--font-heading);font-size:30px;line-height:1')}>O Diário de 2026</span>
          <span style={s('padding:4px 10px;border-radius:999px;background:var(--color-accent);color:var(--color-bg);font-size:11px;font-weight:700;letter-spacing:.06em')}>EXTRA!</span>
        </div>
        <div style={s('height:4px;border-radius:999px;background:var(--color-text)')} />
        <div style={s('display:flex;justify-content:space-between;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase')}><span>Edição extra · 31 dez</span><span>Grátis</span></div>
      </div>
      <div style={s('font-family:var(--font-heading);font-size:38px;line-height:1.02;text-wrap:balance')}>
        Confirmado: 2026 foi {d.jornal.art}<span style={{ color: 'var(--color-accent-700)' }}>{d.palavra}</span>
      </div>
      <div style={s('display:flex;gap:14px;align-items:center')}>
        <div style={{ ...s('flex:none;width:90px;height:90px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:48px'), background: arq.tint2 }}>{d.emoji}</div>
        <p style={s('margin:0;font-size:13px;line-height:1.4;text-wrap:pretty')}>{d.jornal.lead}</p>
      </div>
      <div style={s('height:3px;border-radius:999px;background:var(--color-neutral-300)')} />
      <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:14px 16px')}>
        {d.jornal.notas.map((n, i) => (
          <div key={i} style={s('display:flex;flex-direction:column;gap:3px')}>
            <b style={s('font-family:var(--font-heading);font-weight:400;font-size:16px;line-height:1.1')}>{n.t}</b>
            <span style={s('font-size:12px;line-height:1.3')}>{n.s}</span>
          </div>
        ))}
      </div>
      <div style={SPACER} />
      <div style={{ ...s('padding:10px 14px;border-radius:18px;font-size:13px;line-height:1.35'), background: arq.bg, color: arq.ink }}>
        <b>Especialistas classificam o ano como:</b> {arq.nome}
      </div>
      {marca && <div style={s('display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:var(--color-neutral-700)')}><span>{MARCA}</span><span>pág. 1</span></div>}
    </div>
  );
}

function Familia({ d, arq, marca }) {
  return (
    <div style={{ ...s('position:absolute;inset:0;display:flex;flex-direction:column'), background: arq.tint }}>
      <div style={s('margin:12px 14px 4px;padding:8px 14px;border-radius:999px;background:var(--color-neutral-100);display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-sm)')}>
        <span style={{ ...s('flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center'), background: arq.bg, color: arq.ink }}><Icon spec={IC.grupo} size={20} /></span>
        <span style={s('display:flex;flex-direction:column')}><b style={{ fontSize: 15 }}>Família 2026</b><span style={s('font-size:11px;color:var(--color-neutral-700)')}>Tia Neide, Mãe, Vó e mais 14</span></span>
      </div>
      <span style={{ ...s('align-self:center;margin:6px 24px 8px;padding:5px 12px;border-radius:14px;font-size:11px;font-weight:700;text-align:center;line-height:1.35'), background: arq.tint2, color: arq.deep }}>
        Mãe mudou o nome do grupo para “{arq.nome}”
      </span>
      <div style={s('padding:0 16px;display:flex;flex-direction:column;gap:6px')}>
        {d.chat.map((m, i) => (
          <div key={i} style={{ ...s('max-width:250px;padding:7px 12px;display:flex;flex-direction:column;gap:2px'), alignSelf: m.align, borderRadius: m.radius, background: m.bg, color: m.fg }}>
            {m.nome && <b style={{ fontSize: 11, color: m.cor }}>{m.nome}</b>}
            <span style={s('font-size:14px;line-height:1.28')}>{m.txt}</span>
          </div>
        ))}
        <span style={{ ...s('font-size:12px;font-style:italic;padding-left:6px'), color: arq.deep }}>Tia Neide está digitando...</span>
      </div>
      <div style={SPACER} />
      {marca && <div style={{ ...s('padding:0 22px 20px;font-size:11px;font-weight:600'), color: arq.deep }}>{MARCA}</div>}
    </div>
  );
}

function Boletim({ d, arq, marca }) {
  const b = d.boletim;
  const grid = s('display:grid;grid-template-columns:1fr 1fr 48px;gap:8px');
  return (
    <div style={{ ...s('position:absolute;inset:0'), background: arq.tint2 }}>
      <div style={s('position:absolute;left:14px;right:14px;top:14px;bottom:52px;border-radius:26px;background:var(--color-neutral-100);padding:22px 20px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px')}>
        <div style={s('display:flex;flex-direction:column;gap:2px')}>
          <span style={s('font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-700)')}>Escola Estadual da Vida</span>
          <span style={s('font-family:var(--font-heading);font-size:36px;line-height:1.05')}>Boletim 2026</span>
          <span style={s('font-size:12px;color:var(--color-neutral-800)')}>Aluno(a): você · Turma 2026-A · Nº 26</span>
          <span style={s('font-size:12px;font-weight:700')}>Perfil: {arq.nome}</span>
        </div>
        <div style={s('display:flex;flex-direction:column')}>
          <div style={{ ...grid, ...s('padding:6px 0;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--color-neutral-700)') }}><span>Matéria</span><span>Obs.</span><span style={{ textAlign: 'center' }}>Nota</span></div>
          {b.linhas.map((l, i) => (
            <div key={i} style={{ ...grid, ...s('align-items:center;min-height:42px;padding:3px 0;border-top:2px solid var(--color-neutral-200)') }}>
              <b style={{ fontSize: 15 }}>{l.materia}</b>
              <span style={s('font-size:12px;line-height:1.3')}>{l.obs}</span>
              {l.baixa
                ? <span style={s('justify-self:center;width:40px;height:40px;border-radius:50%;border:2.5px solid var(--color-accent-600);color:var(--color-accent-700);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:17px;transform:rotate(-8deg)')}>{l.nota}</span>
                : <span style={s('text-align:center;font-family:var(--font-heading);font-size:20px')}>{l.nota}</span>}
            </div>
          ))}
          <div style={s('display:grid;grid-template-columns:1fr 48px;gap:8px;align-items:center;padding:8px 0 0;border-top:3px solid var(--color-text)')}>
            <span style={s('font-family:var(--font-heading);font-size:22px')}>Média final</span>
            <span style={s('text-align:center;font-family:var(--font-heading);font-size:32px;color:var(--color-accent-700)')}>{d.nota}</span>
          </div>
        </div>
        <div style={SPACER} />
        <div style={s('font-size:13px;line-height:1.4;font-style:italic;padding-right:172px')}><b style={{ fontStyle: 'normal' }}>Obs. da professora:</b> {b.obs}</div>
        <div style={{ ...s('position:absolute;right:16px;bottom:22px;padding:4px;border-radius:999px;transform:rotate(-14deg)'), border: `3px solid ${b.seloCor}`, color: b.seloCor }}>
          <div style={{ ...s('padding:6px 12px;border-radius:999px;font-family:var(--font-heading);font-size:18px;white-space:nowrap'), border: `2px dashed ${b.seloCor}` }}>{b.selo}</div>
        </div>
      </div>
      {marca && <div style={{ ...s('position:absolute;left:28px;bottom:20px;font-size:11px;font-weight:600'), color: arq.deep }}>{MARCA}</div>}
    </div>
  );
}

function Avaliacao({ d, arq, marca }) {
  const a = d.aval;
  return (
    <div style={s('position:absolute;inset:0;background:var(--color-bg);padding:26px 22px 20px;box-sizing:border-box;display:flex;flex-direction:column;gap:12px')}>
      <div style={s('display:flex;flex-direction:column;gap:2px')}>
        <span style={s('font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-accent-700)')}>Avaliações</span>
        <span style={s('font-family:var(--font-heading);font-size:64px;line-height:1')}>2026</span>
        <span style={{ fontSize: 13 }}>Ano · Planeta Terra · aberto 24h (infelizmente)</span>
      </div>
      <div style={s('display:flex;align-items:center;gap:10px')}>
        <span style={s('font-family:var(--font-heading);font-size:32px')}>{a.rating}</span>
        <span style={s('display:flex;gap:2px;color:var(--color-accent)')}>
          {a.estrelas.map((e, i) => (
            <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={e.fill} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d={STAR} /></svg>
          ))}
        </span>
        <span style={s('font-size:12px;color:var(--color-neutral-800)')}>(1 avaliação)</span>
      </div>
      <div style={s('padding:14px 16px;border-radius:24px;background:var(--color-neutral-100);display:flex;flex-direction:column;gap:8px;box-shadow:var(--shadow-sm)')}>
        <div style={s('display:flex;align-items:center;gap:10px')}>
          <span style={{ ...s('flex:none;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:17px'), background: arq.bg, color: arq.ink }}>V</span>
          <span style={s('display:flex;flex-direction:column')}><b style={{ fontSize: 14 }}>Você</b><span style={s('font-size:11px;color:var(--color-neutral-700)')}>Avaliador(a) nível caos · 365 fotos</span></span>
        </div>
        <p style={s('margin:0;font-size:14px;line-height:1.42;text-wrap:pretty')}>{a.review}</p>
      </div>
      <div style={{ ...s('margin-left:18px;padding:12px 14px;border-radius:20px;display:flex;flex-direction:column;gap:4px'), background: arq.tint }}>
        <b style={{ fontSize: 12, color: arq.deep }}>Resposta do proprietário · 2027</b>
        <span style={s('font-size:13px;line-height:1.4')}>{a.resposta}</span>
      </div>
      <div style={s('display:flex;flex-wrap:wrap;gap:6px')}>
        {a.chips.map((c, i) => <span key={i} style={s('padding:5px 11px;border-radius:999px;border:2px solid var(--color-divider);font-size:12px;font-weight:600')}>{c}</span>)}
      </div>
      <div style={SPACER} />
      {marca && <div style={s('font-size:11px;font-weight:600;color:var(--color-neutral-700)')}>{MARCA}</div>}
    </div>
  );
}

function Tempo({ d, arq, marca }) {
  const t = d.tempo;
  const estacoes = [['Verão', IC.sol, t.e1], ['Outono', IC.chuva, t.e2], ['Inverno', IC.nuvem, t.e3], ['Primav.', IC.solNuvem, t.e4]];
  const linhas = [['Amor', IC.coracao, t.amor], ['Grana', IC.sol, t.grana], ['Trampo', IC.vento, t.trampo]];
  return (
    <div style={{ ...s('position:absolute;inset:0'), background: arq.bg, color: arq.ink }}>
      <div style={{ ...s('position:absolute;right:-70px;top:-60px;width:240px;height:240px;border-radius:50%'), background: arq.soft }} />
      <div style={{ ...s('position:absolute;right:34px;top:40px;width:92px;height:92px;border-radius:50%'), background: arq.tint }} />
      <div style={s('position:absolute;inset:0;padding:28px 24px 20px;display:flex;flex-direction:column;gap:13px')}>
        <div style={s('display:flex;flex-direction:column;gap:4px')}>
          <span style={s('font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase')}>Previsão do tempo · 2027</span>
          <span style={s('display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600')}><Icon spec={IC.pin} size={16} />Sua vida, amanhã</span>
        </div>
        <div style={s('display:flex;flex-direction:column;gap:4px;margin-top:4px')}>
          <span style={s('font-family:var(--font-heading);font-size:116px;line-height:.9')}>{t.temp}°</span>
          <span style={s('font-family:var(--font-heading);font-size:25px;line-height:1.1')}>{t.cond}</span>
          <span style={s('font-size:13px;font-weight:600')}>{t.maxmin}</span>
        </div>
        <div style={s('display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px')}>
          {estacoes.map(([nome, ic, temp]) => (
            <div key={nome} style={{ ...s('padding:10px 4px;border-radius:20px;display:flex;flex-direction:column;align-items:center;gap:6px'), background: arq.soft }}>
              <span style={s('font-size:11px;font-weight:700')}>{nome}</span><Icon spec={ic} size={22} /><b style={{ fontSize: 15 }}>{temp}°</b>
            </div>
          ))}
        </div>
        <div style={s('display:flex;flex-direction:column;gap:9px')}>
          {linhas.map(([nome, ic, txt]) => (
            <div key={nome} style={s('display:flex;gap:10px;align-items:center;font-size:14px;line-height:1.3')}>
              <Icon spec={ic} size={20} style={{ flex: 'none' }} /><span><b>{nome}:</b> {txt}</span>
            </div>
          ))}
        </div>
        <div style={s('display:flex;gap:10px;align-items:center;padding:10px 14px;border-radius:20px;background:var(--color-neutral-100);color:var(--color-text);font-size:13px;line-height:1.35;font-weight:600')}>
          <Icon spec={IC.alerta} size={20} style={s('flex:none;color:var(--color-accent-700)')} /><span>{t.alerta}</span>
        </div>
        <span style={s('font-size:13px;font-weight:700')}>Clima oficial: {arq.nome}</span>
        <div style={SPACER} />
        {marca && <div style={s('font-size:11px;font-weight:600')}>{MARCA}</div>}
      </div>
    </div>
  );
}

function Bula({ d, arq, marca }) {
  const secoes = [['Indicações', d.bula.indic], ['Posologia', 'Um dia de cada vez. Não exceder 3 rolês por fim de semana.'], ['Contraindicações', d.bula.contra],
    ['Efeitos colaterais', d.bula.efeitos], ['Em caso de superdose', 'Procure o grupo da família imediatamente.']];
  return (
    <div style={s('position:absolute;inset:0;background:var(--color-neutral-100)')}>
      <div style={{ ...s('position:absolute;right:-26px;top:54px;width:170px;height:64px;border-radius:999px;transform:rotate(-28deg);box-shadow:var(--shadow-md)'), background: `linear-gradient(90deg, var(--color-accent) 50%, ${arq.soft} 50%)` }} />
      <div style={s('position:absolute;inset:0;padding:28px 24px 20px;display:flex;flex-direction:column;gap:11px')}>
        <div style={s('display:flex;flex-direction:column;gap:4px')}>
          <span style={s('font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-700)')}>Bula · leia antes de usar</span>
          <span style={s('font-family:var(--font-heading);font-size:66px;line-height:1')}>2027<span style={s('font-size:24px;vertical-align:top')}>®</span></span>
          <span style={s('font-size:13px;font-weight:700')}>Esperança em comprimidos · 365 unidades</span>
          <span style={s('font-size:13px;max-width:240px')}>Princípio ativo: <b>{arq.nome}</b></span>
          <span className="tag tag-accent-2" style={s('align-self:flex-start;margin-top:4px')}>Venda livre</span>
        </div>
        {secoes.map(([t, txt]) => (
          <div key={t} style={s('display:flex;flex-direction:column;gap:2px')}>
            <b style={H_SEC}>{t}</b><span style={s('font-size:13px;line-height:1.4')}>{txt}</span>
          </div>
        ))}
        <div style={s('padding:10px 14px;border-radius:16px;background:var(--color-surface);font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;line-height:1.4')}>Mantenha fora do alcance do grupo da firma.</div>
        <div style={SPACER} />
        {marca && <div style={s('font-size:11px;font-weight:600;color:var(--color-neutral-700)')}>{MARCA}</div>}
      </div>
    </div>
  );
}

function Campo({ label, children }) {
  return <div style={s('display:flex;flex-direction:column')}><span style={LABEL}>{label}</span><b style={{ fontSize: 14 }}>{children}</b></div>;
}

function Rg({ d, arq, marca }) {
  return (
    <div style={{ ...s('position:absolute;inset:0'), background: arq.tint2 }}>
      <div style={s('position:absolute;inset:0;padding:24px 14px 20px;display:flex;flex-direction:column;gap:12px')}>
        <span style={{ ...s('padding:0 10px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase'), color: arq.deep }}>Seu arquétipo de 2026 saiu</span>
        <div style={s('border-radius:26px;background:var(--color-neutral-100);overflow:hidden;box-shadow:var(--shadow-md)')}>
          <div style={{ ...s('padding:12px 18px;display:flex;flex-direction:column;gap:2px'), background: arq.bg, color: arq.ink }}>
            <span style={s('font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase')}>República Federativa do Seu Ano</span>
            <span style={s('font-family:var(--font-heading);font-size:20px')}>Carteira de Identidade 2026</span>
          </div>
          <div style={s('padding:16px 18px;display:flex;flex-direction:column;gap:12px')}>
            <div style={s('display:flex;gap:14px')}>
              <div style={{ ...s('flex:none;width:108px;height:140px;border-radius:18px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;padding-bottom:22px;box-sizing:border-box'), border: `3px solid ${arq.deep}`, background: arq.tint }}>
                <Tartaruga humor="feliz" anim="fixa" size={96} />
              </div>
              <div style={s('display:flex;flex-direction:column;gap:8px')}>
                <Campo label="Registro">{d.rg.registro}</Campo>
                <Campo label="Emissão">31/12/2026</Campo>
                <Campo label="Validade">Até a próxima virada</Campo>
              </div>
            </div>
            <div style={s('display:flex;flex-direction:column')}><span style={LABEL}>Nome</span><span style={s('font-family:var(--font-heading);font-size:28px;line-height:1.02')}>{arq.nome}</span></div>
            <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:10px')}>
              <Campo label="Filiação">{d.rg.filiacao}</Campo>
              <Campo label="Naturalidade">{d.rg.naturalidade}</Campo>
            </div>
            <div style={s('display:flex;gap:14px;align-items:flex-end')}>
              <div style={s('flex:none;display:flex;flex-direction:column;align-items:center;gap:3px')}>
                <div style={{ ...s('width:46px;height:56px;border-radius:50% 50% 46% 46%'), background: `repeating-radial-gradient(circle at 50% 62%, ${arq.deep} 0 1.6px, transparent 1.6px 4.2px)` }} />
                <span style={s('font-size:10px;color:var(--color-neutral-700)')}>polegar</span>
              </div>
              <div style={s('flex:1;display:flex;flex-direction:column;gap:3px')}>
                <span style={s('font-family:var(--font-heading);font-size:26px;line-height:1;transform:rotate(-4deg);transform-origin:left;padding-left:8px')}>você</span>
                <div style={s('height:2px;border-radius:999px;background:var(--color-text)')} />
                <span style={s('font-size:10px;color:var(--color-neutral-700)')}>assinatura do(a) titular</span>
              </div>
            </div>
          </div>
        </div>
        <p style={s('margin:0;padding:0 10px;font-size:15px;line-height:1.4;text-wrap:pretty')}>{arq.texto}</p>
        <div style={SPACER} />
        {marca && <div style={{ ...s('padding:0 10px;font-size:11px;font-weight:600'), color: arq.deep }}>{MARCA}</div>}
      </div>
    </div>
  );
}

function Figurinha({ d, arq, marca }) {
  const f = d.fig;
  return (
    <div style={{ ...s('position:absolute;inset:0'), background: arq.bg, color: arq.ink }}>
      <div style={{ ...s('position:absolute;left:-60px;bottom:40px;width:200px;height:200px;border-radius:50%'), background: arq.soft }} />
      <div style={s('position:absolute;inset:0;padding:24px 22px 20px;display:flex;flex-direction:column;gap:12px')}>
        <div style={s('display:flex;justify-content:space-between;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase')}><span>Figurinha do ano</span><span>Coleção 2026</span></div>
        <div style={s('padding:12px;border-radius:28px;background:var(--color-neutral-100);color:var(--color-text);box-shadow:var(--shadow-lg);transform:rotate(-2deg);display:flex;flex-direction:column;gap:10px;outline:6px solid var(--color-bg)')}>
          <div style={s('display:flex;justify-content:space-between;align-items:center')}>
            <span style={s('display:flex;align-items:baseline;gap:2px')}>
              <span style={s('width:40px;height:40px;border-radius:50%;background:var(--color-text);color:var(--color-bg);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:17px')}>{f.num}</span>
              <b style={s('font-size:13px;color:var(--color-neutral-700)')}>/12</b>
            </span>
            <span style={s('padding:5px 12px;border-radius:999px;background:var(--color-accent-300);color:var(--color-accent-900);font-size:12px;font-weight:700')}>{f.rara}</span>
          </div>
          <div style={{ ...s('position:relative;height:164px;border-radius:22px'), background: arq.tint2 }}>
            <div style={{ ...s('position:absolute;left:24px;top:12px;width:140px;height:140px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:26px 8px 0 0;box-sizing:border-box;overflow:hidden'), border: `3px solid ${arq.deep}`, background: arq.tint }}>
              <Tartaruga humor={HUMOR_ARQ[arq.key] || 'feliz'} anim="fixa" size={100} />
            </div>
            <div style={s('position:absolute;right:16px;bottom:14px;width:64px;height:64px;border-radius:50%;background:var(--color-text);color:var(--color-bg);display:flex;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:var(--shadow-md)')}>
              <Icon spec={IC_ARQ[arq.key] || IC_ARQ.p} size={30} />
            </div>
          </div>
          <span style={s('font-family:var(--font-heading);font-size:28px;line-height:1.02;padding:0 4px')}>{arq.nome}</span>
          <div style={s('display:flex;flex-direction:column;gap:8px;padding:0 4px 4px')}>
            {f.eixos.map((x, i) => (
              <div key={i} style={s('display:flex;flex-direction:column;gap:4px')}>
                <div style={s('display:flex;justify-content:space-between;font-size:11px;font-weight:700')}><span>{x.a}</span><span>{x.b}</span></div>
                <div style={s('position:relative;height:10px;border-radius:999px;background:var(--color-neutral-200)')}>
                  <span style={{ ...s('position:absolute;top:-3px;width:16px;height:16px;margin-left:-8px;border-radius:50%'), left: x.pos, background: arq.deep }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={s('display:flex;flex-direction:column;gap:8px;margin-top:6px')}>
          <b style={{ fontSize: 14 }}>Sua coleção: 1 de 12</b>
          <div style={s('display:flex;gap:6px')}>
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} style={{ ...s('width:16px;height:16px;border-radius:50%;box-sizing:border-box'), background: i === 0 ? arq.ink : 'transparent', border: i === 0 ? 'none' : `2px dashed ${arq.ink}` }} />
            ))}
          </div>
          <span style={{ fontSize: 13 }}>Manda pros amigos e troca as repetidas.</span>
        </div>
        <div style={SPACER} />
        {marca && <div style={s('font-size:11px;font-weight:600')}>{MARCA}</div>}
      </div>
    </div>
  );
}

const TEMPLATES = { recibo: Recibo, jornal: Jornal, familia: Familia, boletim: Boletim, avaliacao: Avaliacao, tempo: Tempo, bula: Bula, rg: Rg, figurinha: Figurinha };

// radius=0 na exportação, para o PNG não ter cantos transparentes.
export function FinalRetro({ formato = 'recibo', d, arq, marca = true, radius = 22 }) {
  const T = TEMPLATES[formato] || Recibo;
  return (
    <div style={{ ...s('width:360px;height:640px;position:relative;overflow:hidden;font-family:var(--font-body);color:var(--color-text);background:var(--color-neutral-100)'), borderRadius: radius }}>
      <T d={d} arq={arq} marca={marca} />
    </div>
  );
}
