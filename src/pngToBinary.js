const fs = require('fs').promises;
const path = require('path');

async function pngToBinary(inputPath, outputPath) {
  try {
    // 读取PNG文件
    const data = await fs.readFile(inputPath);
    
    // 将文件内容转换为二进制字符串
    const binaryString = data.reduce((acc, byte) => {
      return acc + byte.toString(2).padStart(8, '0');
    }, '');
    
    // 将二进制字符串写入输出文件
    await fs.writeFile(outputPath, binaryString, 'utf8');
    
    console.log(`Binary code saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 4) {
  console.log('Usage: node pngToBinary.js <input_png_path> <output_txt_path>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

pngToBinary(inputPath, outputPath);