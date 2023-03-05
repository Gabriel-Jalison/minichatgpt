document.addEventListener('DOMContentLoaded', () => {

// URL base da API do ChatGPT
const baseURL = 'https://api.openai.com/v1/';

// Chave de API do ChatGPT
const OPENAI_API_KEY = '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';

// Elementos HTML
const errorBox = document.getElementById('error');
const input = document.getElementById('input');
const button = document.getElementById('btn');
const chat = document.getElementById('chat');

// Função para enviar a entrada do usuário para o ChatGPT
function sendInputToOpenAI(inputText) {
  // Configuração dos dados a serem enviados para a API do ChatGPT
  const data = {
    engine: 'text-davinci-003',
    prompt: inputText,
    temperature: 0.7,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  // Cabeçalhos HTTP necessários para a autenticação na API do ChatGPT
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'organization': 'org-iyzNZ0t2JrCZoSz24cuBt0we',
  };

  // Envia a solicitação HTTP POST para a API do ChatGPT usando a biblioteca Axios
  axios.post(`${baseURL}engines/text-davinci-003/completions`, JSON.stringify(data), { headers })
    .then((response) => {
      // Exibe a resposta do ChatGPT no chat
      const chatMessage = document.createElement('p');
      chatMessage.innerHTML = `<strong>Chatbot:</strong> ${response.data.choices[0].text}`;
      chat.appendChild(chatMessage);
      errorBox.style.display = 'none';
    })
    .catch((error) => {
      console.log(error);
      errorBox.innerHTML = 'Erro ao enviar a entrada para o ChatGPT.';
      errorBox.style.display = 'block';
    });
}

// Adiciona um evento de clique ao botão Enviar
button.addEventListener('click', () => {
  const inputText = input.value.trim();
  if (inputText !== '') {
    const message = document.createElement('p');
    message.innerHTML = `<strong>Você:</strong> ${inputText}`;
    chat.appendChild(message);
    sendInputToOpenAI(inputText);
    input.value = '';
  }
});

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    button.click();
  }
})

  });