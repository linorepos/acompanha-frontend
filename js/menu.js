/* Acompanha — menu.js: abre e fecha o menu hambúrguer */

const botaoMenu = document.querySelector(".menu-botao");
const navegacao = document.querySelector("#navegacao");

botaoMenu.addEventListener("click", () => {
  const aberto = navegacao.classList.toggle("navegacao--aberta");

  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
