const fs = require('fs').promises;
const path = require('path');

async function hexToBinary(inputPath, outputPath) {
  try {
    const hexData = await fs.readFile(inputPath, 'utf8');
    const binaryString = hexData.split('')
      .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
      .join('');
    await fs.writeFile(outputPath, binaryString, 'utf8');
    console.log(`Converted ${inputPath} to binary in ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node hexToBinary.js <input_hex_file> <output_binary_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

hexToBinary(inputPath, outputPath);