/**
 * Regenerate all app icons from logo/logo.jpg master
 * Run from D:\New folder\Ch-i-App\mobile-ios (where sharp is installed)
 *
 * Output:
 *   frontend/icons/icon-192.png            PWA 192x192
 *   frontend/icons/icon-512.png            PWA 512x512
 *   frontend/icons/icon-maskable-512.png   PWA maskable (12% safe padding)
 *   mobile-ios/.../AppIcon-512@2x.png      iOS 1024x1024 (flatten alpha)
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'logo', 'logo.jpg');

async function main() {
  // 1. Verify source
  if (!fs.existsSync(SRC)) {
    console.error('❌ Source not found:', SRC);
    process.exit(1);
  }
  const meta = await sharp(SRC).metadata();
  console.log(`📐 Source: ${SRC}`);
  console.log(`   Size: ${meta.width}×${meta.height}, format: ${meta.format}, channels: ${meta.channels}`);

  if (meta.width < 1024 || meta.height < 1024) {
    console.warn(`⚠️  Source <1024px — iOS icon may look pixelated`);
  }

  // 2. PWA icon 192x192 (transparent OK)
  const pwa192 = path.join(ROOT, 'frontend', 'icons', 'icon-192.png');
  await sharp(SRC).resize(192, 192, { fit: 'cover' }).png().toFile(pwa192);
  console.log(`✅ ${pwa192} (192×192)`);

  // 3. PWA icon 512x512 (transparent OK)
  const pwa512 = path.join(ROOT, 'frontend', 'icons', 'icon-512.png');
  await sharp(SRC).resize(512, 512, { fit: 'cover' }).png().toFile(pwa512);
  console.log(`✅ ${pwa512} (512×512)`);

  // 4. PWA maskable 512x512 with 12% safe area padding
  // Inner image at 76% (88% on each side - 12% padding); composite onto orange bg
  const SAFE_AREA = 0.76;
  const INNER_SIZE = Math.round(512 * SAFE_AREA);
  const pwaMaskable = path.join(ROOT, 'frontend', 'icons', 'icon-maskable-512.png');
  const innerBuf = await sharp(SRC)
    .resize(INNER_SIZE, INNER_SIZE, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }, // White bg (theme uses orange but white safer)
    },
  })
    .composite([{ input: innerBuf, gravity: 'center' }])
    .png()
    .toFile(pwaMaskable);
  console.log(`✅ ${pwaMaskable} (512×512 maskable, ${SAFE_AREA*100}% safe area)`);

  // 5. iOS AppIcon 1024x1024 — Apple REQUIRES no alpha channel, opaque
  const iosIcon = path.join(__dirname, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset', 'AppIcon-512@2x.png');
  await sharp(SRC)
    .resize(1024, 1024, { fit: 'cover' })
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Force opaque white BG
    .png()
    .toFile(iosIcon);
  console.log(`✅ ${iosIcon} (1024×1024 iOS, alpha flattened)`);

  // 6. Verify all generated files
  console.log('\n📊 Final sizes:');
  for (const f of [pwa192, pwa512, pwaMaskable, iosIcon]) {
    const stat = fs.statSync(f);
    const meta = await sharp(f).metadata();
    console.log(`   ${path.basename(f)}: ${meta.width}×${meta.height}, ${(stat.size/1024).toFixed(1)}KB`);
  }
}

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
