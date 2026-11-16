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
| **Assistente** | `assistente.html` | *Página da solução 2* (Webchat) — botão "Testar o assistente" no menu; conteúdo a desenvolver. |

---

## 🛠️ Tecnologias Utilizadas

### Front-End (este repositório)
* **HTML5 semântico:** `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `details` e `summary`.
* **CSS3:** arquivo externo, variáveis de cor e layout feito somente com **Flexbox**.
* **JavaScript puro:** arquivo externo em `/js`. Por enquanto só o filtro de temas da FAQ.
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
├── assistente.html                  # Página da solução 2 (a desenvolver)
├── README.md
├── .gitignore
├── css/
│   └── style.css                    # Estilos de todas as páginas, organizados por seção
├── js/
│   └── script.js                    # Filtro da FAQ (menu e validação entram depois)
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


