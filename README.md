# Minha Retro 2026

Retrospectiva do ano em formato de app web, feita pela **Dalmas Studio**. A pessoa responde 10 perguntas rápidas, o app sorteia 1 de 9 "finais" (cards no formato stories, 1080×1920) e ela posta. Compartilhar o próprio final libera os outros 8.

O produto é **gratuito**: a ideia é atrair gente para a Dalmas Studio. Cada card postado leva a marca d'água `retro.dalmasstudio.com.br`.

- Endereço: **https://retro.dalmasstudio.com.br** (deploy preparado, ainda não ativo; ver [Deploy](#deploy))
- Lançamento planejado: 1º/12/2026
- Design de origem: projeto "Retrospectiva 2026 v3" no claude.ai/design

---

## Rodando localmente

Precisa do Node 22.

```bash
npm install
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # gera a versão final em dist/
npm run preview   # serve o dist/ para conferir o build
```

Para ver o layout de desktop, abra numa janela com **900 px ou mais** de largura. Abaixo disso aparece o layout de celular.

Não há backend nem variáveis de ambiente. Tudo roda no navegador da pessoa e **nenhuma resposta sai do aparelho**.

---

## Stack

| O quê | Com o quê |
|---|---|
| App | React 19 + Vite 6, só JavaScript (sem TypeScript) |
| Estilo | Design system "Organic" (`src/tokens.css`) e estilos inline com o helper `s()` |
| Fontes | Caprasimo (títulos) e Figtree (texto), servidas pelo próprio app via `@fontsource`, para saírem certas no PNG |
| Imagem dos cards | `html-to-image`: renderiza o card fora da tela e gera um PNG 1080×1920 |
| Compartilhar | Web Share API (menu nativo do celular); sem suporte, baixa o arquivo |
| Animações | CSS puro, sem biblioteca |

As versões das dependências são fixas no `package.json`.

---

## Estrutura

```
retrospectiva-2026/
├── index.html               # título, descrição, favicons, prévia de link (Open Graph)
├── public/                  # copiado como está para o build
│   ├── favicon.svg          # tartaruga sem fundo (ícone da aba)
│   ├── favicon-48.png       # reserva para navegadores sem SVG
│   └── apple-touch-icon.png # 180×180 com fundo bege (tela inicial do iPhone)
├── src/
│   ├── main.jsx             # ponto de entrada: fontes, CSS e <App/>
│   ├── App.jsx              # estado, fluxo das telas e layout de celular
│   ├── Desktop.jsx          # layouts de tela larga (>= 900 px)
│   ├── partes.jsx           # peças usadas no celular e no desktop
│   ├── data.js              # TODO o conteúdo: perguntas, perfis, reações
│   ├── FinalRetro.jsx       # os 9 cards (360×640)
│   ├── Tartaruga.jsx        # mascote animado
│   ├── export.js            # gera o PNG, compartilha, baixa, copia
│   ├── Fit.jsx              # escala um conteúdo de tamanho fixo para caber no espaço
│   ├── useDesktop.js        # diz se a tela tem >= 900 px
│   ├── Icon.jsx             # ícones (traço, estilo Lucide)
│   ├── css.js               # s('a:b;c:d') → objeto de estilo do React
│   ├── tokens.css           # design system Organic (cores, raios, sombras, botões)
│   └── app.css              # estilos do app e animações da tartaruga
├── deploy/nginx-retro.conf  # configuração do subdomínio no nginx
├── .github/workflows/deploy.yml
└── dalmas-*.svg             # arquivos originais da marca (não entram no build)
```

---

## Como o app funciona

### Telas

```
entrada → 10 perguntas → sorteio → seu final → outros 8 finais → galeria
```

| Tela | O que acontece |
|---|---|
| **Entrada** | Apresentação, leque com 3 cards de exemplo, tartaruga respirando |
| **Perguntas** | 10 perguntas. A cada resposta, a tartaruga reage com uma frase e a tela avança sozinha depois de 1,8 s |
| **Sorteio** | "Calculando seu ano…" (tartaruga andando e pensando), roleta dos 9 finais e comemoração (tartaruga pulando) |
| **Seu final** | O card sorteado, com o botão de postar |
| **Outros 8 finais** | Grade 3×3 com os outros finais borrados e com cadeado até a pessoa compartilhar |
| **Galeria** | Navega pelos 9 finais já liberados, posta qualquer um ou baixa os 9 |

O estado mora todo num `useState` em `App.jsx` (`tela`, `qi`, `ans`, `sorteado`, `reacao`, `liberado`…). Não há roteador nem armazenamento: recarregar a página começa do zero.

### Perfil (arquétipo)

Cada opção de resposta tem um **voto** num dos 6 perfis. A nota do ano também conta. O perfil mais votado define as cores e os textos do card (`calcArq` em `data.js`):

| Chave | Perfil |
|---|---|
| `v` | Ano da Virada |
| `s` | Modo Sobrevivência Ativado |
| `p` | Plantei, Ainda Não Colhi |
| `t` | Protagonista |
| `z` | Paz Interior Desbloqueada |
| `c` | Caos Organizado |

### Os 9 finais

Definidos em `FORMATOS` (`data.js`) e desenhados em `FinalRetro.jsx`:

- Cupom fiscal do ano
- Manchete de jornal
- Grupo da família
- Boletim escolar
- Avaliação do ano
- Previsão do tempo
- Bula de 2027
- Identidade do ano
- Figurinha da coleção

Todos têm 360×640 e viram PNG 1080×1920 (`pixelRatio: 3`). Os textos de cada card vêm de `montaDados(respostas, perfil)`.

### Desbloqueio

Os outros 8 finais liberam quando a pessoa **compartilha, baixa ou copia** o próprio final (`liberar` em `App.jsx`). Se ela abrir o menu de compartilhar e cancelar, nada é liberado.

> O navegador não tem como confirmar que a pessoa postou de verdade, só que compartilhou ou salvou a imagem. O desbloqueio é na confiança, de propósito.

### Gerar e postar a imagem (`export.js`)

- `gerarPng`: monta o card fora da tela, espera as fontes carregarem e gera o PNG. O `App` guarda o resultado em cache por formato e já gera o PNG do final sorteado assim que a tela "Seu final" abre, para o botão responder na hora.
- `compartilhar`: abre o menu nativo do celular. Sem suporte, baixa o arquivo.
- `copiarImagem`: copia o PNG para colar no WhatsApp ou Instagram Web (desktop).
- `baixarTodos`: baixa os 9 finais.

### Celular × desktop

É o **mesmo app**: `useDesktop()` troca só a disposição a partir de 900 px.

- **Celular** (`App.jsx`): uma coluna; o botão principal é "Postar nos stories".
- **Desktop** (`Desktop.jsx`): card grande ao lado de um painel. O botão principal é "Baixar imagem", com "Copiar imagem" e "Compartilhar" (este quando o navegador suporta). Atalhos de teclado (sem aviso na tela):

| Tela | Teclas |
|---|---|
| Perguntas | 1–9 escolhem a opção · Enter avança · Esc volta |
| Galeria | ← → trocam o final · Esc fecha |

Regra do projeto: **mudança no desktop não pode alterar o celular.** O que é comum aos dois fica em `partes.jsx`.

---

## Editando o conteúdo (`src/data.js`)

Quase tudo que é texto está em `data.js`.

### Perguntas: `QS`

Cada pergunta tem um `tipo`:

| Tipo | Como aparece |
|---|---|
| `opcoes` | Cards em 2 colunas; `livre: true` adiciona o campo "Ou escreva a sua" |
| `emoji` | Grade de emojis |
| `nota` | Barrinha de 0 a 10 |
| `texto` | Campo livre e opcional; pode ter sugestões em `opcoes` (é o caso da música ou série) |

Cada opção é criada com `o(texto, voto, reação, extras)`:

```js
o('Fui promovido(a)', 't', 'Chefe!', {
  recibo: ['Promoção', '+R$ 800'],         // linha do cupom fiscal
  curto: 'promoção',                        // versão curta (boletim, manchete)
  nota: '9,5',                              // nota no boletim
  man: ['Promoção abala o escritório', 'Colegas pedem aumento também.'], // manchete
  review: 'No trabalho, fui promovido(a).', // avaliação do ano
  efeito: 'promoção',                       // efeito colateral na bula
  chat: 'Fui promovido(a)!',                // sua resposta no grupo da família
  tia: 'Orgulho!!! Vou mandar pra todo mundo' // resposta da tia
})
```

Os campos extras mudam de pergunta para pergunta, porque cada uma alimenta cards diferentes:

| Pergunta | Campos extras |
|---|---|
| 1. Palavra do ano | `art` (artigo na manchete: "um Recomeço") |
| 4. Amor | `recibo`, `curto`, `nota`, `man`, `review`, `contra`, `vo` |
| 5. Trabalho/estudo | `recibo`, `curto`, `nota`, `man`, `review`, `efeito`, `chat`, `tia` |
| 6. Maior conquista | `recibo`, `curto`, `nota`, `man`, `review` |
| 7. Algo que largou | `recibo`, `curto`, `nota` |
| 8. Música ou série | `cat` (etiqueta "música · artista") |
| 9. "Esse ano vai" | `valor`, `nota`, `cont`, `man` |

> **Ao criar uma opção nova, preencha todos os campos da pergunta**, senão algum card sai com buraco. Hoje toda pergunta de escolha tem pelo menos 8 opções.

As **sugestões de música e série** vieram dos rankings do 1º semestre de 2026. Revise perto do lançamento.

### Reações da tartaruga: `HUMOR_FRASES`

Cada frase de reação pertence a um humor. Frase fora da lista usa `feliz`.

```js
const HUMOR_FRASES = {
  festa:    ['Chefe!', 'Decolou', ...],
  risada:   ['Socorro kkkk', ...],
  surpresa: ['Reviravolta!', ...],
  triste:   ['Ai, doeu até aqui', ...],
  choro:    ['Chorei aqui', ...],
  amor:     ['Casalzão!', ...],
  calma:    ['Mó paz', ...],
  pensando: ['Entendemos tudo']
};
```

Para mudar como ela reage a uma frase, mova a frase de grupo.

### Outros ajustes

| Constante | Para que serve |
|---|---|
| `ARQS` | Os 6 perfis: nome, texto, cores e falas usadas nos cards |
| `FORMATOS` | Nome e ícone dos 9 finais |
| `CALC` | Frases da tela "Calculando seu ano…" |
| `TA`, `TB`, `TH` | Duração (ms) do cálculo, da roleta e da pausa no resultado |
| `REACOES` | Liga/desliga as reações nas perguntas |
| `MARCA` (`FinalRetro.jsx`) | Texto da marca d'água dos cards |
| `SITE` (`export.js`) | Link que vai junto ao compartilhar |

O tempo que a reação fica na tela (1,8 s) está em `reagir`, no `App.jsx`.

---

## Mascote (`src/Tartaruga.jsx`)

A tartaruga da Dalmas Studio, montada em partes (patas, rabo, cabeça, olho, boca, casco) para animar cada uma. Ela vem de `dalmas-tartaruga-icone.svg`.

```jsx
<Tartaruga humor="festa" anim="pula" size={104} />
```

| `humor` | Cara | `anim` | Movimento |
|---|---|---|---|
| `feliz` | sorriso | `parada` | respira e pisca |
| `festa` | olhos fechados, boca aberta, confete | `fala` | balança a cabeça |
| `risada` | igual festa + "kk" | `anda` | patinhas e rabo |
| `surpresa` | boca em "o" + "!" | `pula` | salta (sombra encolhe) |
| `triste` | pálpebra caída, boca pra baixo | `treme` | chacoalha rindo |
| `choro` | pálpebra caída + lágrima | `susto` | pulinho pra trás |
| `amor` | olho de coração + corações | `murcha` | abaixa a cabeça |
| `calma` | olhos fechados sorrindo + "zz" | `zen` | flutua devagar |
| `pensando` | olha pra cima + pontinhos | `fixa` | parada (usado nos cards) |

`ANIM_DO_HUMOR` diz qual movimento combina com cada humor (usado na bolha das perguntas).

**Onde ela aparece:**
- Na entrada.
- Ao lado de cada reação nas perguntas.
- No sorteio.
- Nos cards: na Identidade (foto 3×4) e na Figurinha, com a cara mudando conforme o perfil (`HUMOR_ARQ` em `FinalRetro.jsx`).

Nos cards ela usa `anim="fixa"`, porque o card vira foto e não pode sair no meio de uma piscada. Quem configurou o aparelho para reduzir movimento vê a tartaruga parada.

As animações ficam em `app.css` (classes `.tart-*` e `@keyframes tart*`).

---

## Deploy

Destino: `retro.dalmasstudio.com.br`, na mesma VPS da landing da Dalmas Studio. O app é estático: basta servir a pasta `dist/`.

**Já está pronto no repositório:**
- `.github/workflows/deploy.yml`: a cada push na `main`, faz `npm ci`, `npm run build` e copia o `dist/` por SCP para `/home/dalmas/apps/dalmasstudio/retro`. Apaga a versão anterior antes de copiar.
- `deploy/nginx-retro.conf`: bloco do nginx. Os arquivos de `assets/` (com hash no nome) ficam com cache longo; o `index.html` fica sem cache, para a versão nova aparecer logo.

**Falta fazer:**
1. **Repositório:** esta pasta ainda não é um repositório Git. Rodar `git init`, criar o repositório no GitHub e cadastrar os secrets `VPS_HOST`, `VPS_USER` e `VPS_SSH_KEY` (os mesmos da landing).
2. **DNS:** criar o registro `retro` (tipo A) apontando para o IP da VPS.
3. **nginx:** incluir o bloco de `deploy/nginx-retro.conf`. Se o nginx rodar em Docker, montar `/home/dalmas/apps/dalmasstudio/retro` dentro do container e ajustar o `root`.
4. **HTTPS:** depois que o DNS propagar, rodar `certbot --nginx -d retro.dalmasstudio.com.br`.

---

## Decisões e limitações

- **Sem pagamento.** Havia um Pix no design original; foi removido quando o app virou gratuito.
- **Sem estatísticas.** Não há contagem de visitas. Se precisar no futuro, os caminhos avaliados foram:
  - eventos lidos no log do nginx;
  - uma tabela no Supabase;
  - Umami.
- **Privacidade.** As respostas não saem do aparelho. Não há cookies, cadastro nem chamadas para servidor.
- **Marca d'água fixa.** Ela está em todos os cards, porque é o que divulga a Dalmas Studio.

## Pendências

- [ ] Ativar o deploy (repositório Git, DNS, nginx, certbot)
- [ ] Imagem de prévia do link (`og:image`, 1200×630) para WhatsApp e Instagram
- [ ] Revisar as sugestões de música e série perto do lançamento
- [ ] Testar o compartilhamento num iPhone e num Android de verdade
- [ ] Opcional: assinatura "feito pela Dalmas Studio" com link para a landing (os logos `dalmas-logo-*.svg` já estão na pasta)
