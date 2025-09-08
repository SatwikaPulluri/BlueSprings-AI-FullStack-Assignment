import React from 'react';
export default function ProviderSwitcher({ provider, setProvider }) {
  return (
    <select value={provider} onChange={e => setProvider(e.target.value)}>
      <option value="openai">OpenAI</option>
      <option value="anthropic">Anthropic</option>
      <option value="gemini">Gemini</option>
    </select>
  );
}
