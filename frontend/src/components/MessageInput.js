import React, { useState } from 'react';
export default function MessageInput({ onSend }) {
  const [msg, setMsg] = useState('');
  return (
    <div>
      <textarea value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={() => { onSend(msg); setMsg(''); }}>Send</button>
    </div>
  );
}
