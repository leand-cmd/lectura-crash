import { useMemo } from 'react';
import { ALL_ITEMS, EFFECT_STYLES, BG_STYLES } from '../data/gameData';

export default function CharDisplay({ charId, sprite, itemsEquipped = {}, itemsEarned = [], size = 140, bounce = false }) {
  const { filterStyle, bgStyle, overlayItems } = useMemo(() => {
    const equippedIds = Object.keys(itemsEquipped).filter(id => itemsEarned.includes(id));
    const equippedItems = equippedIds.map(id => ALL_ITEMS.find(i => i.id === id)).filter(Boolean);

    const filters = [];
    let bg = null;
    const overlays = [];

    equippedItems.forEach(item => {
      if (item.effect && EFFECT_STYLES[item.effect]) {
        const f = EFFECT_STYLES[item.effect].replace('filter:', '').trim();
        filters.push(f);
      }
      if (item.effect && BG_STYLES[item.effect]) {
        bg = BG_STYLES[item.effect];
      }
      // Ítems que se muestran como overlay emoji
      const OVERLAY_IDS = ['hat_cap','hat_witch','crown_gold','crown_silver','cape_black','cape_gold',
        'mask_cool','glasses_sq','necklace_b','necklace_gold','scar_cool','gloves_blk',
        'belt_studs','bag_back','tattoo_arm','bracelet_g','scarf_purple','wings_dark',
        'weapon_deco','throne_deco','title_master','hoodie_dark','jacket_red','boots_black',
        'shoes_white','shoes_wild','outfit_ninja','item_crystal'];
      if (OVERLAY_IDS.includes(item.id)) overlays.push(item.emoji);
    });

    return {
      filterStyle: filters.length ? filters.join(' ') : undefined,
      bgStyle: bg,
      overlayItems: overlays,
    };
  }, [itemsEquipped, itemsEarned]);

  const containerStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 8,
    background: bgStyle ? undefined : '#1a0a2e',
    ...(bgStyle ? { background: bgStyle } : {}),
  };

  const imgStyle = {
    height: size,
    width: 'auto',
    objectFit: 'contain',
    display: 'block',
    mixBlendMode: 'lighten',
    ...(filterStyle ? { filter: filterStyle } : {}),
    ...(bounce ? { animation: 'charBounce 2s ease-in-out infinite' } : {}),
  };

  const emojiSize = Math.max(14, size / 9);

  return (
    <div style={containerStyle}>
      <img src={sprite} alt={charId} style={imgStyle} />
      {overlayItems.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 4,
          left: 0,
          right: 0,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          pointerEvents: 'none',
        }}>
          {overlayItems.map((emoji, i) => (
            <span key={i} style={{ fontSize: emojiSize, textShadow: '1px 1px 3px #000' }}>{emoji}</span>
          ))}
        </div>
      )}
    </div>
  );
}
