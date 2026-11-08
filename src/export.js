// Gera o PNG 1080x1920 de um final no próprio celular e compartilha/baixa.
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { toBlob } from 'html-to-image';
import { FinalRetro } from './FinalRetro.jsx';

const SITE = 'https://retro.dalmasstudio.com.br';

export async function gerarPng({ formato, d, arq }) {
  await new Promise(r => setTimeout(r, 0)); // sai de qualquer render/efeito em andamento antes do flushSync
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-10000px;top:0;width:360px;height:640px;pointer-events:none;';
  document.body.appendChild(host);
  const root = createRoot(host);
  try {
    flushSync(() => root.render(createElement(FinalRetro, { formato, d, arq, radius: 0 })));
    await document.fonts.ready;
    const blob = await toBlob(host.firstChild, { width: 360, height: 640, pixelRatio: 3, cacheBust: true });
    if (!blob) throw new Error('Falha ao gerar a imagem');
    return new File([blob], `minha-retro-2026-${formato}.png`, { type: 'image/png' });
  } finally {
    root.unmount();
    host.remove();
  }
}

function baixar(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function baixarTodos(files) {
  for (const f of files) baixar(f);
}

// O menu de compartilhar aceita arquivos? (no desktop, depende do navegador e do sistema)
export const podeCompartilhar = (() => {
  try { return !!navigator.canShare?.({ files: [new File([''], 'x.png', { type: 'image/png' })] }); }
  catch { return false; }
})();

// Copia o PNG pra área de transferência. Recebe a Promise do arquivo e precisa ser
// chamada direto no clique: o ClipboardItem com Promise preserva o gesto do usuário.
export function copiarImagem(arquivo) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') return Promise.reject(new Error('sem suporte'));
  return navigator.clipboard.write([new ClipboardItem({ 'image/png': arquivo })]);
}

// Retorna 'shared' | 'downloaded' | 'cancelled'.
export async function compartilhar(files) {
  if (navigator.canShare && navigator.canShare({ files })) {
    try {
      await navigator.share({ files, text: `Meu 2026 em ${files.length > 1 ? 'cards' : 'um card'}. Faça a sua: ${SITE}` });
      return 'shared';
    } catch (err) {
      if (err && err.name === 'AbortError') return 'cancelled';
      // outros erros: cai no download
    }
  }
  baixarTodos(files);
  return 'downloaded';
}
