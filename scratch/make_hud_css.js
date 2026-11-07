const fs = require('fs');

const cssContent = `
/* ==========================================================================
   MINECRAFT HUD & APPLESKIN VISUALIZERS (Hunger, Saturation & Exhaustion)
   ========================================================================== */
.mc-food-icon,
.mc-sat-icon,
.mc-hunger-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: -2.5px;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  margin: 0 1px;
  transition: transform 0.15s ease;
}

.mc-food-icon:hover,
.mc-sat-icon:hover {
  transform: scale(1.25);
}

.mc-food-cluster {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.45);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin: 0 3px;
}

.mc-exhaustion-bar {
  display: inline-block;
  height: 9px;
  width: 81px;
  vertical-align: middle;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
}

/* AppleSkin & Minecraft HUD Mechanics Dissection Grid */
.hud-breakdown-panel {
  margin: 20px 0 28px 0;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(20, 16, 32, 0.95), rgba(13, 10, 22, 0.98));
  border: 1px solid rgba(233, 210, 98, 0.25);
  border-left: 4px solid #e9d262;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), inset 0 0 12px rgba(233, 210, 98, 0.05);
}

.hud-breakdown-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.hud-breakdown-title-icon {
  width: 22px;
  height: 22px;
  image-rendering: pixelated;
  vertical-align: middle;
}

.hud-breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.hud-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.hud-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(233, 210, 98, 0.35);
}

.hud-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 6px;
}

.hud-card-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.hud-card-badge {
  font-size: 0.72rem;
  font-family: var(--font-code, monospace);
  padding: 2px 6px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a1a1aa;
}

.hud-card-icons {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.8);
}

.hud-card-desc {
  font-size: 0.82rem;
  color: #d4d4d8;
  line-height: 1.45;
  margin: 0;
}

.hud-card-desc strong {
  color: #fef08a;
}
`;

fs.writeFileSync('scratch/hud_styles.css', cssContent);
console.log('HUD styles generated in scratch/hud_styles.css');
