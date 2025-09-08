import React from 'react';
export default function Sidebar({ sessions }) {
  return (
    <div className="sidebar">
      <h3>Sessions</h3>
      {sessions.length > 0 ? sessions.map(s => <div key={s.id}>{s.title}</div>) : <div>No sessions</div>}
    </div>
  );
}
