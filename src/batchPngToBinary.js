const fs = require('fs').promises;
const path = require('path');

async function pngToBinary(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath);
    const binaryString = data.reduce((acc, byte) => {
      return acc + byte.toString(2).padStart(8, '0');
    }, '');
    await fs.writeFile(outputPath, binaryString, 'utf8');
    console.log(`Converted ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function batchPngToBinary(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);
    const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

    for (const file of pngFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.basename(file, '.png')}.txt`);
      await pngToBinary(inputPath, outputPath);
    }

    console.log('Batch conversion completed.');
  } catch (error) {
    console.error('Error during batch conversion:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 4) {
  console.log('Usage: node batchPngToBinary.js <input_directory> <output_directory>');
  process.exit(1);
}

const inputDir = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);

batchPngToBinary(inputDir, outputDir);