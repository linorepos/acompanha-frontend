// Configuração do Webchat: endereços do Node-RED e link do Telegram
const ACOMPANHA_CONFIG = {
  // Mensagens de texto (em outro aparelho, use o endereço do túnel HTTPS)
  apiUrl: 'http://localhost:1880/acompanha/mensagem',

  // Transcrição do áudio (Whisper)
  transcreverUrl: 'http://localhost:1880/acompanha/transcrever',

  // Tempo máximo de espera, em ms
  tempoLimite: 20000,

  telegramUrl: 'https://t.me/AcompanhaBot'
};
