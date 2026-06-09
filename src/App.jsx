import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { CHARS } from './data/gameData';
import CharDisplay from './components/CharDisplay';
import CharSelect from './screens/CharSelect';
import MainMenu from './screens/MainMenu';
import LevelMap from './screens/LevelMap';
import Practice from './screens/Practice';
import Wardrobe from './screens/Wardrobe';
import Lessons from './screens/Lessons';
import PrizeModal from './components/PrizeModal';

const F = { fontFamily: "'Fredoka One', cursive" };

function Header({ title, sub, coins, onBack }) {
  return (
    <div style={{ background: 'linear-gradient(90deg,#e8a000,#f5c842,#e8a000)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '4px solid #c47800', flexShrink: 0 }}>
      {onBack && <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#2d0a5e', ...F, fontSize: 14, cursor: 'pointer', padding: '4px 8px' }}>← Volver</button>}
      <div>
        {sub && <div style={{ fontSize: 10, fontWeight: 800, color: '#5a2d00', letterSpacing: 1.5, textTransform: 'uppercase' }}>{sub}</div>}
        <div style={{ ...F, fontSize: 20, color: '#2d0a5e' }}>{title}</div>
      </div>
      {coins !== undefined && (
        <div style={{ marginLeft: 'auto', background: '#2d0a5e', color: '#F5C842', ...F, fontSize: 15, borderRadius: 99, padding: '4px 12px', border: '2px solid #F5C842' }}>⭐ {coins}</div>
      )}
    </div>
  );
}

export default function App() {
  const { state, setChar, completeLevel, addCoins, toggleEquip, resetEquip } = useGameState();
  const [screen, setScreen] = useState('intro');
  const [activeLevelNum, setActiveLevelNum] = useState(null);
  const [prize, setPrize] = useState(null);
  const char = CHARS.find(c => c.id === state.charId) || CHARS[0];

  const handleLevelComplete = (levelNum, newItems, pts) => {
    completeLevel(levelNum, newItems.map(i => i.id));
    addCoins(pts);
    setPrize({ levelNum, newItems });
  };
  const handlePrizeClose = () => { setPrize(null); setScreen('wardrobe'); };

  const wrap = (children, back, title, sub, showCoins = true) => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0d0620' }}>
      <Header title={title} sub={sub} onBack={back} coins={showCoins ? state.coins : undefined} />
      {children}
      {prize && <PrizeModal levelNum={prize.levelNum} newItems={prize.newItems} onClose={handlePrizeClose} />}
    </div>
  );

  if (screen === 'intro') return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: '#0d0620' }}>
      <div style={{ ...F, fontSize: 52, color: '#F5C842', lineHeight: 1, marginBottom: 8, textShadow: '3px 3px 0 #c47800' }}>¡A leer!</div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,.5)', marginBottom: 32 }}>Elegí tu personaje y aprendé jugando</div>
      <div style={{ marginBottom: 32, animation: 'charBounce 2s ease-in-out infinite' }}>
        <CharDisplay charId={state.charId} sprite={char.sprite} itemsEquipped={state.itemsEquipped} itemsEarned={state.itemsEarned} size={160} />
      </div>
      <button onClick={() => setScreen('char-select')} style={{ background: '#F5C842', color: '#2d0a5e', border: 'none', borderRadius: 12, ...F, fontSize: 20, padding: '14px 44px', cursor: 'pointer', boxShadow: '0 5px 0 #c47800', marginBottom: 14 }}>¡Empezar!</button>
      <button onClick={() => setScreen('menu')} style={{ background: 'transparent', border: '2px solid #F5C842', color: '#F5C842', borderRadius: 12, ...F, fontSize: 14, padding: '8px 24px', cursor: 'pointer' }}>Continuar partida</button>
    </div>
  );

  if (screen === 'char-select') return wrap(
    <CharSelect currentCharId={state.charId} onConfirm={(id) => { setChar(id); setScreen('menu'); }} onBack={() => setScreen('intro')} />,
    () => setScreen('intro'), 'Elegí tu personaje', 'Paso 1', false
  );

  if (screen === 'menu') return wrap(
    <MainMenu state={state} onNavigate={(s) => { if (s === 'char-select') setScreen('char-select'); else setScreen(s); }} />,
    null, `¡Hola, ${char.name.split(' ')[0]}!`, '¡A leer!'
  );

  if (screen === 'lessons') return wrap(
    <Lessons onBack={() => setScreen('menu')} />,
    () => setScreen('menu'), 'Clases de sílabas', 'Aprendé antes de practicar'
  );

  if (screen === 'levels') return wrap(
    <LevelMap state={state} onSelectLevel={(n) => { setActiveLevelNum(n); setScreen('practice'); }} onBack={() => setScreen('menu')} />,
    () => setScreen('menu'), 'Mapa de niveles', 'Seleccioná un nivel'
  );

  if (screen === 'practice' && activeLevelNum) return wrap(
    <Practice levelNum={activeLevelNum} state={state} onComplete={handleLevelComplete} onExit={() => setScreen('levels')} />,
    () => setScreen('levels'), `Nivel ${activeLevelNum}`, 'Practicar lectura'
  );

  if (screen === 'wardrobe') return wrap(
    <Wardrobe state={state} onToggleEquip={toggleEquip} onResetEquip={resetEquip} />,
    () => setScreen('menu'), 'Armario', 'Personalizá tu personaje', false
  );

  return null;
}
