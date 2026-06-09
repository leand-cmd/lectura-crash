import { useState, useCallback } from 'react';
import { LEVELS, ALL_ITEMS, CHARS } from '../data/gameData';
import { useSpeechRecognition } from '../hooks/useSpeech';
import CharDisplay from '../components/CharDisplay';

export default function Practice({ levelNum, state, onComplete, onExit }) {
  const lv   = LEVELS[levelNum - 1];
  const char = CHARS.find(c => c.id === state.charId) || CHARS[0];

  const words     = lv.words;
  const sentences = lv.sentences || [];
  const hasSentences = sentences.length > 0;

  // fase: 'words' | 'sentences'
  const [phase, setPhase]           = useState('words');
  const [wordStates, setWordStates] = useState(() => Array(words.length).fill(null));
  const [sentStates, setSentStates] = useState(() => Array(sentences.length).fill(null));
  const [current, setCurrent]       = useState(0);
  const [score, setScore]           = useState(0);
  const [combo, setCombo]           = useState(1);
  const [lives, setLives]           = useState(3);
  const [result, setResult]         = useState(null);
  const [bouncing, setBouncing]     = useState(false);

  const { listening, supported, recognize, stop } = useSpeechRecognition();

  const activeList   = phase === 'words' ? words : sentences;
  const activeStates = phase === 'words' ? wordStates : sentStates;
  const setActive    = phase === 'words' ? setWordStates : setSentStates;

  const done  = activeStates.filter(s => s !== null).length;
  const okCnt = activeStates.filter(s => s === true).length;

  // Chequear si hay que ir a oraciones o terminar
  const checkComplete = useCallback((newStates, newScore) => {
    const d = newStates.filter(s => s !== null).length;
    const o = newStates.filter(s => s === true).length;
    if (d < activeList.length) return;
    if (o / activeList.length < 0.6) return;

    if (phase === 'words' && hasSentences) {
      setTimeout(() => {
        setPhase('sentences');
        setCurrent(0);
        setResult(null);
        setLives(3);
        setCombo(1);
      }, 700);
    } else {
      const newItems = ALL_ITEMS.filter(i => i.level === levelNum && !state.itemsEarned.includes(i.id));
      setTimeout(() => onComplete(levelNum, newItems, newScore + 50), 800);
    }
  }, [phase, hasSentences, activeList.length, levelNum, state.itemsEarned, onComplete]);

  const handleMic = useCallback(() => {
    if (listening) { stop(); return; }
    if (current >= activeList.length) return;

    recognize(activeList[current], ({ ok, heard, error }) => {
      if (error) {
        setResult({ type: 'error', msg: error === 'no-speech' ? 'No te escuché, intentá de nuevo' : 'Error de micrófono' });
        return;
      }

      const newStates = [...activeStates];
      let newScore = score, newCombo = combo, newLives = lives, pts = 0;

      if (ok) {
        pts = combo >= 4 ? 10 * combo : combo >= 2 ? 7 * combo : 5;
        newScore += pts; newCombo = Math.min(combo + 1, 5);
        newStates[current] = true;
        setBouncing(true); setTimeout(() => setBouncing(false), 500);
      } else {
        newLives = Math.max(0, lives - 1); newCombo = 1;
        if (newLives === 0) { newStates[current] = null; newLives = 3; }
        else newStates[current] = false;
      }

      setActive(newStates); setScore(newScore); setCombo(newCombo); setLives(newLives);
      setResult({ type: ok ? 'ok' : 'fail', heard, pts });

      // avanzar al siguiente ítem sin hacer
      let next = current + 1;
      while (next < activeList.length && newStates[next] !== null) next++;
      if (next < activeList.length) setCurrent(next);

      checkComplete(newStates, newScore);
    });
  }, [listening, current, activeList, activeStates, score, combo, lives, recognize, stop, setActive, checkComplete]);

  const F = { fontFamily: "'Fredoka One', cursive" };
  const isSentence = (txt) => txt.includes(' ');
  const wordDisplay = current < activeList.length ? activeList[current] : '🎉';
  const fontSize = wordDisplay.length > 20 ? 18 : wordDisplay.length > 12 ? 24 : wordDisplay.length > 6 ? 36 : 44;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>

      {/* Indicador de fase */}
      {hasSentences && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, justifyContent: 'center' }}>
          {['words','sentences'].map(p => (
            <div key={p} style={{
              padding: '4px 16px', borderRadius: 99, ...F, fontSize: 12,
              background: phase === p ? '#F5C842' : '#1a0a2e',
              color: phase === p ? '#2d0a5e' : 'rgba(255,255,255,.4)',
              border: `1.5px solid ${phase === p ? '#c47800' : 'rgba(255,255,255,.15)'}`,
            }}>
              {p === 'words' ? `📝 Palabras ${phase === 'words' ? `(${done}/${words.length})` : '✓'}` : `📖 Oraciones ${phase === 'sentences' ? `(${done}/${sentences.length})` : ''}`}
            </div>
          ))}
        </div>
      )}

      {/* Top bar progreso */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', marginBottom: 3 }}>
            {phase === 'words' ? 'Palabras' : 'Oraciones'}
          </div>
          <div style={{ background: 'rgba(255,255,255,.1)', borderRadius: 99, height: 10, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(done / activeList.length) * 100}%`, background: 'linear-gradient(90deg,#4ddc7a,#F5C842)', borderRadius: 99, transition: 'width .4s' }} />
          </div>
        </div>
        <div style={{ ...F, fontSize: 22, color: '#4ddc7a' }}>x{combo}</div>
        <div style={{ fontSize: 18, letterSpacing: 1 }}>{[0,1,2].map(i => i < lives ? '❤️' : '🖤').join('')}</div>
      </div>

      {/* Personaje + palabra/oración activa */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ flexShrink: 0, transition: 'transform .1s', transform: bouncing ? 'translateY(-8px)' : 'none' }}>
          <CharDisplay charId={state.charId} sprite={char.sprite} itemsEquipped={state.itemsEquipped} itemsEarned={state.itemsEarned} size={90} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ background: '#4a1080', border: '3px solid #F5C842', borderRadius: 16, padding: phase === 'sentences' ? '14px 16px' : '16px 24px', textAlign: 'center', marginBottom: 12, minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ ...F, fontSize, letterSpacing: phase === 'sentences' ? 0.5 : 2, color: '#fff', lineHeight: 1.3 }}>
              {current < activeList.length ? activeList[current] : '🎉'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 4 }}>
              {phase === 'words' ? 'palabra' : 'oración'} {current + 1} de {activeList.length}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <button
              onClick={handleMic}
              disabled={!supported}
              style={{
                width: 64, height: 64, borderRadius: '50%', border: 'none',
                background: listening ? '#e24b4a' : (supported ? '#F5C842' : '#444'),
                cursor: supported ? 'pointer' : 'default', fontSize: 28,
                boxShadow: listening ? '0 4px 0 #7a1a1a' : '0 4px 0 #c47800',
                animation: listening ? 'pulse 1s infinite' : 'none', transition: 'background .15s',
              }}
            >🎤</button>
            <div style={{ ...F, fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: 1, textTransform: 'uppercase' }}>
              {!supported ? 'Usá Chrome' : listening ? 'Escuchando...' : 'Presioná y leé'}
            </div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      {result && (
        <div style={{ textAlign: 'center', minHeight: 52, marginBottom: 12 }}>
          {result.type === 'error' ? (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>{result.msg}</div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                Escuché: <span style={{ color: '#fff', fontWeight: 800 }}>"{result.heard}"</span>
              </div>
              <div style={{ ...F, fontSize: 20, color: result.type === 'ok' ? '#4ddc7a' : '#e24b4a' }}>
                {result.type === 'ok' ? '¡Correcto! 🎉' : 'Casi... 💪'}
              </div>
              {result.pts > 0 && (
                <div style={{ fontSize: 12, fontWeight: 800, color: '#F5C842' }}>+{result.pts} pts{combo > 1 ? ` (x${combo})` : ''}</div>
              )}
            </>
          )}
        </div>
      )}

      {/* Transición entre fases */}
      {phase === 'words' && done === words.length && okCnt / words.length >= 0.6 && hasSentences && (
        <div style={{ textAlign: 'center', marginBottom: 14, padding: '10px 16px', background: 'rgba(77,220,122,.1)', border: '1.5px solid #4ddc7a', borderRadius: 12 }}>
          <div style={{ ...F, fontSize: 16, color: '#4ddc7a' }}>¡Palabras completadas! 🎉</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>Pasando a las oraciones...</div>
        </div>
      )}

      {/* Grid palabras u oraciones */}
      <div style={{ ...F, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#F5C842', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        {phase === 'words' ? 'Palabras' : 'Oraciones'}
        <div style={{ flex: 1, height: 1, background: 'rgba(245,200,66,.2)' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: phase === 'sentences' ? '1fr' : 'repeat(5,1fr)',
        gap: 5, marginBottom: 14,
      }}>
        {activeList.map((w, i) => {
          const st = activeStates[i];
          const isActive = i === current && st === null;
          return (
            <div key={i} onClick={() => st === null && setCurrent(i)} style={{
              background: isActive ? '#F5C842' : st === true ? 'rgba(77,220,122,.2)' : st === false ? 'rgba(226,75,74,.2)' : '#1a0a2e',
              border: `1.5px solid ${isActive ? '#c47800' : st === true ? '#4ddc7a' : st === false ? '#e24b4a' : 'rgba(255,255,255,.1)'}`,
              color: isActive ? '#2d0a5e' : st === true ? '#4ddc7a' : st === false ? '#e24b4a' : 'rgba(255,255,255,.5)',
              borderRadius: 8, padding: phase === 'sentences' ? '8px 12px' : '5px 3px',
              textAlign: 'center', ...F,
              fontSize: phase === 'sentences' ? 14 : 12,
              cursor: st === null ? 'pointer' : 'default', transition: 'all .15s',
            }}>
              {w}
            </div>
          );
        })}
      </div>

      {!supported && (
        <div style={{ fontSize: 12, color: 'rgba(245,200,66,.7)', background: 'rgba(245,200,66,.08)', borderRadius: 8, padding: '8px 12px' }}>
          <b style={{ color: '#F5C842' }}>Atención:</b> Necesitás Chrome o Edge para el micrófono.
        </div>
      )}
    </div>
  );
}
