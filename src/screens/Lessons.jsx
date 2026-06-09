import { useState, useCallback } from 'react';
import { SYLLABLE_LESSONS } from '../data/gameData';
import { speak, useSpeechRecognition } from '../hooks/useSpeech';

function LessonDetail({ lesson, onBack }) {
  const [step, setStep]       = useState(0);   // índice de sílaba actual
  const [phase, setPhase]     = useState('show'); // show | listen | result
  const [result, setResult]   = useState(null);
  const [progress, setProgress] = useState(() => Array(lesson.items.length).fill(null));
  const { listening, supported, recognize } = useSpeechRecognition();

  const item = lesson.items[step];
  const allDone = progress.every(p => p !== null);

  const playSound = useCallback(() => {
    speak(item, 'es');
    setPhase('listen');
  }, [item]);

  const handleMic = useCallback(() => {
    if (listening) return;
    recognize(item, ({ ok, heard }) => {
      const newProg = [...progress];
      newProg[step] = ok;
      setProgress(newProg);
      setResult({ ok, heard });
      setPhase('result');
    });
  }, [item, listening, recognize, progress, step]);

  const next = useCallback(() => {
    if (step < lesson.items.length - 1) {
      setStep(s => s + 1);
      setPhase('show');
      setResult(null);
    }
  }, [step, lesson.items.length]);

  const prev = useCallback(() => {
    if (step > 0) {
      setStep(s => s - 1);
      setPhase('show');
      setResult(null);
    }
  }, [step]);

  const s = { fontFamily: "'Fredoka One', cursive" };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>

      {/* Indicadores de progreso */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {lesson.items.map((syl, i) => (
          <div key={i} style={{
            width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i === step ? lesson.color : progress[i] === true ? '#4ddc7a' : progress[i] === false ? '#e24b4a' : '#1a0a2e',
            border: `2px solid ${i === step ? lesson.color : progress[i] !== null ? 'transparent' : 'rgba(255,255,255,.2)'}`,
            ...s, fontSize: 14, color: i === step ? '#fff' : progress[i] !== null ? '#fff' : 'rgba(255,255,255,.4)',
            cursor: 'pointer', transition: 'all .2s',
          }} onClick={() => { setStep(i); setPhase('show'); setResult(null); }}>
            {syl}
          </div>
        ))}
      </div>

      {/* Sílaba grande */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <div style={{
          background: '#1a0a2e', border: `4px solid ${lesson.color}`,
          borderRadius: 24, padding: '24px 60px', textAlign: 'center',
          boxShadow: `0 0 30px ${lesson.color}40`,
          animation: phase === 'show' ? 'popIn .3s ease' : 'none',
        }}>
          <div style={{ ...s, fontSize: 80, color: '#fff', lineHeight: 1, letterSpacing: 4 }}>{item}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 6 }}>sílaba {step + 1} de {lesson.items.length}</div>
        </div>

        {/* Instrucción según fase */}
        {phase === 'show' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 14 }}>
              Escuchá cómo suena y luego repetila
            </div>
            <button
              onClick={playSound}
              style={{
                background: lesson.color, border: 'none', borderRadius: 99,
                padding: '12px 32px', ...s, fontSize: 16, color: '#fff',
                cursor: 'pointer', boxShadow: `0 4px 0 ${lesson.color}80`,
              }}
            >
              🔊 Escuchar
            </button>
          </div>
        )}

        {phase === 'listen' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 14 }}>
              Ahora repetí: <span style={{ ...s, fontSize: 18, color: lesson.color }}>"{item}"</span>
            </div>
            <button
              onClick={handleMic}
              disabled={!supported}
              style={{
                width: 72, height: 72, borderRadius: '50%', border: 'none',
                background: listening ? '#e24b4a' : '#F5C842',
                fontSize: 32, cursor: supported ? 'pointer' : 'default',
                boxShadow: listening ? '0 4px 0 #7a1a1a' : '0 4px 0 #c47800',
                animation: listening ? 'pulse 1s infinite' : 'none',
              }}
            >🎤</button>
            <div style={{ ...s, fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
              {listening ? 'Escuchando...' : 'Presioná y leé'}
            </div>
          </div>
        )}

        {phase === 'result' && result && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...s, fontSize: 28, color: result.ok ? '#4ddc7a' : '#e24b4a', marginBottom: 6 }}>
              {result.ok ? '¡Perfecto! 🎉' : '¡Casi! Intentá de nuevo 💪'}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>
              Escuché: <span style={{ color: '#fff', fontWeight: 800 }}>"{result.heard}"</span>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {!result.ok && (
                <button onClick={() => { setPhase('show'); setResult(null); }}
                  style={{ background: '#e24b4a', border: 'none', borderRadius: 99, padding: '10px 24px', ...s, fontSize: 14, color: '#fff', cursor: 'pointer' }}>
                  Intentar de nuevo
                </button>
              )}
              {step < lesson.items.length - 1 ? (
                <button onClick={next}
                  style={{ background: lesson.color, border: 'none', borderRadius: 99, padding: '10px 24px', ...s, fontSize: 14, color: '#fff', cursor: 'pointer' }}>
                  Siguiente →
                </button>
              ) : (
                <button onClick={onBack}
                  style={{ background: '#4ddc7a', border: 'none', borderRadius: 99, padding: '10px 24px', ...s, fontSize: 14, color: '#0a2e14', cursor: 'pointer' }}>
                  ¡Lección completa! 🏆
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navegación entre sílabas */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button onClick={prev} disabled={step === 0}
          style={{ background: 'transparent', border: '2px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.5)', borderRadius: 99, padding: '6px 16px', ...s, fontSize: 13, cursor: step > 0 ? 'pointer' : 'default', opacity: step > 0 ? 1 : 0.3 }}>
          ← Anterior
        </button>
        <button onClick={playSound}
          style={{ background: 'transparent', border: `2px solid ${lesson.color}`, color: lesson.color, borderRadius: 99, padding: '6px 16px', ...s, fontSize: 13, cursor: 'pointer' }}>
          🔊 Repetir sonido
        </button>
        <button onClick={next} disabled={step >= lesson.items.length - 1}
          style={{ background: 'transparent', border: '2px solid rgba(255,255,255,.2)', color: 'rgba(255,255,255,.5)', borderRadius: 99, padding: '6px 16px', ...s, fontSize: 13, cursor: step < lesson.items.length - 1 ? 'pointer' : 'default', opacity: step < lesson.items.length - 1 ? 1 : 0.3 }}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default function Lessons({ onBack }) {
  const [activelesson, setActiveLesson] = useState(null);
  const s = { fontFamily: "'Fredoka One', cursive" };

  if (activelesson) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: `linear-gradient(90deg, ${activelesson.color}44, ${activelesson.color}22)`, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `2px solid ${activelesson.color}60` }}>
          <button onClick={() => setActiveLesson(null)} style={{ background: 'transparent', border: 'none', color: activelesson.color, ...s, fontSize: 14, cursor: 'pointer' }}>← Volver</button>
          <div style={{ ...s, fontSize: 18, color: activelesson.color }}>{activelesson.title}</div>
        </div>
        <LessonDetail lesson={activelesson} onBack={() => setActiveLesson(null)} />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 20 }}>
        Aprendé cada grupo de sílabas antes de practicar. El programa las lee y vos repetís.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {SYLLABLE_LESSONS.map(lesson => (
          <div
            key={lesson.id}
            onClick={() => setActiveLesson(lesson)}
            style={{
              background: '#1a0a2e', border: `2px solid ${lesson.color}40`,
              borderRadius: 16, padding: 16, cursor: 'pointer', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = lesson.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${lesson.color}40`; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ ...s, fontSize: 15, color: lesson.color, marginBottom: 6 }}>{lesson.title}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {lesson.items.map(syl => (
                <span key={syl} style={{
                  background: `${lesson.color}20`, color: lesson.color,
                  borderRadius: 99, padding: '2px 10px', ...s, fontSize: 14,
                  border: `1px solid ${lesson.color}40`,
                }}>{syl}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 8 }}>
              {lesson.items.length} sílabas · escuchar y repetir
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(245,200,66,.6)', background: 'rgba(245,200,66,.08)', borderRadius: 8, padding: '10px 14px' }}>
        <b style={{ color: '#F5C842' }}>Cómo funciona:</b> El programa lee la sílaba en voz alta. Después vos la repetís al micrófono. Si la decís bien, avanzás a la siguiente.
      </div>
    </div>
  );
}
