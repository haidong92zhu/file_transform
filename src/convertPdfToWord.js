const fs = require('fs');
const pdf = require('pdf-parse');
const docx = require('docx');
const path = require('path');

async function convertPdfToWord(pdfPath, docxPath) {
  // 读取PDF文件
  const dataBuffer = fs.readFileSync(pdfPath);

  try {
    // 解析PDF内容
    const data = await pdf(dataBuffer);

    // 创建新的Word文档
    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun(data.text)],
          }),
        ],
      }],
    });

    // 生成Word文档
    const buffer = await docx.Packer.toBuffer(doc);

    // 保存Word文档
    fs.writeFileSync(docxPath, buffer);

    console.log(`转换完成：${pdfPath} -> ${docxPath}`);
  } catch (error) {
    console.error('转换过程中出错:', error);
  }
}

const inputFile = path.resolve(process.argv[2]);
const outputFile = path.resolve(process.argv[3]);

convertPdfToWord(inputFile, outputFile);
