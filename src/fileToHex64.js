const fs = require('fs');
const path = require('path');

function fileToBase64(inputFile, outputBase64File) {
  const fileBuffer = fs.readFileSync(inputFile);
  const base64String = fileBuffer.toString('base64');
  fs.writeFileSync(outputBase64File, base64String);
  console.log(`Converted ${inputFile} to base64 in ${outputBase64File}`);
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node fileToBase64.js <input_file> <output_base64_file>');
  process.exit(1);
}

const inputFile = path.resolve(process.argv[2]);
const outputBase64File = path.resolve(process.argv[3]);

fileToBase64(inputFile, outputBase64File);