# 🩺 Acompanha — Assistente por Voz para Idosos

> **Tecnologia que fala a língua de quem mais precisa de cuidado.**
> Projeto desenvolvido pela equipe **CitizenTech** (Turma **1TDSPR** — Análise e Desenvolvimento de Sistemas, FIAP) para a **Global Solution 2026**.

## 📋 Sobre o Projeto

Muitos idosos que moram sozinhos precisam administrar diversos medicamentos diariamente. Esquecer uma dose, ou tomá-la em duplicidade, é um risco frequente, e aplicativos tradicionais exigem boa visão, coordenação motora fina e memória.

O **Acompanha** resolve esse problema invertendo a lógica de uso:
* **Para o idoso:** zero botões pequenos ou digitação. Ele recebe lembretes de medicamentos e consultas por **áudio no Telegram** e confirma tudo falando.
* **Para o familiar ou cuidador:** toda a configuração (remédios, horários, consultas e contatos) é feita pelo navegador. Se o idoso não confirmar em até 30 minutos, ou der uma resposta confusa, a família recebe um alerta e pode acompanhar o histórico semanal (ex.: *"esqueceu 3 vezes esta semana"*).

### 🌍 Alinhamento com os ODS (ONU)
* **ODS 3:** Saúde e bem-estar
* **ODS 10:** Redução das desigualdades


## 🖥️ Páginas
| Página | Arquivo | Conteúdo |
| :--- | :--- | :--- |
| **Início** | `index.html` | Identificação da solução, exemplo de conversa no Telegram, "Como funciona", "Por que isso importa" e prévia da FAQ. |
| **Sobre** | `sobre.html` | Problema, objetivo, proposta, público-alvo e tecnologias da solução. |
| **FAQ** | `faq.html` | Perguntas frequentes com filtro por tema e acordeão. |
| **Integrantes** | `integrantes.html` | Nome, RM, turma, foto, função, GitHub e LinkedIn de cada integrante. |
| **Contato** | `contato.html` | Dados de contato da equipe e formulário (nome, e-mail, assunto e mensagem). |
| **Painel da família** | `painel.html` | *Página da solução 1* — já no menu; conteúdo a desenvolver. |
| **Assistente** | `assistente.html` | *Página da solução 2*: **Webchat do chatbot** (botão "Testar o assistente" no menu). Ver a seção "Chatbot e Webchat" abaixo. |

---

## 🤖 Chatbot e Webchat (AI & Chatbot)

A página `assistente.html` é o **Webchat do chatbot do Acompanha**. **Tudo o que foi desenvolvido nela (conversa, voz, sugestões, painel lateral) existe para cumprir os requisitos da matéria de AI & Chatbot**, em especial o item *Webchat em texto*. Não é um enfeite do site: é a porta de entrada do chatbot pelo navegador.

O Webchat conversa com o **mesmo chatbot do Telegram**, o fluxo do Node-RED em [`chatbot/acompanha_chatbot_nodered.json`](chatbot/acompanha_chatbot_nodered.json). Conforme a mudança oficial do professor, o watsonx não é usado: a IA vem de LLM via conectores (Groq) no Node-RED.

| Requisito de AI & Chatbot | Onde está |
| :--- | :--- |
| 5 intenções (`lembrete_remedio`, `confirmar_medicacao`, `consulta`, `pedir_ajuda`, `falar_familiar`) | Catálogo no nó "Monta prompt" do fluxo; a resposta do LLM vem como `{intencao, entidades, resposta}` |
| 5 entidades com sinônimos (`medicamento`, `horario`, `dia`, `familiar`, `unidade_saude`) | Mesmo catálogo, no fluxo |
| Variável de contexto | O Webchat manda um `sessao` por aba; o Node-RED guarda o contexto por conversa (o Telegram usa o `chat_id`) |
| **Webchat em texto** | `assistente.html` + `css/assistente.css` + `js/assistente.js` (esta página) |
| Telegram com texto e áudio (STT + TTS) | Fluxo do Node-RED (Whisper para ouvir, Gemini TTS para falar); o Webchat também grava a voz e o Node-RED transcreve pelo Whisper |
| Vídeo com narração | Fora deste repositório |

### Como funciona o Webchat

- **Login por chat:** a primeira mensagem do chatbot pede o nome. O nome identifica a pessoa e a sessão (contexto da conversa no Node-RED); o botão "Sair" volta ao início. É só identificação, sem senha.
- **Texto:** o chat envia `POST` para o `apiUrl` de [`js/config.js`](js/config.js) com `{texto, sessao}` e mostra a `resposta`. Se a intenção for `pedir_ajuda`, o balão ganha o destaque laranja de alerta.
- **Voz:** o botão grande grava no navegador e o Node-RED transcreve com o Whisper (`transcreverUrl`). A resposta é lida em voz alta.
- **Sem conexão:** se o Node-RED não responder, o chat avisa e sugere o Telegram.

### Como rodar o chatbot

1. Instale o Node-RED, importe `chatbot/acompanha_chatbot_nodered.json` e faça o Deploy.
2. Cadastre as chaves **direto no Node-RED** (Groq e Gemini nos nós do fluxo, token do Telegram no nó do bot). **Nunca coloque chaves ou tokens no repositório**: ele é público. O fluxo versionado só tem espaços reservados.
3. Confira o endereço em `js/config.js` (padrão `http://localhost:1880/acompanha/mensagem`).
4. Ative o CORS no `settings.js` do Node-RED e reinicie: `httpNodeCors: { origin: "*", methods: "GET,POST,OPTIONS" }`.
5. Abra `assistente.html` com o Live Server do VS Code.

Para abrir o site por HTTPS (GitHub Pages), o Node-RED também precisa estar em HTTPS (túnel do ngrok ou Cloudflare), porque o navegador bloqueia chamadas de HTTPS para `http://localhost`.

## 🛠️ Tecnologias Utilizadas

### Front-End (este repositório)
* **HTML5 semântico:** `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `details` e `summary`.
* **CSS3:** arquivo externo, variáveis de cor e layout feito somente com **Flexbox**.
* **JavaScript puro:** arquivos externos em `/js`: filtro de temas da FAQ (`script.js`) e Webchat do chatbot (`assistente.js`).
* **Google Fonts:** *Manrope*, *Montserrat* e *Atkinson Hyperlegible*.

### Ecossistema da solução (outras disciplinas)
* **Chatbot e orquestração:** IBM watsonx Assistant + Node-RED + Telegram (áudio ↔ texto).
* **Back-end e regras de negócio:** Java (DDD) e Python.
* **Banco de dados:** modelo descritivo, DER e modelo lógico.


## 🎨 Identidade Visual

| Uso | Cor |
| :--- | :--- |
| Cor principal (azul-marinho sóbrio) | `#1E2F5E` |
| Alerta (laranja, em detalhes: passo do alerta, "O problema", palavras de risco e foco do teclado) | `#F97316`  `#C2410C` |
| Fundo (off-white) | `#F8FAFC` |
| Texto principal (cinza-escuro) | `#1E293B` |
| Assistente: botões "Testar / Conversar com o assistente" | `#0E7C74` |
| Assistente: balões de resposta do chatbot | `#E3F1EF` |
| Dados e valores em destaque | `#0B6A77` |


## 📁 Estrutura de Pastas

```
acompanha/
├── index.html
├── sobre.html
├── faq.html
├── integrantes.html
├── contato.html
├── painel.html                      # Página da solução 1 (a desenvolver)
├── assistente.html                  # Página da solução 2: Webchat do chatbot
├── README.md
├── .gitignore
├── chatbot/
│   └── acompanha_chatbot_nodered.json  # Fluxo do chatbot no Node-RED (sem chaves)
├── css/
│   ├── style.css                    # Estilos de todas as páginas, organizados por seção
│   └── assistente.css               # Estilos do Webchat do chatbot
├── js/
│   ├── script.js                    # Filtro da FAQ (menu e validação entram depois)
│   ├── config.js                    # Endereço do Node-RED e link do Telegram
│   └── assistente.js                # Webchat: conversa com o Node-RED
└── assets/
    ├── images/
    │   ├── logo-acompanha@1x.png     # Logo completo do cabeçalho (telas comuns)
    │   ├── logo-acompanha@2x.png     # Mesmo logo para telas de alta densidade
    │   ├── logo-acompanha@3x.png     # Mesmo logo para telas de densidade muito alta
    │   ├── logo-acompanha-branco.png # Versão para fundo escuro
    │   ├── logo-texto-branco.png     # Texto "Acompanha" do rodapé
    │   └── integrantes/              # Fotos dos integrantes
    └── icons/
        ├── favicon.png               # Ícone da aba do navegador
        ├── icone-rosto.png           # Rosto do Acompanha
        └── icone-conectividade.png   # Ondas de voz
```

## 👥 Autores

| Nome completo | RM | Turma | GitHub | LinkedIn |
| :--- | :--- | :--- | :--- | :--- |
| João Pedro Estrutti Amaral | 575088 | 1TDSPR | [GitHub](https://github.com/EstruttiJP) | [LinkedIn](https://www.linkedin.com/in/joao-pedro-estrutti/) |
| Lucas Lino | 574843 | 1TDSPR | [GitHub](https://github.com/linorepos) | [LinkedIn](https://www.linkedin.com/in/lucas230lino) |
| Munir Assis | 569917 | 1TDSPR | [GitHub](https://github.com/MunirAssis) | [LinkedIn](https://www.linkedin.com/in/munir-f-assis) |
| João Tinem  | 576501 | 1TDSPR | [GitHub](https://github.com/JoaoVitorTinem) | [LinkedIn](https://www.linkedin.com/in/joão-vitor-tinem-35bbb4442) |

---

## 🔗 Repositório

https://github.com/linorepos/acompanha-frontend

## 📬 Contato

adm.acompanha@gmail.com · ou pelo formulário da página

---


