const fs = require('fs').promises;
const path = require('path');

async function mergeHexLines(inputPath, outputPath) {
  try {
    // 读取输入hex文件
    const data = await fs.readFile(inputPath, 'utf8');
    
    // 移除所有换行符和空白字符，合并成一行
    const mergedHex = data.replace(/\s/g, '');
    
    // 写入新的hex文件
    await fs.writeFile(outputPath, mergedHex, 'utf8');
    
    console.log(`Merged hex file created: ${outputPath}`);
  } catch (error) {
    console.error('Error processing hex file:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 4) {
  console.log('Usage: node mergeHexLines.js <input_hex_file> <output_hex_file>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

mergeHexLines(inputPath, outputPath);