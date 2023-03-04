const baseURL = 'https://api.openai.com/v1/';

function sendInputToOpenAI(inputText) {
  const data = {
    engine: 'davinci',
    prompt: inputText,
    max_tokens: 100,
    n: 1,
    stop: ['\n']
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
  };
  axios.post(`${baseURL}engines/davinci/completions`, data, { headers })
    .then((response) => {
      const chatBox = document.getElementById('chat');
      const chatMessage = document.createElement('p');
      chatMessage.innerHTML = `<strong>Chatbot:</strong> ${response.data.choices[0].text}`;
      chatBox.appendChild(chatMessage);
    })
    .catch((error) => {
      console.log(error);
    });
}

const input = document.getElementById('input');
const button = document.getElementById('btn');
const chat = document.getElementById('chat');

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
});