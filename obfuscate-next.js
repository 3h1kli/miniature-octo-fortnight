const fs = require('fs');
const path = require('path');
const obfuscator = require('javascript-obfuscator');

const folderToObfuscate = path.join(__dirname, '.next', 'server'); // You can also add .next/static if needed

const obfuscateFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscated = obfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    stringArray: true,
    rotateStringArray: true,
  }).getObfuscatedCode();

  fs.writeFileSync(filePath, obfuscated, 'utf8');
  console.log(`✅ Obfuscated: ${filePath}`);
};

const walk = (dir) => {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️ Folder does not exist: ${dir}`);
    return;
  }
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (/\.(js|jsx)$/.test(file)) {
      obfuscateFile(fullPath);
    }
  });
};

walk(folderToObfuscate);