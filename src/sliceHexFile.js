const fs = require('fs').promises;
const path = require('path');

async function sliceHexFile(inputPath, outputDir, n) {
  try {
    // 读取输入hex文件
    const data = await fs.readFile(inputPath, 'utf8');
    
    // 移除所有空白字符
    const hexData = data.replace(/\s/g, '');
    
    // 确保hex字符串长度是偶数
    if (hexData.length % 2 !== 0) {
      throw new Error('Invalid hex file: odd number of characters');
    }
    
    // 计算每个切片的大小（以字节为单位）
    const sliceSize = Math.ceil(hexData.length / (2 * n));
    
    // 创建输出目录（如果不存在）
    await fs.mkdir(outputDir, { recursive: true });
    
    // 切片并写入文件
    for (let i = 0; i < n; i++) {
      const start = i * sliceSize * 2;
      const end = Math.min((i + 1) * sliceSize * 2, hexData.length);
      const slice = hexData.slice(start, end);
      
      const outputPath = path.join(outputDir, `slice_${i + 1}.hex`);
      await fs.writeFile(outputPath, slice, 'utf8');
      console.log(`Slice ${i + 1} written to ${outputPath}`);
    }
    
    console.log('Slicing completed successfully.');
  } catch (error) {
    console.error('Error slicing hex file:', error);
  }
}

// 检查命令行参数
if (process.argv.length < 5) {
  console.log('Usage: node sliceHexFile.js <input_hex_file> <output_directory> <number_of_slices>');
  process.exit(1);
}

const inputPath = path.resolve(process.argv[2]);
const outputDir = path.resolve(process.argv[3]);
const numberOfSlices = parseInt(process.argv[4], 10);

if (isNaN(numberOfSlices) || numberOfSlices <= 0) {
  console.error('Number of slices must be a positive integer');
  process.exit(1);
}

sliceHexFile(inputPath, outputDir, numberOfSlices);
