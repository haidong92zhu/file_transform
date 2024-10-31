const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const util = require('util');

const gunzip = util.promisify(zlib.gunzip);

async function uncompressAndDehexifyFile(inputPath, outputPath) {
  const hexData = await fs.readFile(inputPath, 'utf8');
  const compressedBuffer = Buffer.from(hexData, 'hex');
  const uncompressedData = await gunzip(compressedBuffer);
  await fs.writeFile(outputPath, uncompressedData);
}

async function processFolder(inputFolder, outputFolder) {
  const entries = await fs.readdir(inputFolder, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = path.join(inputFolder, entry.name);
    const outputPath = path.join(outputFolder, entry.name.replace(/\.hex$/, ''));

    if (entry.isDirectory()) {
      await fs.mkdir(outputPath, { recursive: true });
      await processFolder(inputPath, outputPath);
    } else if (entry.name.endsWith('.hex')) {
      await uncompressAndDehexifyFile(inputPath, outputPath);
      console.log(`Uncompressed and dehexified ${inputPath} to ${outputPath}`);
    }
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node uncompressAndDehexifyFolder.js <input_folder> <output_folder>');
  process.exit(1);
}

const inputFolder = path.resolve(process.argv[2]);
const outputFolder = path.resolve(process.argv[3]);

processFolder(inputFolder, outputFolder)
  .then(() => console.log('Folder processing completed.'))
  .catch(error => console.error('Error processing folder:', error));