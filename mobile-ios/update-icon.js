// Generate iOS App Icon from logoTasker.jpg
const sharp = require('sharp');
const path = require('path');

const src = path.resolve(__dirname, '../assets/images/logoTasker.jpg');
const iosDir = path.resolve(__dirname, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');

const sizes = [
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

(async()=>{
  for(const s of sizes){
    const out = path.join(iosDir, s.name);
    await sharp(src).resize(s.size,s.size,{fit:'cover'}).png().toFile(out);
    console.log('OK: '+s.name+' ('+s.size+'x'+s.size+')');
  }
  console.log('Done! Icon iOS updated.');
})();
