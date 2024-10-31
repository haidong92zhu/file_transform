const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const util = require('util');

const gzip = util.promisify(zlib.gzip);

async function compressBinary(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath, 'utf8');
    const compressed = await gzip(data);
    await fs.writeFile(outputPath, compressed);
    console.log(`Compressed ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node compressBinary.js <input_binary_file> <output_compressed_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

compressBinary(inputPath, outputPath);