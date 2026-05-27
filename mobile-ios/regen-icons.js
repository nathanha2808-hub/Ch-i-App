/**
 * Regenerate ALL app icons from assets/images/logo.jpg master with dynamic squircle masking and orange backgrounds.
 * Run: cd mobile-ios && node regen-icons.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'images', 'logo.jpg');
const IOS_ICON_DIR = path.join(__dirname, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset');
const ANDROID_RES_DIR = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

// iOS icon sizes (filename, dimensions in pixels)
const IOS_SIZES = [
  ['AppIcon-20.png', 20],
  ['AppIcon-20@2x.png', 40],
  ['AppIcon-20@3x.png', 60],
  ['AppIcon-29.png', 29],
  ['AppIcon-29@2x.png', 58],
  ['AppIcon-29@3x.png', 87],
  ['AppIcon-40.png', 40],
  ['AppIcon-40@2x.png', 80],
  ['AppIcon-40@3x.png', 120],
  ['AppIcon-60@2x.png', 120],
  ['AppIcon-60@3x.png', 180],
  ['AppIcon-76.png', 76],
  ['AppIcon-76@2x.png', 152],
  ['AppIcon-83.5@2x.png', 167],
  ['AppIcon-512@2x.png', 1024],
];

// iOS Contents.json with all sizes
const IOS_CONTENTS_JSON = {
  images: [
    { size: '20x20', idiom: 'iphone', filename: 'AppIcon-20@2x.png', scale: '2x' },
    { size: '20x20', idiom: 'iphone', filename: 'AppIcon-20@3x.png', scale: '3x' },
    { size: '29x29', idiom: 'iphone', filename: 'AppIcon-29@2x.png', scale: '2x' },
    { size: '29x29', idiom: 'iphone', filename: 'AppIcon-29@3x.png', scale: '3x' },
    { size: '40x40', idiom: 'iphone', filename: 'AppIcon-40@2x.png', scale: '2x' },
    { size: '40x40', idiom: 'iphone', filename: 'AppIcon-40@3x.png', scale: '3x' },
    { size: '60x60', idiom: 'iphone', filename: 'AppIcon-60@2x.png', scale: '2x' },
    { size: '60x60', idiom: 'iphone', filename: 'AppIcon-60@3x.png', scale: '3x' },
    { size: '20x20', idiom: 'ipad', filename: 'AppIcon-20.png', scale: '1x' },
    { size: '20x20', idiom: 'ipad', filename: 'AppIcon-20@2x.png', scale: '2x' },
    { size: '29x29', idiom: 'ipad', filename: 'AppIcon-29.png', scale: '1x' },
    { size: '29x29', idiom: 'ipad', filename: 'AppIcon-29@2x.png', scale: '2x' },
    { size: '40x40', idiom: 'ipad', filename: 'AppIcon-40.png', scale: '1x' },
    { size: '40x40', idiom: 'ipad', filename: 'AppIcon-40@2x.png', scale: '2x' },
    { size: '76x76', idiom: 'ipad', filename: 'AppIcon-76.png', scale: '1x' },
    { size: '76x76', idiom: 'ipad', filename: 'AppIcon-76@2x.png', scale: '2x' },
    { size: '83.5x83.5', idiom: 'ipad', filename: 'AppIcon-83.5@2x.png', scale: '2x' },
    { size: '1024x1024', idiom: 'ios-marketing', filename: 'AppIcon-512@2x.png', scale: '1x' },
  ],
  info: { author: 'xcode', version: 1 },
};

// Android density mappings for generating icons
const ANDROID_DENSITIES = [
  { name: 'mipmap-mdpi', size: 48, foregroundSize: 108 },
  { name: 'mipmap-hdpi', size: 72, foregroundSize: 162 },
  { name: 'mipmap-xhdpi', size: 96, foregroundSize: 216 },
  { name: 'mipmap-xxhdpi', size: 144, foregroundSize: 324 },
  { name: 'mipmap-xxxhdpi', size: 192, foregroundSize: 432 },
];

// Target theme orange color sampled directly from the logo border
const THEME_ORANGE = { r: 251, g: 154, b: 47 };

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('❌ Source not found:', SRC);
    process.exit(1);
  }
  const meta = await sharp(SRC).metadata();
  const w = meta.width;
  const h = meta.height;
  console.log(`📐 Source: ${SRC}`);
  console.log(`   ${w}×${h}, format: ${meta.format}, channels: ${meta.channels}`);

  // Create a nested crop mask starting at x=74, and using rx=275 to cut inside the thick black border and merge with the orange border
  const scale = w / 1254;
  const x = Math.round(74 * scale);
  const y = Math.round(74 * scale);
  const rectW = Math.round(1106 * scale);
  const rectH = Math.round(1106 * scale);
  const rx = Math.round(275 * scale); // Mathematically perfect radius to cut inside corner black outline
  const ry = Math.round(275 * scale);

  const maskSvg = Buffer.from(
    `<svg width="${w}" height="${h}">
      <rect x="${x}" y="${y}" width="${rectW}" height="${rectH}" rx="${rx}" ry="${ry}" fill="white" />
    </svg>`
  );

  console.log(`🛡️  Applying squircle mask (nested crop inside black corners): x=${x}, y=${y}, size=${rectW}x${rectH}, r=${rx}`);
  
  // Extract clean squircle to transparent PNG buffer
  const maskedImageBuffer = await sharp(SRC)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // ============ PWA icons ============
  console.log('\n🌐 PWA icons:');
  const pwaIconsDir = path.join(ROOT, 'icons');
  if (!fs.existsSync(pwaIconsDir)) {
    fs.mkdirSync(pwaIconsDir, { recursive: true });
  }

  await sharp(maskedImageBuffer).resize(192, 192, { fit: 'cover' }).flatten({ background: THEME_ORANGE }).png().toFile(path.join(pwaIconsDir, 'icon-192.png'));
  console.log('  ✓ icon-192.png (flattened corner orange background)');

  await sharp(maskedImageBuffer).resize(512, 512, { fit: 'cover' }).flatten({ background: THEME_ORANGE }).png().toFile(path.join(pwaIconsDir, 'icon-512.png'));
  console.log('  ✓ icon-512.png (flattened corner orange background)');

  const SAFE = 0.76;
  const inner = await sharp(maskedImageBuffer).resize(Math.round(512 * SAFE), Math.round(512 * SAFE), { fit: 'contain', background: { r: 251, g: 154, b: 47, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 251, g: 154, b: 47, alpha: 1 } } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(path.join(pwaIconsDir, 'icon-maskable-512.png'));
  console.log('  ✓ icon-maskable-512.png');

  await sharp(maskedImageBuffer).resize(180, 180, { fit: 'cover' }).flatten({ background: THEME_ORANGE }).png().toFile(path.join(ROOT, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png');

  await sharp(maskedImageBuffer).resize(32, 32, { fit: 'cover' }).flatten({ background: THEME_ORANGE }).png().toFile(path.join(ROOT, 'favicon-32.png'));
  console.log('  ✓ favicon-32.png');

  // ============ iOS icons (15 unique files) ============
  console.log(`\n🍎 iOS icons (${IOS_SIZES.length} sizes — alpha flattened with orange corners):`);
  if (!fs.existsSync(IOS_ICON_DIR)) {
    fs.mkdirSync(IOS_ICON_DIR, { recursive: true });
  }

  for (const [filename, size] of IOS_SIZES) {
    const outPath = path.join(IOS_ICON_DIR, filename);
    await sharp(maskedImageBuffer)
      .resize(size, size, { fit: 'cover' })
      .flatten({ background: THEME_ORANGE }) // Solid theme orange corners
      .png()
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`  ✓ ${filename.padEnd(25)} ${size}×${size} ${(stat.size/1024).toFixed(1)}KB`);
  }

  // ============ Write Contents.json ============
  const contentsPath = path.join(IOS_ICON_DIR, 'Contents.json');
  fs.writeFileSync(contentsPath, JSON.stringify(IOS_CONTENTS_JSON, null, 2));
  console.log(`\n📝 Contents.json updated (${IOS_CONTENTS_JSON.images.length} entries: ${[...new Set(IOS_CONTENTS_JSON.images.map(i=>i.idiom))].join(', ')})`);

  // ============ Android icons ============
  console.log('\n🤖 Android icons (generating legacy, round, and adaptive foreground icons):');
  if (!fs.existsSync(ANDROID_RES_DIR)) {
    console.error('❌ Android resources directory not found:', ANDROID_RES_DIR);
    process.exit(1);
  }

  for (const density of ANDROID_DENSITIES) {
    const dirPath = path.join(ANDROID_RES_DIR, density.name);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 1. Legacy Launcher Icon (ic_launcher.png) - flat theme orange corners
    const legacyPath = path.join(dirPath, 'ic_launcher.png');
    await sharp(maskedImageBuffer)
      .resize(density.size, density.size, { fit: 'cover' })
      .flatten({ background: THEME_ORANGE })
      .png()
      .toFile(legacyPath);
    console.log(`  ✓ ${density.name}/ic_launcher.png (${density.size}x${density.size})`);

    // 2. Round Launcher Icon (ic_launcher_round.png) - flat theme orange circular mask
    const roundPath = path.join(dirPath, 'ic_launcher_round.png');
    const radius = density.size / 2;
    const circleSvg = Buffer.from(
      `<svg><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/></svg>`
    );
    await sharp(maskedImageBuffer)
      .resize(density.size, density.size, { fit: 'cover' })
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .flatten({ background: THEME_ORANGE })
      .png()
      .toFile(roundPath);
    console.log(`  ✓ ${density.name}/ic_launcher_round.png (${density.size}x${density.size})`);

    // 3. Adaptive Foreground Icon (ic_launcher_foreground.png) - transparent corners preserved
    const fgPath = path.join(dirPath, 'ic_launcher_foreground.png');
    const innerSize = Math.round(density.foregroundSize * 0.66);
    const innerBuffer = await sharp(maskedImageBuffer)
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: density.foregroundSize,
        height: density.foregroundSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: innerBuffer, gravity: 'center' }])
      .png()
      .toFile(fgPath);
    console.log(`  ✓ ${density.name}/ic_launcher_foreground.png (${density.foregroundSize}x${density.foregroundSize})`);
  }

  console.log('\n✅ All assets generated successfully with Orange background corners.');
}

main().catch((e) => { console.error('❌ Error generating assets:', e.stack || e.message); process.exit(1); });
