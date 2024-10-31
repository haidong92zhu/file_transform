const fs = require('fs').promises;
const path = require('path');

async function binaryToHex(inputPath, outputPath) {
  try {
    const binaryData = await fs.readFile(inputPath, 'utf8');
    const hexString = binaryData.match(/.{1,8}/g)
      .map(byte => parseInt(byte, 2).toString(16).padStart(2, '0'))
      .join('');
    await fs.writeFile(outputPath, hexString, 'utf8');
    console.log(`Converted ${inputPath} to hexadecimal in ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node binaryToHex.js <input_binary_file> <output_hex_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

binaryToHex(inputPath, outputPath);