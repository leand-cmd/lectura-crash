import { ALL_ITEMS } from '../data/gameData';
import { CHARS } from '../data/gameData';
import CharDisplay from '../components/CharDisplay';

export default function Wardrobe({ state, onToggleEquip, onResetEquip }) {
  const char = CHARS.find(c => c.id === state.charId) || CHARS[0];
  const cats = [...new Set(ALL_ITEMS.map(i => i.cat))];
  const s = { fontFamily: "'Fredoka One', cursive" };

  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr', overflow: 'hidden' }}>

      {/* Preview personaje */}
      <div style={{ background: '#1a0a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 12px', borderRight: '1px solid rgba(255,255,255,.08)' }}>
        <CharDisplay
          charId={state.charId}
          sprite={char.sprite}
          itemsEquipped={state.itemsEquipped}
          itemsEarned={state.itemsEarned}
          size={150}
        />
        <div style={{ ...s, fontSize: 16, color: '#F5C842', marginTop: 8 }}>{char.name}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 3 }}>
          {Object.keys(state.itemsEquipped).length} ítems equipados
        </div>
        <button
          onClick={onResetEquip}
          style={{ marginTop: 12, width: '100%', background: 'transparent', border: '2px solid rgba(245,200,66,.4)', color: '#F5C842', borderRadius: 99, padding: '6px 0', ...s, fontSize: 12, cursor: 'pointer' }}
        >
          Quitar todo
        </button>
      </div>

      {/* Panel ítems */}
      <div style={{ overflowY: 'auto', padding: 16 }}>
        {cats.map(cat => {
          const items = ALL_ITEMS.filter(i => i.cat === cat);
          return (
            <div key={cat}>
              <div style={{ ...s, fontSize: 12, color: '#F5C842', margin: '12px 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>{cat}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(72px,1fr))', gap: 8, marginBottom: 14 }}>
                {items.map(item => {
                  const earned   = state.itemsEarned.includes(item.id);
                  const equipped = !!state.itemsEquipped[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => earned && onToggleEquip(item.id)}
                      style={{
                        background: equipped ? 'rgba(77,220,122,.1)' : '#1a0a2e',
                        border: `1.5px solid ${equipped ? '#4ddc7a' : 'rgba(255,255,255,.1)'}`,
                        borderRadius: 10, padding: 8, textAlign: 'center',
                        cursor: earned ? 'pointer' : 'default',
                        opacity: earned ? 1 : 0.4,
                        transition: 'border-color .15s',
                      }}
                      onMouseEnter={e => { if (earned) e.currentTarget.style.borderColor = '#F5C842'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = equipped ? '#4ddc7a' : 'rgba(255,255,255,.1)'; }}
                    >
                      <div style={{ fontSize: 22 }}>{item.emoji}</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,.5)', marginTop: 3, lineHeight: 1.2 }}>{item.name}</div>
                      {!earned && <div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)' }}>🔒 Niv.{item.level}</div>}
                      {equipped && <div style={{ fontSize: 9, color: '#4ddc7a', marginTop: 2 }}>✓ puesto</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
