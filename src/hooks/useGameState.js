import { useState, useCallback } from 'react';

const SAVE_KEY = 'lecturaCrash_v1';

const defaultState = {
  charId: 'crash',
  coins: 0,
  levelsCompleted: [],
  itemsEarned: [],
  itemsEquipped: {},
};

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

export function useGameState() {
  const [state, setState] = useState(loadFromStorage);

  const update = useCallback((patch) => {
    setState(prev => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setChar = useCallback((charId) => update({ charId }), [update]);

  const completeLevel = useCallback((n, newItemIds) => {
    update(prev => ({
      ...prev,
      levelsCompleted: prev.levelsCompleted.includes(n) ? prev.levelsCompleted : [...prev.levelsCompleted, n],
      itemsEarned: [...new Set([...prev.itemsEarned, ...newItemIds])],
      coins: prev.coins + 50,
    }));
  }, [update]);

  const addCoins = useCallback((amount) => {
    update(prev => ({ ...prev, coins: prev.coins + amount }));
  }, [update]);

  const toggleEquip = useCallback((itemId) => {
    update(prev => {
      const eq = { ...prev.itemsEquipped };
      if (eq[itemId]) delete eq[itemId];
      else eq[itemId] = true;
      return { ...prev, itemsEquipped: eq };
    });
  }, [update]);

  const resetEquip = useCallback(() => {
    update(prev => ({ ...prev, itemsEquipped: {} }));
  }, [update]);

  const resetGame = useCallback(() => {
    const fresh = { ...defaultState };
    localStorage.setItem(SAVE_KEY, JSON.stringify(fresh));
    setState(fresh);
  }, []);

  return { state, setChar, completeLevel, addCoins, toggleEquip, resetEquip, resetGame };
}
