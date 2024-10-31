const fs = require('fs').promises;
const path = require('path');

async function fileToHex(inputFile, outputHexFile) {
  const fileBuffer = await fs.readFile(inputFile);
  const hexString = fileBuffer.toString('hex');
  await fs.writeFile(outputHexFile, hexString);
  console.log(`Converted ${inputFile} to hex in ${outputHexFile}`);
}

async function batchFileToHex(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${file}.hex`);
      await fileToHex(inputPath, outputPath);
    }

    console.log('Batch conversion completed.');
  } catch (error) {
    console.error('Error during batch conversion:', error);
  }
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node batchFileToHex.js <input_directory> <output_directory>');
  process.exit(1);
}

const inputDir = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);

batchFileToHex(inputDir, outputDir);