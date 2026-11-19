/* Acompanha — faq.js: filtro de temas da FAQ */

const botoesFiltro = document.querySelectorAll('.faq .filtro');
const perguntas = document.querySelectorAll('.faq__lista .pergunta');

botoesFiltro.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const tema = botao.dataset.tema;

    botoesFiltro.forEach(function (outro) {
      outro.classList.remove('filtro--ativo');
    });
    botao.classList.add('filtro--ativo');

    perguntas.forEach(function (pergunta) {
      if (pergunta.dataset.tema === tema) {
        pergunta.classList.remove('escondido');
      } else {
        pergunta.classList.add('escondido');
      }
    });
  });
});

// Começa mostrando o tema marcado
document.querySelector('.faq .filtro--ativo').click();
