import React from 'react';
export default function ChatArea({ messages }) {
  return (
    <div className="chat-area">
      {messages.map((m, i) => (
        <div key={i} className={m.role}>{m.role}: {m.content}</div>
      ))}
    </div>
  );
}
