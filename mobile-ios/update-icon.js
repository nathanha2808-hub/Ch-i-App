// Generate iOS + Android App Icons from logoChiOi.jpg
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../assets/images/logoChiOi.jpg');

// === iOS ===
const iosDir = path.resolve(__dirname, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');
const iosSizes = [
  {name:'AppIcon-20@2x.png', size:40},
  {name:'AppIcon-20@3x.png', size:60},
  {name:'AppIcon-29@2x.png', size:58},
  {name:'AppIcon-29@3x.png', size:87},
  {name:'AppIcon-40@2x.png', size:80},
  {name:'AppIcon-40@3x.png', size:120},
  {name:'AppIcon-60@2x.png', size:120},
  {name:'AppIcon-60@3x.png', size:180},
  {name:'AppIcon-76@2x.png', size:152},
  {name:'AppIcon-83.5@2x.png', size:167},
  {name:'AppIcon-512@2x.png', size:1024},
];

// === Android ===
const androidMipmaps = [
  {dir:'android/app/src/main/res/mipmap-mdpi', size:48},
  {dir:'android/app/src/main/res/mipmap-hdpi', size:72},
  {dir:'android/app/src/main/res/mipmap-xhdpi', size:96},
  {dir:'android/app/src/main/res/mipmap-xxhdpi', size:144},
  {dir:'android/app/src/main/res/mipmap-xxxhdpi', size:192},
];

(async()=>{
  console.log('=== iOS Icons ===');
  for(const s of iosSizes){
    const out = path.join(iosDir, s.name);
    await sharp(src).resize(s.size,s.size,{fit:'cover'}).png().toFile(out);
    console.log('  OK: '+s.name+' ('+s.size+'x'+s.size+')');
  }

  console.log('\n=== Android Icons ===');
  for(const s of androidMipmaps){
    const dir = path.resolve(__dirname, s.dir);
    if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});

    await sharp(src).resize(s.size,s.size,{fit:'cover'}).png().toFile(path.join(dir,'ic_launcher.png'));
    await sharp(src).resize(s.size,s.size,{fit:'cover'}).png().toFile(path.join(dir,'ic_launcher_round.png'));

    const fgSize = Math.round(s.size * 1.5);
    await sharp(src).resize(fgSize,fgSize,{fit:'contain',background:{r:255,g:255,b:255,alpha:1}}).png().toFile(path.join(dir,'ic_launcher_foreground.png'));

    console.log('  OK: '+s.dir+' ('+s.size+'x'+s.size+')');
  }

  console.log('\nDone! All icons updated.');
})();
