import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import MessageInput from '../components/MessageInput';
import ProviderSwitcher from '../components/ProviderSwitcher';
import { createSession, streamChat } from '../services/api';

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [provider, setProvider] = useState('gemini');

  useEffect(() => {
    const loadSession = async () => {
      const session = await createSession({ title: 'New Session', provider, model: 'default' });
      setSessions([session.data]);
    };
    loadSession();
  }, []);

  const handleSend = (msg) => {
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    const sessionId = sessions[0]?.id;

    const evt = new EventSource(`http://localhost:5000/api/chat/stream`);
    evt.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, { role: 'assistant', content: data.delta }]);
      if (data.done) evt.close();
    };

    fetch(`http://localhost:5000/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message: msg, provider, model: 'default' }),
    });
  };

  return (
    <div className="container">
      <Sidebar sessions={sessions} />
      <div>
        <ProviderSwitcher provider={provider} setProvider={setProvider} />
        <ChatArea messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
