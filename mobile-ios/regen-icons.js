/**
 * Regenerate ALL app icons from assets/images/logo.jpg master
 * Run: cd mobile-ios && node regen-icons.js
 *
 * Output PWA:
 *   icons/icon-192.png            PWA 192x192
 *   icons/icon-512.png            PWA 512x512
 *   icons/icon-maskable-512.png   PWA maskable (76% safe area)
 *   apple-touch-icon.png          iOS Safari 180x180 (white bg)
 *   favicon-32.png                Browser tab favicon
 *
 * Output iOS (18 sizes — full coverage):
 *   AppIcon-20.png       20x20  @1x ipad
 *   AppIcon-20@2x.png    40x40  @2x iphone/ipad
 *   AppIcon-20@3x.png    60x60  @3x iphone
 *   AppIcon-29.png       29x29  @1x ipad
 *   AppIcon-29@2x.png    58x58  @2x iphone/ipad
 *   AppIcon-29@3x.png    87x87  @3x iphone
 *   AppIcon-40.png       40x40  @1x ipad
 *   AppIcon-40@2x.png    80x80  @2x iphone/ipad
 *   AppIcon-40@3x.png    120x120 @3x iphone
 *   AppIcon-60@2x.png    120x120 @2x iphone
 *   AppIcon-60@3x.png    180x180 @3x iphone
 *   AppIcon-76.png       76x76  @1x ipad
 *   AppIcon-76@2x.png    152x152 @2x ipad
 *   AppIcon-83.5@2x.png  167x167 @2x ipad Pro
 *   AppIcon-512@2x.png   1024x1024 ios-marketing (App Store)
 * 
 * Output Android (5 sizes for legacy, round and adaptive):
 *   mipmap-mdpi/ic_launcher.png             48x48
 *   mipmap-mdpi/ic_launcher_round.png       48x48
 *   mipmap-mdpi/ic_launcher_foreground.png  108x108
 *   mipmap-hdpi/...                         72x72 / 72x72 / 162x162
 *   mipmap-xhdpi/...                        96x96 / 96x96 / 216x216
 *   mipmap-xxhdpi/...                       144x144 / 144x144 / 324x324
 *   mipmap-xxxhdpi/...                      192x192 / 192x192 / 432x432
 *
 * iOS/Android requirements: Flattened backgrounds for non-adaptive launcher icons.
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

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('❌ Source not found:', SRC);
    process.exit(1);
  }
  const meta = await sharp(SRC).metadata();
  console.log(`📐 Source: ${SRC}`);
  console.log(`   ${meta.width}×${meta.height}, format: ${meta.format}, channels: ${meta.channels}`);

  // ============ PWA icons ============
  console.log('\n🌐 PWA icons:');
  const pwaIconsDir = path.join(ROOT, 'icons');
  if (!fs.existsSync(pwaIconsDir)) {
    fs.mkdirSync(pwaIconsDir, { recursive: true });
  }

  await sharp(SRC).resize(192, 192, { fit: 'cover' }).png().toFile(path.join(pwaIconsDir, 'icon-192.png'));
  console.log('  ✓ icon-192.png');

  await sharp(SRC).resize(512, 512, { fit: 'cover' }).png().toFile(path.join(pwaIconsDir, 'icon-512.png'));
  console.log('  ✓ icon-512.png');

  const SAFE = 0.76;
  const inner = await sharp(SRC).resize(Math.round(512 * SAFE), Math.round(512 * SAFE), { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(path.join(pwaIconsDir, 'icon-maskable-512.png'));
  console.log('  ✓ icon-maskable-512.png');

  await sharp(SRC).resize(180, 180, { fit: 'cover' }).flatten({ background: { r: 255, g: 255, b: 255 } }).png().toFile(path.join(ROOT, 'apple-touch-icon.png'));
  console.log('  ✓ apple-touch-icon.png');

  await sharp(SRC).resize(32, 32, { fit: 'cover' }).flatten({ background: { r: 255, g: 255, b: 255 } }).png().toFile(path.join(ROOT, 'favicon-32.png'));
  console.log('  ✓ favicon-32.png');

  // ============ iOS icons (15 unique files) ============
  console.log(`\n🍎 iOS icons (${IOS_SIZES.length} sizes — alpha flattened):`);
  if (!fs.existsSync(IOS_ICON_DIR)) {
    fs.mkdirSync(IOS_ICON_DIR, { recursive: true });
  }

  for (const [filename, size] of IOS_SIZES) {
    const outPath = path.join(IOS_ICON_DIR, filename);
    await sharp(SRC)
      .resize(size, size, { fit: 'cover' })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
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

    // 1. Legacy Launcher Icon (ic_launcher.png)
    const legacyPath = path.join(dirPath, 'ic_launcher.png');
    await sharp(SRC)
      .resize(density.size, density.size, { fit: 'cover' })
      .png()
      .toFile(legacyPath);
    console.log(`  ✓ ${density.name}/ic_launcher.png (${density.size}x${density.size})`);

    // 2. Round Launcher Icon (ic_launcher_round.png)
    const roundPath = path.join(dirPath, 'ic_launcher_round.png');
    const radius = density.size / 2;
    const circleSvg = Buffer.from(
      `<svg><circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/></svg>`
    );
    await sharp(SRC)
      .resize(density.size, density.size, { fit: 'cover' })
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .png()
      .toFile(roundPath);
    console.log(`  ✓ ${density.name}/ic_launcher_round.png (${density.size}x${density.size})`);

    // 3. Adaptive Foreground Icon (ic_launcher_foreground.png)
    const fgPath = path.join(dirPath, 'ic_launcher_foreground.png');
    const innerSize = Math.round(density.foregroundSize * 0.66);
    const innerBuffer = await sharp(SRC)
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

  console.log('\n✅ All assets generated successfully. Next step: npx cap sync android');
}

main().catch((e) => { console.error('❌ Error generating assets:', e.stack || e.message); process.exit(1); });
