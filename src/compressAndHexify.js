const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const util = require('util');

const gzip = util.promisify(zlib.gzip);

async function compressAndHexify(inputPath, outputPath) {
  try {
    // Read the input file
    const data = await fs.readFile(inputPath);

    // Compress the data
    const compressed = await gzip(data);

    // Convert compressed data to hexadecimal
    const hexString = compressed.toString('hex');

    // Write the hexadecimal string to the output file
    await fs.writeFile(outputPath, hexString, 'utf8');

    console.log(`Compressed and hexified ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node compressAndHexify.js <input_file> <output_hex_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

compressAndHexify(inputPath, outputPath);