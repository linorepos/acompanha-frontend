/* Acompanha — contato.js: validação do formulário de contato */

const formContato = document.querySelector("#form-contato");
const botaoEnviar = document.querySelector("#botao-enviar");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoAssunto = document.querySelector("#assunto");
const campoMensagem = document.querySelector("#mensagem");
const avisoNome = document.querySelector("#erro-nome");
const avisoEmail = document.querySelector("#erro-email");
const avisoAssunto = document.querySelector("#erro-assunto");
const avisoMensagem = document.querySelector("#erro-mensagem");
const statusEnvio = document.querySelector("#status-contato");

// Regras de cada campo
const regexNome = /^[A-Za-zÀ-ÿ\s]{3,}$/; // só letras e espaços, mínimo 3
const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i; // nome@dominio.com
const regexAssunto = /^.{3,}$/; // mínimo 3
const regexMensagem = /^[\s\S]{10,}$/; // mínimo 10

// Mostra o erro e devolve true se o campo for inválido
const campoInvalido = (campo, aviso, regex, mensagem) => {
  if (!regex.test(campo.value.trim())) {
    aviso.textContent = mensagem;
    campo.classList.add("campo__entrada--erro");
    return true;
  }

  aviso.textContent = "";
  campo.classList.remove("campo__entrada--erro");
  return false;
};

botaoEnviar.addEventListener("click", (e) => {
  e.preventDefault();

  const nomeInvalido = campoInvalido(campoNome, avisoNome, regexNome, "Digite seu nome, só com letras (mínimo 3)");
  const emailInvalido = campoInvalido(campoEmail, avisoEmail, regexEmail, "Digite um e-mail válido, ana@exemplo.com");
  const assuntoInvalido = campoInvalido(campoAssunto, avisoAssunto, regexAssunto, "Digite o assunto (mínimo 3 caracteres)");
  const mensagemInvalida = campoInvalido(campoMensagem, avisoMensagem, regexMensagem, "Escreva sua mensagem (mínimo 10 caracteres)");

  if (nomeInvalido || emailInvalido || assuntoInvalido || mensagemInvalida) {
    statusEnvio.textContent = "";
    return;
  }

  statusEnvio.textContent = "Mensagem enviada! Responderemos em breve.";
  formContato.reset();
});
