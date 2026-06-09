import { useState } from 'react';
import { CHARS } from '../data/gameData';

export default function CharSelect({ currentCharId, onConfirm, onBack }) {
  const [selected, setSelected] = useState(currentCharId);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, overflowY: 'auto' }}>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.6)', fontSize: 13, marginBottom: 24 }}>
        ¿Con quién querés aprender a leer hoy?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, maxWidth: 640, margin: '0 auto 32px' }}>
        {CHARS.map(ch => (
          <div
            key={ch.id}
            onClick={() => setSelected(ch.id)}
            style={{
              background: selected === ch.id ? '#4a1080' : '#1a0a2e',
              border: `2px solid ${selected === ch.id ? '#F5C842' : 'transparent'}`,
              borderRadius: 16,
              padding: '12px 8px 10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all .2s',
              transform: selected === ch.id ? 'translateY(-4px)' : 'none',
            }}
          >
            <img
              src={ch.sprite}
              alt={ch.name}
              style={{ width: 80, height: 100, objectFit: 'contain', objectPosition: 'center bottom', mixBlendMode: 'lighten' }}
            />
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 13, color: '#F5C842', marginTop: 6 }}>{ch.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{ch.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => onConfirm(selected)}
          style={{
            fontFamily: "'Fredoka One', cursive", background: '#F5C842', color: '#2d0a5e',
            border: 'none', borderRadius: 12, fontSize: 16, padding: '12px 32px',
            cursor: 'pointer', boxShadow: '0 4px 0 #c47800',
          }}
        >
          ¡Jugar con este personaje! →
        </button>
        {onBack && (
          <button onClick={onBack} style={{ background: 'transparent', border: '2px solid #F5C842', color: '#F5C842', borderRadius: 12, fontSize: 13, padding: '7px 20px', cursor: 'pointer', fontFamily: "'Fredoka One', cursive" }}>
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}
