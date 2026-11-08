// Conteúdo do app: perguntas, arquétipos, formatos e montagem dos dados dos cards.
// Portado do design "Retrospectiva 2026 v3" (claude.ai/design).

const o = (label, voto, reacao, x) => ({ label, voto, reacao, ...(x || {}) });
export const QS = [
  { titulo: 'Uma palavra que define seu 2026', tipo: 'opcoes', livre: true, placeholder: 'Ou escreva a sua', opcoes: [
    o('Intenso', 'c', 'Intensidade é o sobrenome', { art: '' }), o('Recomeço', 'v', 'Respeita o recomeço', { art: 'um ' }), o('Caótico', 'c', 'Socorro kkkk', { art: '' }),
    o('Leve', 'z', 'Mó paz', { art: '' }), o('Corrido', 'p', 'Nem deu tempo de piscar', { art: '' }), o('Surpreendente', 't', 'Reviravolta!', { art: '' }),
    o('Desafiador', 's', 'Mas você deu conta', { art: '' }), o('Divertido', 't', 'Bom demais!', { art: '' })] },
  { titulo: 'Que nota você dá para o ano?', tipo: 'nota' },
  { titulo: 'O emoji do seu ano', tipo: 'emoji', opcoes: [
    o('🔥', 't', 'Pegando fogo, hein'), o('😮‍💨', 's', 'Ufa, né?'), o('🌱', 'p', 'Crescendo, adoro'), o('🎢', 'c', 'Que montanha-russa'),
    o('😌', 'z', 'Mó paz'), o('🏆', 't', 'Campeão(ã)!'), o('💸', 's', 'O boleto venceu, né'), o('❤️‍🩹', 'v', 'Coração em obras'),
    o('✨', 'z', 'Brilhou'), o('🫠', 's', 'Derretendo kkkk'), o('🚀', 't', 'Decolou'), o('🌊', 'c', 'Onda atrás de onda')] },
  { titulo: 'Como foi o ano no amor?', tipo: 'opcoes', opcoes: [
    o('Solteiro(a) e em paz', 'z', 'Livre, leve e solto', { recibo: ['Solteirice com paz', 'GRÁTIS'], curto: 'solteiro(a) em paz', nota: '9,0', man: ['Solteirice segue invicta', 'Nenhum boleto a dois registrado.'], review: 'No amor, paz total.', contra: 'mensagem de ex às 2h da manhã', vo: 'Tá cedo ainda' }),
    o('Namorando firme', 'z', 'Casalzão!', { recibo: ['Namoro firme', 'R$ 1.314'], curto: 'namoro firme', nota: '9,5', man: ['Casal resiste a mais um ano', 'Fontes confirmam: ainda se aguentam.'], review: 'No amor, atendimento nota 10.', contra: 'briga por mensagem', vo: 'Quando é o casamento?' }),
    o('Rolo eterno', 'c', 'Eita.', { recibo: ['Rolo sem definição (12 meses)', 'R$ ???'], curto: 'rolo sem nome', nota: '4,5', man: ['Rolo completa 12 meses sem definição', 'Nem eles sabem o que são.'], review: 'O setor amoroso deixou a desejar: 12 meses esperando uma definição.', contra: 'rolo sem definição', vo: 'o que é isso' }),
    o('Casamento à vista', 'v', 'Me chama pra padrinho!', { recibo: ['Entrada do casamento', 'R$ 30.000'], curto: 'casamento à vista', nota: '10', man: ['Casamento à vista, confirma cartório', 'Lista de presentes já circula.'], review: 'No amor, surpresa boa: casamento à vista.', contra: 'lista com mais de 300 convidados', vo: 'Vou fazer o bolo!' }),
    o('Levei um vácuo histórico', 's', 'Ai, doeu até aqui', { recibo: ['Vácuo histórico', '-R$ 50'], curto: 'vácuo histórico', nota: '3,0', man: ['Mensagem segue sem resposta', 'Visualizada às 23h47, sem retorno.'], review: 'O atendimento no amor foi péssimo: levei um vácuo histórico.', contra: 'mandar mensagem depois da meia-noite', vo: 'coitadinho(a)' }),
    o('Prefiro não comentar', 'z', 'Entendemos tudo', { recibo: ['Vida amorosa', 'SIGILO'], curto: 'sem comentários', nota: '?', man: ['Vida amorosa segue sob sigilo', 'Assessoria não quis comentar.'], review: 'Sobre o amor, prefiro não comentar.', contra: 'pergunta da tia no almoço de domingo', vo: 'hmmm' }),
    o('Conheci alguém', 't', 'Ihhh, conta tudo!', { recibo: ['Crush novo', 'R$ 0,00 (ainda)'], curto: 'crush novo', nota: '8,5', man: ['Crush novo é avistado na cidade', 'Amigos já shippam o casal.'], review: 'No amor, apareceu alguém interessante.', contra: 'stalkear o crush às 3h da manhã', vo: 'Traz pra almoçar domingo!' }),
    o('Terminei, e tô bem', 'p', 'Fase de crescimento', { recibo: ['Término com dignidade', '-R$ 200'], curto: 'término digno', nota: '7,0', man: ['Término é superado em tempo recorde', 'Fontes dizem que já postou foto nova.'], review: 'No amor, terminei e fiquei bem.', contra: 'olhar os stories do(a) ex', vo: 'Melhor assim, meu bem' })] },
  { titulo: 'E no trabalho ou estudo?', tipo: 'opcoes', opcoes: [
    o('Fui promovido(a)', 't', 'Chefe!', { recibo: ['Promoção', '+R$ 800'], curto: 'promoção', nota: '9,5', man: ['Promoção abala o escritório', 'Colegas pedem aumento também.'], review: 'No trabalho, fui promovido(a).', efeito: 'promoção', chat: 'Fui promovido(a)!', tia: 'Orgulho!!! Vou mandar pra todo mundo' }),
    o('Mudei de emprego', 'v', 'Crachá novo, vida nova', { recibo: ['Crachá novo', 'R$ 0,00'], curto: 'crachá novo', nota: '9,0', man: ['Crachá novo é visto na cidade', 'Mudança de emprego confirmada.'], review: 'Troquei de emprego no meio do caminho.', efeito: 'crachá novo', chat: 'Mudei de emprego!', tia: 'Orgulho!!! Tem vaga pro seu primo?' }),
    o('Me formei', 't', 'Diploma na mão!', { recibo: ['Diploma', 'R$ 48.000'], curto: 'diploma na mão', nota: '10', man: ['Diploma chega após anos de luta', 'Família já encomendou o quadro.'], review: 'Me formei, finalmente.', efeito: 'diploma na parede', chat: 'Me formei!', tia: 'Orgulho!!! Cadê a foto de beca?' }),
    o('Sobrevivi às segundas', 's', 'Herói das segundas', { recibo: ['52 segundas-feiras', 'R$ 52,00'], curto: 'sobreviveu às segundas', nota: '6,0', man: ['Pessoa sobrevive a 52 segundas', 'Café foi decisivo, dizem fontes.'], review: 'No trabalho, sobrevivi às segundas.', efeito: 'resistência às segundas', chat: 'Sobrevivi às segundas', tia: 'Força!!! Segunda que vem tem mais' }),
    o('Empreendi', 'p', 'Virou patrão(oa)!', { recibo: ['CNPJ aberto', 'R$ 79,90'], curto: 'abriu CNPJ', nota: '8,0', man: ['Novo CNPJ é aberto na cidade', 'Primeiros clientes: a família.'], review: 'Abri meu próprio negócio.', efeito: 'CNPJ ativo', chat: 'Abri meu negócio!', tia: 'Orgulho!!! Faz desconto pra família?' }),
    o('Esgotado(a), mas com estilo', 'c', 'Descansa, pelo amor', { recibo: ['Esgotamento com estilo', 'R$ 300'], curto: 'esgotou com estilo', nota: '5,0', man: ['Esgotamento é registrado com estilo', 'Férias seguem pendentes.'], review: 'No trabalho, cheguei ao limite, mas com estilo.', efeito: 'vontade de tirar férias', chat: 'Tô esgotado(a)', tia: 'Descansa, meu bem!!!' }),
    o('Tirei férias de verdade', 'z', 'Merecido demais', { recibo: ['Férias sem notebook', 'R$ 2.400'], curto: 'férias de verdade', nota: '9,0', man: ['Férias acontecem sem abrir o e-mail', 'Chefe ainda não acredita.'], review: 'No trabalho, tirei férias de verdade.', efeito: 'bronzeado de férias', chat: 'Tirei férias!', tia: 'Que delícia!!! Manda foto da praia' }),
    o('Tô procurando emprego', 's', 'Vai aparecer, confia', { recibo: ['Currículos enviados', 'R$ 0,00'], curto: 'buscando vaga', nota: '6,5', man: ['Currículo é enviado pela 47ª vez', 'LinkedIn registra recorde de acessos.'], review: 'No trabalho, fiquei na busca por vaga.', efeito: 'currículo atualizado', chat: 'Tô procurando emprego', tia: 'Vou perguntar no grupo da igreja!!!' })] },
  { titulo: 'Sua maior conquista', tipo: 'opcoes', livre: true, placeholder: 'Ou escreva a sua', opcoes: [
    o('Viajei pra longe', 'v', 'Passaporte carimbado', { recibo: ['Passagem pra longe', '12x R$ 99'], curto: 'viagem longa', nota: '9,0', man: ['Viagem longa deixa saudade', 'Fotos ainda não acabaram.'], review: 'Viajei pra longe.' }),
    o('Cuidei da saúde', 'z', 'Corpo agradece', { recibo: ['Academia (fui mesmo)', 'R$ 109'], curto: 'cuidou da saúde', nota: '8,5', man: ['Academia confirma presença', 'Recepcionista já sabe seu nome.'], review: 'Cuidei da saúde.' }),
    o('Juntei uma grana', 'p', 'Rico(a) quase', { recibo: ['Reserva de emergência', 'GUARDADO'], curto: 'juntou grana', nota: '8,0', man: ['Reserva de emergência sobrevive', 'Banco estranha o saldo.'], review: 'Juntei uma grana.' }),
    o('Mudei de casa', 'v', 'Casa nova, vida nova', { recibo: ['40 caixas de mudança', 'R$ 0,00'], curto: 'casa nova', nota: '8,5', man: ['Mudança termina após 40 caixas', 'Três seguem fechadas.'], review: 'Mudei de casa.' }),
    o('Aprendi algo novo', 'p', 'Cérebro turbinado', { recibo: ['Curso novo', 'R$ 197'], curto: 'curso novo', nota: '8,5', man: ['Curso novo é concluído', 'Certificado já está no perfil.'], review: 'Aprendi muita coisa nova.' }),
    o('Fiquei bem comigo', 'z', 'Isso vale ouro', { recibo: ['Amor-próprio', 'INESTIMÁVEL'], curto: 'ficou bem consigo', nota: '10', man: ['Paz interior é registrada', 'Terapeuta comemora.'], review: 'Fiquei bem comigo.' }),
    o('Tirei a CNH', 't', 'Bi-bi! Sai da frente', { recibo: ['CNH aprovada', 'R$ 3.200'], curto: 'tirou a CNH', nota: '9,0', man: ['CNH é aprovada após muita baliza', 'Ruas da cidade em alerta.'], review: 'Tirei a carteira de motorista.' }),
    o('Paguei minhas dívidas', 's', 'Nome limpo, alma leve', { recibo: ['Dívidas quitadas', 'R$ 0,00'], curto: 'quitou as dívidas', nota: '9,5', man: ['Nome sai do vermelho após anos', 'Banco manda até parabéns.'], review: 'Paguei todas as minhas dívidas.' })] },
  { titulo: 'Algo que você largou', tipo: 'opcoes', opcoes: [
    o('Um vício', 'v', 'Orgulho!', { recibo: ['Desconto: larguei o vício', '-R$ 400'], curto: 'largou o vício', nota: '10' }),
    o('Um relacionamento', 'v', 'Livramento', { recibo: ['Desconto: livramento', '-R$ 1.000'], curto: 'livramento', nota: '10' }),
    o('Um emprego', 'v', 'Corajoso(a)', { recibo: ['Desconto: pedi as contas', '-R$ 1.500'], curto: 'pediu as contas', nota: '10' }),
    o('O sedentarismo', 't', 'Bora, atleta!', { recibo: ['Desconto: larguei o sofá', '-R$ 120'], curto: 'largou o sofá', nota: '9,0' }),
    o('A procrastinação', 'c', 'Depois a gente comemora kkkk', { recibo: ['Desconto: parei de enrolar', '-R$ 300'], curto: 'parou de enrolar', nota: '8,0' }),
    o('Gente que me fazia mal', 'z', 'Proteção ativada', { recibo: ['Desconto: gente tóxica', '-R$ 800'], curto: 'cortou gente tóxica', nota: '10' }),
    o('O cheque especial', 's', 'Ufa, que alívio', { recibo: ['Desconto: saí do vermelho', '-R$ 2.000'], curto: 'saiu do vermelho', nota: '9,5' }),
    o('Nada, guardei tudo', 'z', 'Acumulador(a) de energias', { recibo: ['Nada foi largado', 'R$ 0,00'], curto: 'guardou tudo', nota: '2,0' })] },
  // Sugestões tiradas dos rankings de 2026 (Pro-Música 1º semestre; Netflix/JustWatch). Trocar perto do lançamento se mudar o hit.
  { titulo: 'A música ou série que marcou', tipo: 'texto', livre: true, placeholder: 'Ou escreva outra', opcoes: [
    o('Eu Te Seguro', '', 'Hino do ano!', { cat: 'música · Panda' }), o('Jetski', '', 'Já tô dançando aqui', { cat: 'música · Pedro Sampaio' }),
    o('Posso Até Não Te Dar Flores', '', 'Romântico(a), hein', { cat: 'música · DJ Japa NK' }), o('P do Pecado', '', 'Pagodeiro(a) raiz!', { cat: 'música · Menos é Mais' }),
    o('Dele & Dela', '', 'Maratonou, né?', { cat: 'série · Netflix' }), o('The Boys', '', 'Sem spoiler, por favor!', { cat: 'série · Prime Video' }),
    o('One Piece', '', 'Bora pro Grand Line!', { cat: 'série · Netflix' }), o('A Origem', '', 'Nacional é outro nível', { cat: 'série · Globoplay' })] },
  { titulo: 'Quantas vezes você disse "esse ano vai"?', tipo: 'opcoes', opcoes: [
    o('Nenhuma, fui realista', 'z', 'Pé no chão', { valor: '0x', nota: '3,0', cont: 'nenhuma vez', man: ['"Esse ano vai" some do vocabulário', 'Realismo surpreende a família.'] }),
    o('Só no Réveillon', 'v', 'Clássico!', { valor: '1x', nota: '5,0', cont: 'uma vez, na virada', man: ['"Esse ano vai" é dito só na virada', 'Com taça na mão, como manda a tradição.'] }),
    o('De 1 a 3 vezes', 'p', 'Controlado(a)', { valor: '3x', nota: '6,0', cont: '3 vezes', man: ['"Esse ano vai" é dito com moderação', 'Foram só 3 vezes.'] }),
    o('Umas 10', 'p', 'Fé inabalável', { valor: '10x', nota: '8,0', cont: '10 vezes', man: ['"Esse ano vai" chega a 10', 'Fé segue inabalável.'] }),
    o('Toda segunda-feira', 'p', 'Segunda é sempre o dia', { valor: '52x', nota: '9,0', cont: '52 vezes', man: ['"Esse ano vai" volta toda segunda', 'Academia agradece a matrícula.'] }),
    o('Escrevi até na parede', 't', 'Manifestou!', { valor: '100x', nota: '10', cont: 'mais de 100 vezes', man: ['"Esse ano vai" vira mural no quarto', 'Vizinhos confirmam os post-its.'] }),
    o('Todo santo dia', 's', 'Persistência nível máximo', { valor: '365x', nota: '10', cont: '365 vezes', man: ['"Esse ano vai" é dito 365 vezes', 'Um por dia, sem falta.'] }),
    o('Perdi a conta', 'c', 'Nós também kkkk', { valor: '∞', nota: '10', cont: 'infinitas vezes', man: ['"Esse ano vai" bate recorde', 'Contagem perdida em março.'] })] },
  { titulo: 'Uma frase para o você de 2027', tipo: 'opcoes', livre: true, placeholder: 'Ou escreva a sua', opcoes: [
    o('Vai com calma, vai dar certo', '', 'Anotado pra 2027'), o('Bebe água e dorme cedo', '', 'Conselho de mãe'), o('Você já é suficiente', '', 'Chorei aqui'),
    o('Agora vai (de verdade)', '', 'Agora vai!'), o('Não aceita menos', '', 'Isso!'), o('Respira, você tá indo bem', '', 'Respirei junto aqui'),
    o('Menos print, mais vida', '', 'Anotado e printado kkkk'), o('Se joga sem medo', '', 'Vai com tudo!')] }
];
export const ARQS = {
  v: { key: 'v', nome: 'Ano da Virada', texto: 'Virou a chave e saiu do outro lado diferenciado. Ano de cria, tá pago.', bg: 'var(--color-accent-500)', ink: 'var(--color-accent-900)', soft: 'var(--color-accent-400)', tint: 'var(--color-accent-100)', tint2: 'var(--color-accent-200)', deep: 'var(--color-accent-800)', cor: '#d67f48',
    prof: 'mudou de carteira no meio do ano, mas se adaptou muito bem.', resp: 'Obrigado pela visita! Pra 2027 preparamos mais reviravoltas, das boas.', indic: 'Pra quem virou a chave em 2026 e quer manter o embalo.', filiacao: 'Coragem e Café', naturalidade: 'Ponto de virada', num: '01', pct: 9, eixos: [45, 35, 12],
    tempo: { temp: 30, cond: 'Virada de tempo com sol', maxmin: 'Máx. 38° de coragem · Mín. 15° de medo', amor: 'frente quente chegando, e dessa vez é recíproca', grana: 'Pix caindo que não é de volta de amigo', trampo: 'ventos de mudança vindo do leste' } },
  s: { key: 's', nome: 'Modo Sobrevivência Ativado', texto: 'Foi no modo economia de bateria, mas chegou. Sobreviveu, tá pago. Merece um feriadão.', bg: 'var(--color-accent-800)', ink: 'var(--color-accent-100)', soft: 'var(--color-accent-700)', tint: 'var(--color-accent-100)', tint2: 'var(--color-accent-200)', deep: 'var(--color-accent-800)', cor: '#643312',
    prof: 'chegou atrasado(a) todo dia, mas chegou. Isso conta.', resp: 'Pedimos desculpas pelos transtornos. 2027 vem com bateria extra.', indic: 'Pra quem chegou em dezembro no modo economia de bateria.', filiacao: 'Boleto e Café', naturalidade: 'Modo avião', num: '02', pct: 14, eixos: [30, 85, 50],
    tempo: { temp: 19, cond: 'Nublado, mas com abertura', maxmin: 'Máx. 25° de energia · Mín. 3° de bateria', amor: 'garoa fina de gente que responde rápido', grana: '13º durando até fevereiro (mentira)', trampo: 'calmaria depois da tempestade' } },
  p: { key: 'p', nome: 'Plantei, Ainda Não Colhi', texto: 'Ralou que nem doido e a colheita tá a caminho. Confia no processo.', bg: 'var(--color-accent-2-700)', ink: 'var(--color-accent-2-100)', soft: 'var(--color-accent-2-600)', tint: 'var(--color-accent-2-100)', tint2: 'var(--color-accent-2-200)', deep: 'var(--color-accent-2-800)', cor: '#56633f',
    prof: 'conversa demais no grupo da família, mas tem muito potencial.', resp: 'Agradecemos o retorno! A colheita já está a caminho. Volte sempre.', indic: 'Pra quem plantou muito em 2026 e ainda não colheu.', filiacao: 'Boleto e Fé', naturalidade: 'Grupo da família', num: '03', pct: 6, eixos: [62, 55, 20],
    tempo: { temp: 28, cond: 'Chuva boa pra colheita', maxmin: 'Máx. 35° de energia · Mín. 12° de paciência', amor: 'a sementinha vai brotar no outono', grana: 'colheita prevista pro segundo semestre', trampo: 'ventos de promoção vindo do leste' } },
  t: { key: 't', nome: 'Protagonista', texto: 'O ano foi seu e o resto foi figurante. Energia de protagonista, sem condições.', bg: 'var(--color-accent-300)', ink: 'var(--color-accent-900)', soft: 'var(--color-accent-200)', tint: 'var(--color-accent-100)', tint2: 'var(--color-accent-200)', deep: 'var(--color-accent-800)', cor: '#ffc6a5',
    prof: 'sentou na primeira fileira o ano todo. Exemplo pra turma.', resp: 'Que honra receber você! Já reservamos o camarote de 2027.', indic: 'Pra quem foi protagonista e não quer perder o papel.', filiacao: 'Holofote e Autoestima', naturalidade: 'Palco principal', num: '04', pct: 4, eixos: [50, 12, 35],
    tempo: { temp: 36, cond: 'Sol forte o ano inteiro', maxmin: 'Máx. 42° de holofote · Mín. 30° de autoestima', amor: 'pancadas de pretendentes, organize por senha', grana: 'sol forte, passe protetor no cartão', trampo: 'céu aberto pra aumento e bônus' } },
  z: { key: 'z', nome: 'Paz Interior Desbloqueada', texto: 'Botou o grupo da família no silencioso e entrou no modo mó paz. Drama? Não conheço.', bg: 'var(--color-accent-2-300)', ink: 'var(--color-accent-2-900)', soft: 'var(--color-accent-2-200)', tint: 'var(--color-accent-2-100)', tint2: 'var(--color-accent-2-200)', deep: 'var(--color-accent-2-800)', cor: '#ccdbb2',
    prof: 'nunca se envolveu em briga. Às vezes nem respondia a chamada.', resp: 'Ficamos felizes com a sua paz. Prometemos manter o silêncio.', indic: 'Pra quem descobriu a paz e não quer devolver.', filiacao: 'Chá e Silêncio', naturalidade: 'Grupo no silencioso', num: '05', pct: 11, eixos: [90, 50, 78],
    tempo: { temp: 24, cond: 'Céu limpo, sem drama', maxmin: 'Máx. 26° de calma · Mín. 22° de calma', amor: 'brisa leve, sem briga por mensagem', grana: 'reserva de emergência intacta', trampo: 'tempo firme, sem reunião à toa' } },
  c: { key: 'c', nome: 'Caos Organizado', texto: 'Aconteceu tudo ao mesmo tempo e, sei lá como, deu bom. Ninguém entendeu, nem você.', bg: 'var(--color-accent-2-800)', ink: 'var(--color-accent-2-100)', soft: 'var(--color-accent-2-700)', tint: 'var(--color-accent-2-100)', tint2: 'var(--color-accent-2-200)', deep: 'var(--color-accent-2-800)', cor: '#3d472b',
    prof: 'entregou tudo no último minuto, e tudo certo. Ninguém entende.', resp: 'Também não entendemos o que aconteceu, mas obrigado por ficar até o fim.', indic: 'Pra quem viveu tudo ao mesmo tempo e quer repetir (com planilha).', filiacao: 'Planilha e Improviso', naturalidade: 'Três rolês ao mesmo tempo', num: '06', pct: 8, eixos: [10, 40, 18],
    tempo: { temp: 27, cond: 'Sol, chuva e granizo no mesmo dia', maxmin: 'Máx. 40° de caos · Mín. 2° de plano', amor: 'tempestade de romance que ninguém entende', grana: 'dinheiro some e aparece, tipo mágica', trampo: 'redemoinho de tarefas, mas com planilha' } }
};
export const ORDEM = ['v', 's', 'p', 't', 'z', 'c'];
export const STAR = 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';
export const FORMATOS = [
  { id: 'recibo', nome: 'Cupom fiscal do ano', ic: [['path', { d: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z' }], ['path', { d: 'M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8' }], ['path', { d: 'M12 17.5v-11' }]] },
  { id: 'jornal', nome: 'Manchete de jornal', ic: [['path', { d: 'M15 18h-5' }], ['path', { d: 'M18 14h-8' }], ['path', { d: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2' }], ['rect', { width: 8, height: 4, x: 10, y: 6, rx: 1 }]] },
  { id: 'familia', nome: 'Grupo da família', ic: [['path', { d: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z' }]] },
  { id: 'boletim', nome: 'Boletim escolar', ic: [['path', { d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z' }], ['path', { d: 'M22 10v6' }], ['path', { d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' }]] },
  { id: 'avaliacao', nome: 'Avaliação do ano', ic: [['path', { d: STAR }]] },
  { id: 'tempo', nome: 'Previsão do tempo', ic: [['path', { d: 'M12 2v2' }], ['path', { d: 'm4.93 4.93 1.41 1.41' }], ['path', { d: 'M20 12h2' }], ['path', { d: 'm19.07 4.93-1.41 1.41' }], ['path', { d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128' }], ['path', { d: 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z' }]] },
  { id: 'bula', nome: 'Bula de 2027', ic: [['path', { d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z' }], ['path', { d: 'm8.5 8.5 7 7' }]] },
  { id: 'rg', nome: 'Identidade do ano', ic: [['path', { d: 'M16 10h2' }], ['path', { d: 'M16 14h2' }], ['path', { d: 'M6.17 15a3 3 0 0 1 5.66 0' }], ['circle', { cx: 9, cy: 11, r: 2 }], ['rect', { x: 2, y: 5, width: 20, height: 14, rx: 2 }]] },
  { id: 'figurinha', nome: 'Figurinha da coleção', ic: [['path', { d: 'M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z' }], ['path', { d: 'M14 3v4a2 2 0 0 0 2 2h4' }], ['path', { d: 'M8 13h.01' }], ['path', { d: 'M16 13h.01' }], ['path', { d: 'M10 16s.8 1 2 1c1.3 0 2-1 2-1' }]] }
];
export const EXEMPLO = { 0: 'Recomeço', 1: 8, 2: '🌱', 3: 'Rolo eterno', 4: 'Mudei de emprego', 5: 'Aprendi algo novo', 6: 'Um emprego', 7: 'Ainda Estou Aqui', 8: 'Perdi a conta', 9: 'Vai com calma, vai dar certo' };
export const CALC = ['Somando os perrengues...', 'Contando os "esse ano vai"...', 'Consultando o grupo da família...'];
export const TA = 1500, TB = 2800, TH = 900;
export const REACOES = true;

// Reação da tartaruga para cada frase (ver Tartaruga.jsx). Frase sem entrada aqui = 'feliz'.
const HUMOR_FRASES = {
  festa: ['Pegando fogo, hein', 'Campeão(ã)!', 'Brilhou', 'Decolou', 'Chefe!', 'Diploma na mão!', 'Virou patrão(oa)!', 'Passaporte carimbado',
    'Orgulho!', 'Corajoso(a)', 'Fé inabalável', 'Agora vai!', 'Isso!', 'Ano de cria!', 'Bom demais!', 'Bora, atleta!', 'Nome limpo, alma leve',
    'Manifestou!', 'Vai com tudo!', 'Hino do ano!', 'Pagodeiro(a) raiz!', 'Bora pro Grand Line!'],
  risada: ['Socorro kkkk', 'Derretendo kkkk', 'Herói das segundas', 'Rico(a) quase', 'Acumulador(a) de energias', 'Nós também kkkk',
    'Bi-bi! Sai da frente', 'Depois a gente comemora kkkk', 'Segunda é sempre o dia', 'Anotado e printado kkkk', 'Já tô dançando aqui', 'Maratonou, né?'],
  surpresa: ['Intensidade é o sobrenome', 'Nem deu tempo de piscar', 'Reviravolta!', 'Que montanha-russa', 'Onda atrás de onda', 'Eita.',
    'Cérebro turbinado', 'Persistência nível máximo', 'Raspando, mas foi', 'Sem spoiler, por favor!'],
  triste: ['O boleto venceu, né', 'Ai, doeu até aqui', 'Descansa, pelo amor', 'Abraço apertado'],
  choro: ['Coração em obras', 'Chorei aqui'],
  amor: ['Crescendo, adoro', 'Casalzão!', 'Me chama pra padrinho!', 'Isso vale ouro', 'Conselho de mãe', 'Bom gosto', 'Ihhh, conta tudo!', 'Romântico(a), hein', 'Nacional é outro nível'],
  calma: ['Mó paz', 'Ufa, né?', 'Livre, leve e solto', 'Corpo agradece', 'Livramento', 'Pé no chão', 'Sem trilha, tudo bem',
    'Fase de crescimento', 'Merecido demais', 'Proteção ativada', 'Ufa, que alívio', 'Respirei junto aqui'],
  pensando: ['Entendemos tudo']
};
const HUMOR_DA_FRASE = Object.fromEntries(Object.entries(HUMOR_FRASES).flatMap(([h, fs]) => fs.map(f => [f, h])));
export const humorDaReacao = frase => HUMOR_DA_FRASE[frase] || 'feliz';

function opt(i, v) { return (QS[i].opcoes || []).find(x => x.label === v); }
function pick(i, ans, def) { return opt(i, ans[i]) || opt(i, def); }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
export function calcArq(ans) {
  const pts = { v: 0, s: 0, p: 0, t: 0, z: 0, c: 0 };
  QS.forEach((q, i) => { const x = opt(i, ans[i]); if (x && x.voto) pts[x.voto] += 1; });
  const n = ans[1] ?? 7;
  pts[n >= 8 ? 't' : n >= 6 ? 'v' : n >= 4 ? 'p' : 's'] += 1;
  return ORDEM.reduce((b, k) => (pts[k] > pts[b] ? k : b), 'v');
}
export function montaDados(ans, arq) {
  const palavra = ans[0] || 'Intenso';
  const p0 = opt(0, ans[0]);
  const nota = ans[1] ?? 7;
  const emoji = ans[2] || '✨';
  const amor = pick(3, ans, 'Prefiro não comentar');
  const trab = pick(4, ans, 'Sobrevivi às segundas');
  const conq = opt(5, ans[5]) || (ans[5] ? { curto: ans[5], nota: '10', recibo: [ans[5], 'TÁ PAGO'], review: 'Maior conquista: ' + ans[5] + '.', man: ['Conquista do ano: ' + ans[5], 'Família comemora em silêncio.'] } : opt(5, 'Fiquei bem comigo'));
  const larg = pick(6, ans, 'Nada, guardei tudo');
  const trilha = ans[7] || '';
  const esse = pick(8, ans, 'Perdi a conta');
  const recibo = [{ item: 'Palavra do ano: ' + palavra, valor: '1 un' }].concat([amor, trab, conq, larg].map(x => ({ item: x.recibo[0], valor: x.recibo[1] })), [{ item: '"Esse ano vai"', valor: esse.valor }]);
  if (trilha) recibo.push({ item: 'Trilha: ' + trilha, valor: 'SEM PARAR' });
  const L = (nome, cor, txt) => ({ nome, cor, txt, align: 'flex-start', radius: '18px 18px 18px 6px', bg: 'var(--color-neutral-100)', fg: 'var(--color-text)' });
  const R = txt => ({ nome: '', txt, align: 'flex-end', radius: '18px 18px 6px 18px', bg: 'var(--color-accent-200)', fg: 'var(--color-accent-900)' });
  const linha = (materia, obs, n) => { const v = parseFloat(String(n).replace(',', '.')); const baixa = isNaN(v) || v < 6; return { materia, obs, nota: n, baixa, alta: !baixa }; };
  const realista = esse.label === 'Nenhuma, fui realista';
  const t = arq.tempo;
  return {
    palavra, emoji, nota: String(nota), recibo,
    jornal: {
      art: p0 ? p0.art : '',
      lead: 'Fontes próximas (você mesmo) confirmam: ' + trab.curto + ', ' + conq.curto + ' e ' + amor.curto + ' no amor. Nota final do ano: ' + nota + '.',
      notas: [amor.man, trab.man, esse.man, trilha ? [trilha + ' vira trilha oficial', 'Tocou tanto que os vizinhos decoraram.'] : conq.man].map(([a, b]) => ({ t: a, s: b }))
    },
    chat: [L('Tia Neide', 'var(--color-accent-700)', 'E aí, como foi o ano??'), R('Resumindo: ' + palavra + ' ' + emoji), L('Tio Beto', 'var(--color-accent-2-700)', 'E o namoro, hein?'), R(amor.label), L('Vó', 'var(--color-accent-800)', amor.vo), L('Mãe', 'var(--color-accent-600)', 'E o trabalho, filho(a)?'), R(trab.chat), L('Tia Neide', 'var(--color-accent-700)', trab.tia)],
    boletim: {
      linhas: [linha('Amor', amor.curto, amor.nota), linha('Trabalho', trab.curto, trab.nota), linha('Conquistas', conq.curto, conq.nota), linha('Desapego', larg.curto, larg.nota), linha('Fé', '"esse ano vai" ' + esse.valor, esse.nota)],
      obs: arq.prof, selo: nota >= 5 ? 'Aprovado(a)' : 'Recuperação', seloCor: nota >= 5 ? 'var(--color-accent-2-700)' : 'var(--color-accent-700)'
    },
    aval: {
      rating: (nota / 2).toFixed(1).replace('.', ','),
      estrelas: [0, 1, 2, 3, 4].map(i => ({ fill: i < Math.round(nota / 2) ? 'currentColor' : 'none' })),
      review: 'Lugar movimentado. ' + trab.review + ' ' + conq.review + ' ' + amor.review + ' Voltaria? Só se o próximo for ' + (nota >= 7 ? 'igual.' : 'melhor.'),
      resposta: arq.resp, chips: ['Bom pra: ' + palavra.toLowerCase(), 'Categoria: ' + arq.nome, 'Sinal: só no trampo']
    },
    tempo: { ...t, e1: t.temp + 3, e2: t.temp - 6, e3: t.temp - 12, e4: t.temp - 1, alerta: realista ? 'Alerta: só 10% de chance de você dizer "esse ano vai" em janeiro. Realista demais.' : 'Alerta: 90% de chance de você dizer "esse ano vai" em janeiro' },
    bula: { indic: arq.indic, contra: cap(amor.contra) + ' e dizer "esse ano vai" (você já disse ' + esse.cont + ').', efeitos: 'Crescimento pessoal, ' + trab.efeito + ' e vontade incontrolável de postar isso.' },
    rg: { registro: '26.0' + arq.num + '.2026-' + arq.key.toUpperCase(), filiacao: arq.filiacao, naturalidade: arq.naturalidade },
    fig: {
      num: arq.num, rara: (arq.pct <= 5 ? 'Lendária' : arq.pct <= 8 ? 'Rara' : arq.pct <= 11 ? 'Incomum' : 'Comum') + ' · ' + arq.pct + '% das pessoas',
      eixos: [['Caos', 'Calma'], ['Conquista', 'Sobrevivência'], ['Mudança', 'Estabilidade']].map(([a, b], i) => ({ a, b, pos: arq.eixos[i] + '%' }))
    }
  };
}
