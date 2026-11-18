// Configuração do Webchat do Acompanha.
// Troque os valores abaixo e o site passa a conversar com o Node-RED de verdade.
const ACOMPANHA_CONFIG = {
  // Endereço do Webchat no fluxo do Node-RED (nó "POST /acompanha/mensagem").
  // Com o Node-RED rodando no mesmo computador: http://localhost:1880/acompanha/mensagem
  // Para apresentar de outro aparelho, use o endereço do túnel (ngrok, Cloudflare Tunnel...).
  apiUrl: 'http://localhost:1880/acompanha/mensagem',

  // Endereço que transcreve o áudio gravado no Webchat (Whisper, no mesmo fluxo do Node-RED).
  transcreverUrl: 'http://localhost:1880/acompanha/transcrever',

  // Tempo máximo de espera pela resposta da IA, em milissegundos.
  tempoLimite: 20000,

  // Link do bot no Telegram.
  telegramUrl: 'https://t.me/AcompanhaBot'
};
