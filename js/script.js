/* ==========================================================================
   Acompanha — script.js

   Filtro de temas da FAQ e interações do Painel da família.
   O acordeão das perguntas não usa JavaScript: ele é feito com as
   tags <details> e <summary> do próprio HTML.
   ========================================================================== */

// Filtro de temas da FAQ
const botoesFiltro = document.querySelectorAll('.faq .filtro');
const perguntas = document.querySelectorAll('.faq__lista .pergunta');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const tema = botao.dataset.tema;

    // Destaca só o botão clicado
    botoesFiltro.forEach(function (outro) {
      outro.classList.remove('filtro--ativo');
    });
    botao.classList.add('filtro--ativo');

    // Mostra só as perguntas do tema escolhido
    perguntas.forEach(function (pergunta) {
      if (tema === 'todos' || pergunta.dataset.tema === tema) {
        pergunta.classList.remove('escondido');
      } else {
        pergunta.classList.add('escondido');
      }
    });
  });
});

// Painel da família: filtro dos remédios de hoje
const filtrosRemedio = document.querySelectorAll('.painel .filtro');
const remedios = document.querySelectorAll('.remedio');

filtrosRemedio.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const status = botao.dataset.status;

    filtrosRemedio.forEach(function (outro) {
      outro.classList.remove('filtro--ativo');
      outro.setAttribute('aria-pressed', 'false');
    });
    botao.classList.add('filtro--ativo');
    botao.setAttribute('aria-pressed', 'true');

    remedios.forEach(function (remedio) {
      if (status === 'todos' || remedio.dataset.status === status) {
        remedio.classList.remove('escondido');
      } else {
        remedio.classList.add('escondido');
      }
    });
  });
});

// Painel da família: modal "Adicionar remédio"
// O <dialog> fecha sozinho com Esc e com os botões do formulário (method="dialog")
const botaoAbrirModal = document.getElementById('abrir-modal');
const modalRemedio = document.getElementById('modal-remedio');

if (botaoAbrirModal && modalRemedio) {
  botaoAbrirModal.addEventListener('click', function () {
    modalRemedio.showModal();
  });
}
