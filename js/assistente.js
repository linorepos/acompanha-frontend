/* Acompanha — assistente.js: Webchat que conversa com o chatbot no Node-RED (texto e voz) */

(function () {
  const lista = document.getElementById('chat-mensagens');
  const formulario = document.getElementById('chat-form');
  const campo = document.getElementById('chat-texto');
  const botaoEnviar = document.getElementById('chat-enviar');
  const erro = document.getElementById('chat-erro');
  const status = document.getElementById('chat-status');
  const botaoMic = document.getElementById('microfone');
  const textoMic = document.getElementById('microfone-texto');

  const acoes = document.getElementById('chat-acoes');
  const botaoSair = document.getElementById('chat-sair');
  const CHAVE_NOME = 'acompanha-nome';

  let nome = '';
  let sessao = '';     // contexto da conversa no Node-RED
  let enviando = false;
  let gravador = null;

  document.querySelectorAll('.link-telegram').forEach(function (link) {
    link.href = ACOMPANHA_CONFIG.telegramUrl;
  });

  function mostrarErro(texto) {
    erro.textContent = texto;
    campo.classList.toggle('chat__campo--erro', Boolean(texto));
  }

  function atualizarStatus(conectado) {
    status.textContent = conectado ? 'Online · conectado ao assistente' : 'Sem conexão com o assistente';
    status.classList.toggle('chat__offline', !conectado);
  }

  function adicionarMensagem(texto, autor, alerta) {
    const item = document.createElement('li');
    item.className = 'balao balao--' + autor + (alerta ? ' balao--alerta' : '');
    item.textContent = texto;
    lista.appendChild(item);
    lista.scrollTop = lista.scrollHeight;
    return item;
  }

  function mostrarDigitando() {
    const item = document.createElement('li');
    item.className = 'balao balao--assistente balao--digitando';
    item.setAttribute('aria-label', 'O Acompanha está escrevendo');
    for (let i = 0; i < 3; i++) {
      item.appendChild(document.createElement('span'));
    }
    lista.appendChild(item);
    lista.scrollTop = lista.scrollHeight;
    return item;
  }

  function falar(texto) {
    if (!('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = 'pt-BR';
    fala.rate = 0.9;   // fala mais devagar
    window.speechSynthesis.speak(fala);
  }

  // Envia ao Node-RED; se falhar, avisa em vez de inventar resposta
  async function perguntar(texto) {
    const controle = new AbortController();
    const relogio = setTimeout(function () { controle.abort(); }, ACOMPANHA_CONFIG.tempoLimite);
    try {
      const resposta = await fetch(ACOMPANHA_CONFIG.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto, sessao: sessao, nome: nome }),
        signal: controle.signal
      });
      if (!resposta.ok) {
        throw new Error('HTTP ' + resposta.status);
      }
      const dados = await resposta.json();
      atualizarStatus(true);
      return dados;
    } catch (e) {
      atualizarStatus(false);
      return null;
    } finally {
      clearTimeout(relogio);
    }
  }

  async function enviar(texto, porVoz) {
    const mensagem = texto.trim();
    if (enviando) {
      return;
    }
    if (!mensagem) {
      mostrarErro('Escreva uma mensagem ou toque em uma das sugestões.');
      campo.focus();
      return;
    }
    mostrarErro('');
    if (!nome) {
      entrar(mensagem);
      campo.value = '';
      return;
    }
    enviando = true;
    botaoEnviar.disabled = true;
    botaoMic.disabled = true;
    adicionarMensagem(mensagem, 'idoso');
    campo.value = '';

    const digitando = mostrarDigitando();
    const dados = await perguntar(mensagem);
    digitando.remove();
    if (dados) {
      const resposta = dados.resposta || 'Desculpe, não entendi. Pode repetir?';
      adicionarMensagem(resposta, 'assistente', dados.intencao === 'pedir_ajuda');
      if (porVoz) {
        falar(resposta);
      }
    } else {
      mostrarErro('Não consegui falar com o assistente agora. Tente de novo em instantes ou use o Telegram.');
    }

    enviando = false;
    botaoEnviar.disabled = false;
    botaoMic.disabled = false;
    (porVoz ? botaoMic : campo).focus();
  }

  // Login: o chat pede o nome
  function perguntarNome() {
    adicionarMensagem('Olá! Eu sou o Acompanha. Para começar, qual é o seu nome?', 'assistente');
  }

  function entrar(texto) {
    if (texto.length < 2 || texto.length > 40) {
      mostrarErro('Digite o seu nome, com 2 a 40 letras.');
      return;
    }
    adicionarMensagem(texto, 'idoso');
    nome = texto;
    sessao = 'site-' + texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
    try {
      sessionStorage.setItem(CHAVE_NOME, nome);
    } catch (e) {
    }
    adicionarMensagem('Prazer, ' + nome + '! Posso lembrar seus remédios, suas consultas ou chamar alguém da família. Como posso ajudar?', 'assistente');
    acoes.classList.remove('escondido');
    botaoSair.classList.remove('escondido');
    campo.placeholder = 'Ou escreva aqui...';
  }

  function sair() {
    try {
      sessionStorage.removeItem(CHAVE_NOME);
    } catch (e) {
    }
    nome = '';
    sessao = '';
    lista.textContent = '';
    acoes.classList.add('escondido');
    botaoSair.classList.add('escondido');
    campo.placeholder = 'Seu nome';
    perguntarNome();
  }

  // Voz: grava no navegador e o Node-RED transcreve
  function paraBase64(blob) {
    return new Promise(function (resolve, reject) {
      const leitor = new FileReader();
      leitor.onload = function () { resolve(String(leitor.result).split(',')[1] || ''); };
      leitor.onerror = reject;
      leitor.readAsDataURL(blob);
    });
  }

  async function transcrever(blob) {
    try {
      const resposta = await fetch(ACOMPANHA_CONFIG.transcreverUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: await paraBase64(blob), tipo: blob.type, sessao: sessao })
      });
      const dados = await resposta.json();
      return resposta.ok ? dados.texto : '';
    } catch (e) {
      return '';
    }
  }

  function mostrarEstadoMic(estado) {
    botaoMic.classList.toggle('microfone--ouvindo', estado === 'ouvindo');
    botaoMic.setAttribute('aria-pressed', String(estado === 'ouvindo'));
    textoMic.textContent = {
      ouvindo: 'Estou ouvindo... toque para enviar',
      entendendo: 'Entendendo a sua voz...'
    }[estado] || 'Toque aqui e fale';
  }

  async function iniciarGravacao() {
    mostrarErro('');
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      mostrarErro('Este navegador não grava áudio. Escreva a mensagem ou abra o Telegram.');
      return;
    }
    let fluxo;
    try {
      fluxo = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      mostrarErro('Não consegui usar o microfone. Permita o acesso no cadeado ao lado do endereço, ou escreva a mensagem.');
      return;
    }

    const pedacos = [];
    const rec = new MediaRecorder(fluxo);
    rec.ondataavailable = function (evento) { pedacos.push(evento.data); };
    rec.onstop = async function () {
      fluxo.getTracks().forEach(function (faixa) { faixa.stop(); });
      gravador = null;
      mostrarEstadoMic('entendendo');
      botaoMic.disabled = true;
      const texto = await transcrever(new Blob(pedacos, { type: rec.mimeType }));
      botaoMic.disabled = false;
      mostrarEstadoMic('parado');
      if (texto) {
        enviar(texto, true);
      } else {
        mostrarErro('Não entendi o que você disse. Tente de novo ou escreva a mensagem.');
      }
    };
    rec.start();
    gravador = rec;
    mostrarEstadoMic('ouvindo');
  }

  // Eventos
  botaoMic.addEventListener('click', function () {
    if (gravador) {
      gravador.stop();
    } else if (!enviando) {
      iniciarGravacao();
    }
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    enviar(campo.value, false);
  });

  campo.addEventListener('input', function () {
    if (campo.value.trim()) {
      mostrarErro('');
    }
  });

  document.querySelectorAll('.sugestao').forEach(function (botao) {
    botao.addEventListener('click', function () {
      enviar(botao.textContent, false);
    });
  });

  botaoSair.addEventListener('click', sair);

  perguntarNome();
  try {
    if (sessionStorage.getItem(CHAVE_NOME)) {
      entrar(sessionStorage.getItem(CHAVE_NOME));
    }
  } catch (e) {
  }

  // Ao abrir, confere se o Node-RED está no ar
  fetch(ACOMPANHA_CONFIG.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto: '' })
  }).then(function () { atualizarStatus(true); }, function () { atualizarStatus(false); });
})();
