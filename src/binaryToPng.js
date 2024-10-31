const fs = require('fs').promises;
const path = require('path');

async function binaryToPng(inputPath, outputPath) {
  try {
    // 读取二进制文本文件
    const binaryString = await fs.readFile(inputPath, 'utf8');
    
    // 将二进制字符串转换回字节数组
    const byteArray = [];
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = binaryString.substr(i, 8);
      byteArray.push(parseInt(byte, 2));
    }
    
    // 创建 Buffer 对象
    const buffer = Buffer.from(byteArray);
    
    // 将 Buffer 写入 PNG 文件
    await fs.writeFile(outputPath, buffer);
    
    console.log(`PNG file saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing binary file:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 4) {
  console.log('Usage: node binaryToPng.js <input_txt_path> <output_png_path>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);

binaryToPng(inputPath, outputPath);