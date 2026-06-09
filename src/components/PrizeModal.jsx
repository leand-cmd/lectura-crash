export default function PrizeModal({ levelNum, newItems, onClose }) {
  const s = { fontFamily: "'Fredoka One', cursive" };
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,.85)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 200,
    }}>
      <div style={{
        background: '#1a0a2e', border: '3px solid #F5C842', borderRadius: 24,
        padding: '28px 36px', textAlign: 'center', maxWidth: 360, width: '90%',
        animation: 'popIn .4s ease',
      }}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>🎉</div>
        <div style={{ ...s, fontSize: 28, color: '#F5C842', marginBottom: 8 }}>¡Nivel {levelNum} superado!</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 20 }}>
          +50 ⭐ · {newItems.length} ítems nuevos desbloqueados
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          {newItems.map(item => (
            <div key={item.id} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>{item.emoji}</div>
              <div style={{ fontSize: 11, color: '#F5C842', marginTop: 4 }}>{item.name}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            background: '#F5C842', color: '#2d0a5e', border: 'none',
            borderRadius: 12, padding: '12px 28px', ...s, fontSize: 16,
            cursor: 'pointer', boxShadow: '0 4px 0 #c47800',
          }}
        >
          ¡Ir al armario! →
        </button>
      </div>
    </div>
  );
}
