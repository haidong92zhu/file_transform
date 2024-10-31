const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const util = require('util');

const gunzip = util.promisify(zlib.gunzip);

async function hexToUncompressed(inputPath, outputPath) {
  try {
    // Read the hex file
    const hexData = await fs.readFile(inputPath, 'utf8');

    // Convert hex to buffer
    const compressedBuffer = Buffer.from(hexData, 'hex');

    // Decompress the buffer
    const uncompressedData = await gunzip(compressedBuffer);

    // Write the uncompressed data to the output file
    await fs.writeFile(outputPath, uncompressedData);

    console.log(`Converted and uncompressed ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node hexToUncompressed.js <input_hex_file> <output_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

hexToUncompressed(inputPath, outputPath);