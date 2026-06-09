import { useRef, useState, useCallback } from 'react';

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z ]/g, '').trim();
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}
function similarity(a, b) {
  a = normalize(a); b = normalize(b);
  if (a === b) return 1;
  if (b.includes(a) || a.includes(b)) return 0.85;
  const longer = a.length > b.length ? a : b;
  return longer.length ? (longer.length - levenshtein(a, b)) / longer.length : 1;
}

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

export function useSpeechRecognition() {
  const recRef = useRef(null);
  const [listening, setListening] = useState(false);
  const supported = !!SpeechRec;

  const recognize = useCallback((target, onResult) => {
    if (!SpeechRec || listening) return;
    const rec = new SpeechRec();
    recRef.current = rec;
    rec.lang = 'es-PY';
    rec.interimResults = false;
    rec.maxAlternatives = 4;

    rec.onstart = () => setListening(true);
    rec.onend   = () => setListening(false);
    rec.onerror = (e) => {
      setListening(false);
      onResult({ ok: false, heard: '', error: e.error });
    };
    rec.onresult = (e) => {
      const alts = Array.from(e.results[0]).map(a => a.transcript);
      let best = 0, bestHeard = alts[0];
      alts.forEach(a => {
        const s = similarity(a, target);
        if (s > best) { best = s; bestHeard = a; }
      });
      onResult({ ok: best >= 0.65, heard: bestHeard, score: best });
    };
    rec.start();
  }, [listening]);

  const stop = useCallback(() => {
    recRef.current?.stop();
  }, []);

  return { listening, supported, recognize, stop };
}

// Síntesis de voz (para las clases)
export function speak(text, lang = 'es') {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang;
  utt.rate = 0.75;
  utt.pitch = 1.1;
  window.speechSynthesis.speak(utt);
}
