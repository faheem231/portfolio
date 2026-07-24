const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'public', 'assets', 'logo.png');
const dest = path.join(__dirname, 'public', 'Faheem.png');

try {
  fs.copyFileSync(src, dest);
  console.log("Logo copied to public/Faheem.png successfully!");
  fs.unlinkSync(__filename);
} catch (err) {
  console.error("Error copying logo:", err);
}
