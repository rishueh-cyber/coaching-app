#!/usr/bin/env node

/**
 * Icon Conversion Script
 * Converts SVG to ICO and PNG formats
 * Usage: node scripts/convert-icon.js
 */

const fs = require('fs');
const path = require('path');

const ICON_SVG = path.join(__dirname, '../public/icon.svg');
const ICON_ICO = path.join(__dirname, '../public/icon.ico');
const ICON_PNG = path.join(__dirname, '../public/icon-512.png');

console.log('🎨 Raise Me Icon Conversion Tool\n');
console.log('Converting icon.svg to other formats...\n');

// Check if SVG exists
if (!fs.existsSync(ICON_SVG)) {
  console.error('❌ Error: icon.svg not found at', ICON_SVG);
  console.log('\nPlease ensure icon.svg exists in the public/ folder.\n');
  process.exit(1);
}

console.log('📝 SVG File Found:', ICON_SVG);
console.log('\n⚠️  Note: To convert SVG to ICO/PNG, you have two options:\n');

console.log('Option 1 - Online Converter (Easiest):');
console.log('  1. Visit: https://convertio.co/svg-ico/');
console.log('  2. Upload: public/icon.svg');
console.log('  3. Download as icon.ico');
console.log('  4. Save to: public/icon.ico\n');

console.log('Option 2 - ImageMagick (Command Line):');
console.log('  Install ImageMagick: https://imagemagick.org/script/download.php');
console.log('  Then run:');
console.log('    magick convert public/icon.svg -define icon:auto-resize=256,128,96,64,48,32,16 public/icon.ico\n');

console.log('Option 3 - Use Sharp Library:');
console.log('  Run: npm install sharp');
console.log('  Then: node scripts/convert-icon-sharp.js\n');

console.log('✅ Recommended: Use Option 1 (Online Tool) - No installation needed!\n');

// Provide alternative script
const sharpScript = `#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SVG = path.join(__dirname, '../public/icon.svg');
const ICON_PNG = path.join(__dirname, '../public/icon-512.png');
const ICON_ICO = path.join(__dirname, '../public/icon.ico');

async function convertIcon() {
  try {
    console.log('Converting icon.svg to PNG...');
    
    // Read SVG and convert to PNG
    const svg = fs.readFileSync(ICON_SVG);
    await sharp(svg)
      .png()
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(ICON_PNG);
    
    console.log('✅ PNG created:', ICON_PNG);
    
    // For ICO, we need a different approach
    console.log('Note: ICO conversion requires additional tools.');
    console.log('Recommend using online tool or ImageMagick for .ico file');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

convertIcon();
`;

// Create helper script
const scriptDir = path.join(__dirname);
if (!fs.existsSync(scriptDir)) {
  fs.mkdirSync(scriptDir, { recursive: true });
}

const helperScript = path.join(scriptDir, 'convert-icon-sharp.js');
fs.writeFileSync(helperScript, sharpScript);
console.log('💡 Helper script created: scripts/convert-icon-sharp.js');
console.log('   To use: npm install sharp && node scripts/convert-icon-sharp.js\n');
