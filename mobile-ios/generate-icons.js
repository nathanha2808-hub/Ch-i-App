// Generate iOS app icon từ SVG. Run: npm install --no-save sharp && node generate-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../frontend/icons/icon.svg');
const OUT_DIR = path.join(__dirname, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');
const OUT_FILE = path.join(OUT_DIR, 'AppIcon.png');

(async () => {
  if (!fs.existsSync(SVG_PATH)) { console.error('SVG not found:', SVG_PATH); process.exit(1); }
  if (!fs.existsSync(OUT_DIR)) { console.error('Output dir not found:', OUT_DIR); process.exit(1); }

  const svg = fs.readFileSync(SVG_PATH);
  await sharp(svg)
    .resize(1024, 1024, { fit: 'contain' })
    .flatten({ background: { r: 255, g: 126, b: 54 } }) // Solid orange background (Apple requires no transparency)
    .png()
    .toFile(OUT_FILE);

  const stat = fs.statSync(OUT_FILE);
  console.log(`✅ Generated ${OUT_FILE} (${(stat.size / 1024).toFixed(1)} KB)`);
})().catch(err => { console.error('Fail:', err.message); process.exit(1); });
