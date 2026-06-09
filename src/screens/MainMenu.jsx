import { CHARS } from '../data/gameData';
import CharDisplay from '../components/CharDisplay';

export default function MainMenu({ state, onNavigate }) {
  const char = CHARS.find(c => c.id === state.charId) || CHARS[0];
  const done = state.levelsCompleted.length;
  const currentLevel = Math.min(done + 1, 15);

  const menuItems = [
    { icon: '📚', title: 'Clases de sílabas', sub: 'Aprendé antes de practicar', screen: 'lessons' },
    { icon: '🎮', title: 'Practicar lectura',  sub: `15 niveles · estás en el ${currentLevel}`, screen: 'levels' },
    { icon: '👕', title: 'Armario',            sub: `${state.itemsEarned.length} ítems desbloqueados`, screen: 'wardrobe' },
    { icon: '🎭', title: 'Cambiar personaje',  sub: 'Crash · Mario · Sonic · Bowser · Buzz', screen: 'char-select' },
  ];

  return (
    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr' }}>

      {/* Panel personaje */}
      <div style={{ background: '#1a0a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 12px', borderRight: '1px solid rgba(255,255,255,.08)' }}>
        <CharDisplay
          charId={state.charId}
          sprite={char.sprite}
          itemsEquipped={state.itemsEquipped}
          itemsEarned={state.itemsEarned}
          size={130}
          bounce
        />
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F5C842', marginTop: 10 }}>{char.name}</div>
        <div style={{ background: '#4a1080', color: '#F5C842', fontFamily: "'Fredoka One', cursive", fontSize: 13, borderRadius: 99, padding: '4px 14px', marginTop: 6, border: '1.5px solid #F5C842' }}>
          Nivel {currentLevel}
        </div>

        {/* Barra de progreso */}
        <div style={{ marginTop: 14, width: '100%' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginBottom: 4, textAlign: 'center' }}>Progreso general</div>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 99, overflow: 'hidden', height: 10 }}>
            <div style={{ height: '100%', width: `${(done / 15) * 100}%`, background: 'linear-gradient(90deg,#4ddc7a,#F5C842)', borderRadius: 99, transition: 'width .4s' }} />
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', textAlign: 'right', marginTop: 3 }}>{done}/15 niveles</div>
        </div>
      </div>

      {/* Navegación */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 20px', justifyContent: 'center' }}>
        {menuItems.map(item => (
          <div
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            style={{
              background: '#1a0a2e', border: '1.5px solid rgba(245,200,66,.25)', borderRadius: 16,
              padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#F5C842'; e.currentTarget.style.background='#4a1080'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,200,66,.25)'; e.currentTarget.style.background='#1a0a2e'; }}
          >
            <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: '#F5C842' }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
