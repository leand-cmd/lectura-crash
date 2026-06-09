import { LEVELS, ZONES, ALL_ITEMS } from '../data/gameData';

export default function LevelMap({ state, onSelectLevel, onBack }) {
  const currentLevel = state.levelsCompleted.length + 1;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      {ZONES.map(zone => (
        <div key={zone.name}>
          <div style={{
            fontFamily: "'Fredoka One', cursive", fontSize: 13, letterSpacing: 1,
            padding: '8px 14px', borderRadius: 99, marginBottom: 12, display: 'inline-block',
            background: zone.bg, color: zone.color, border: `1px solid ${zone.color}40`,
          }}>
            {zone.name}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            {zone.levels.map(n => {
              const lv = LEVELS[n - 1];
              const completed = state.levelsCompleted.includes(n);
              const current = n === currentLevel;
              const locked = n > currentLevel;
              const prizes = ALL_ITEMS.filter(i => i.level === n);

              return (
                <div
                  key={n}
                  onClick={() => !locked && onSelectLevel(n)}
                  style={{
                    background: current ? '#4a1080' : '#1a0a2e',
                    border: `1.5px solid ${completed ? '#4ddc7a' : current ? '#F5C842' : 'rgba(255,255,255,.1)'}`,
                    borderRadius: 14, padding: 12, cursor: locked ? 'default' : 'pointer',
                    opacity: locked ? 0.5 : 1, position: 'relative',
                    transition: 'transform .15s, border-color .2s',
                  }}
                  onMouseEnter={e => { if (!locked) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
                >
                  {locked && <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 16 }}>🔒</div>}
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>NIVEL {n}</div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 14, color: '#F5C842', margin: '3px 0' }}>{lv.title}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', lineHeight: 1.4 }}>{lv.desc}</div>

                  {/* Estrellas */}
                  <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{ fontSize: 14, opacity: completed ? 1 : 0.25 }}>⭐</span>
                    ))}
                  </div>

                  {/* Puntos de premios */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                    {prizes.map(p => (
                      <div key={p.id} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: state.itemsEarned.includes(p.id) ? '#4ddc7a' : '#F5C842',
                        opacity: state.itemsEarned.includes(p.id) ? 1 : 0.4,
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
