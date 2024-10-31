const fs = require('fs').promises;
const path = require('path');
const zlib = require('zlib');
const util = require('util');

const gzip = util.promisify(zlib.gzip);

async function compressAndHexifyFile(inputPath, outputPath) {
  const data = await fs.readFile(inputPath);
  const compressed = await gzip(data);
  const hexString = compressed.toString('hex');
  await fs.writeFile(outputPath, hexString, 'utf8');
}

async function processFolder(inputFolder, outputFolder) {
  const entries = await fs.readdir(inputFolder, { withFileTypes: true });

  for (const entry of entries) {
    const inputPath = path.join(inputFolder, entry.name);
    const outputPath = path.join(outputFolder, entry.name + '.hex');

    if (entry.isDirectory()) {
      await fs.mkdir(outputPath, { recursive: true });
      await processFolder(inputPath, outputPath);
    } else {
      await compressAndHexifyFile(inputPath, outputPath);
      console.log(`Compressed and hexified ${inputPath} to ${outputPath}`);
    }
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node compressAndHexifyFolder.js <input_folder> <output_folder>');
  process.exit(1);
}

const inputFolder = path.resolve(process.argv[2]);
const outputFolder = path.resolve(process.argv[3]);

processFolder(inputFolder, outputFolder)
  .then(() => console.log('Folder processing completed.'))
  .catch(error => console.error('Error processing folder:', error));