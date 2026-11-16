/* ==========================================================================
   Acompanha — script.js

   Por enquanto só tem o filtro de temas da FAQ.
   O acordeão das perguntas não usa JavaScript: ele é feito com as
   tags <details> e <summary> do próprio HTML.
   ========================================================================== */

// Filtro de temas da FAQ
const botoesFiltro = document.querySelectorAll('.filtro');
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
