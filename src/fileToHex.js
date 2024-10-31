const fs = require('fs');
const path = require('path');

function fileToHex(inputFile, outputHexFile) {
  const fileBuffer = fs.readFileSync(inputFile);
  const hexString = fileBuffer.toString('hex');
  fs.writeFileSync(outputHexFile, hexString);
  console.log(`Converted ${inputFile} to hex in ${outputHexFile}`);
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node fileToHex.js <input_file> <output_hex_file>');
  process.exit(1);
}

const inputFile = path.resolve(process.argv[2]);
const outputHexFile = path.resolve(process.argv[3]);

fileToHex(inputFile, outputHexFile);