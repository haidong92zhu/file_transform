const fs = require('fs').promises;
const path = require('path');

async function binaryToPng(inputPath, outputPath) {
  try {
    const binaryString = await fs.readFile(inputPath, 'utf8');
    const byteArray = [];
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = binaryString.substr(i, 8);
      byteArray.push(parseInt(byte, 2));
    }
    const buffer = Buffer.from(byteArray);
    await fs.writeFile(outputPath, buffer);
    console.log(`Converted ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function batchBinaryToPng(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);
    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    for (const file of txtFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.basename(file, '.txt')}.png`);
      await binaryToPng(inputPath, outputPath);
    }

    console.log('Batch conversion completed.');
  } catch (error) {
    console.error('Error during batch conversion:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 4) {
  console.log('Usage: node batchBinaryToPng.js <input_directory> <output_directory>');
  process.exit(1);
}

const inputDir = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);

batchBinaryToPng(inputDir, outputDir);