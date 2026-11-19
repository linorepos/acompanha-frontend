/* Acompanha — painel.js: filtro, adicionar e remover lembretes (só na tela, sem salvar) */

// Filtro dos lembretes
const filtrosRemedio = document.querySelectorAll('.painel .filtro');
const listaRemedios = document.querySelector('.remedios');

filtrosRemedio.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const status = botao.dataset.status;

    filtrosRemedio.forEach(function (outro) {
      outro.classList.remove('filtro--ativo');
      outro.setAttribute('aria-pressed', 'false');
    });
  
    botao.classList.add('filtro--ativo');
    botao.setAttribute('aria-pressed', 'true');

    // Busca a cada clique para incluir os lembretes novos
    listaRemedios.querySelectorAll('.remedio').forEach(function (remedio) {
      if (status === 'todos' || remedio.dataset.status === status) {
        remedio.classList.remove('escondido');
      } else {
        remedio.classList.add('escondido');
      }
    });
  });
});

// Modal "Adicionar lembrete"
const botaoAbrirModal = document.getElementById('abrir-modal');
const modalRemedio = document.getElementById('modal-remedio');

botaoAbrirModal.addEventListener('click', function () {
  modalRemedio.showModal();
});

// Campos mudam conforme o tipo (remédio ou consulta)
const campoTipo = document.getElementById('lembrete-tipo');
const rotuloNome = document.getElementById('rotulo-nome');
const campoNome = document.getElementById('lembrete-nome');
const grupoRemedio = document.getElementById('grupo-remedio');
const grupoConsulta = document.getElementById('grupo-consulta');

campoTipo.addEventListener('change', () => {
  const consulta = campoTipo.value === 'consulta';

  rotuloNome.textContent = consulta ? 'Especialidade' : 'Nome do remédio';
  campoNome.placeholder = consulta ? 'Ex: Cardiologista' : 'Ex: Losartana';

  // disabled: o grupo escondido não é validado
  grupoRemedio.hidden = consulta;
  grupoRemedio.disabled = consulta;
  grupoConsulta.hidden = !consulta;
  grupoConsulta.disabled = !consulta;
});

// Salvar: cria o item na lista, na ordem do horário
const campoHorario = document.getElementById('remedio-horario');

// Junta os textos preenchidos com " · "
const juntar = (...textos) => textos.map((texto) => texto.trim()).filter(Boolean).join(' · ');

const valor = (id) => document.getElementById(id).value;

const formLembrete = modalRemedio.querySelector('form');

formLembrete.addEventListener('submit', (evento) => {
  if (evento.submitter.value !== 'salvar') return;

  const horario = campoHorario.value;
  const nome = campoNome.value.trim();
  let linhaDeCima;
  let linhaDeBaixo;

  if (campoTipo.value === 'consulta') {
    linhaDeCima = nome;
    linhaDeBaixo = juntar(valor('lembrete-onde'), valor('lembrete-comentario'));
  } else {
    linhaDeCima = nome + ' ' + valor('lembrete-dosagem').trim();
    linhaDeBaixo = juntar(valor('lembrete-quantidade'), valor('lembrete-quando'));
  }

  const item = document.createElement('li');
  item.className = 'remedio';
  item.dataset.status = 'pendente';
  item.innerHTML = `
    <strong class="remedio__hora"></strong>
    <div class="remedio__textos">
      <strong></strong>
      <span></span>
    </div>
    <span class="etiqueta etiqueta--neutra">Aguardando o horário</span>
    <button type="button" class="remedio__remover">×</button>
  `;

  // textContent: o texto digitado nunca vira código
  item.querySelector('.remedio__hora').textContent = horario;
  item.querySelector('.remedio__textos strong').textContent = linhaDeCima;
  item.querySelector('.remedio__textos span').textContent = linhaDeBaixo;
  item.querySelector('.remedio__remover').setAttribute('aria-label', 'Remover ' + linhaDeCima);

  const depois = [...listaRemedios.querySelectorAll('.remedio')].find(
    (remedio) => remedio.querySelector('.remedio__hora').textContent > horario
  );
  listaRemedios.insertBefore(item, depois || null);

  document.querySelector('.painel .filtro--ativo').click();
  formLembrete.reset();
  campoTipo.dispatchEvent(new Event('change'));
});

// Remover: um ouvinte na lista atende todos os "×", até os novos
listaRemedios.addEventListener('click', (evento) => {
  const botao = evento.target.closest('.remedio__remover');
  if (!botao) return;

  if (confirm(botao.getAttribute('aria-label') + '?')) {
    botao.closest('.remedio').remove();
  }
});
