import axios from 'axios';
export const api = axios.create({ baseURL: 'http://localhost:5000/api/chat' });

export const createSession = (data) => api.post('/session', data);

export const streamChat = ({ sessionId, message, provider, model }, onMessage) => {
  const evt = new EventSource(`http://localhost:5000/api/chat/stream`);
  evt.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data);
    if (data.done) evt.close();
  };

  fetch(`http://localhost:5000/api/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message, provider, model }),
  });
};
