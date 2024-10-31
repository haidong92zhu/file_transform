const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const AdmZip = require('adm-zip');

function hexToFolder(inputHexFile, outputFolder) {
  // Read the hex file
  const hexData = fs.readFileSync(inputHexFile, 'utf8');

  // Convert hex to buffer
  const zipBuffer = Buffer.from(hexData, 'hex');

  // Write temporary zip file
  const tempZipFile = path.join(path.dirname(outputFolder), 'temp.zip');
  fs.writeFileSync(tempZipFile, zipBuffer);

  // Extract zip file
  const zip = new AdmZip(tempZipFile);
  zip.extractAllTo(outputFolder, true);

  // Remove temporary zip file
  fs.unlinkSync(tempZipFile);

  console.log(`Restored ${inputHexFile} to folder ${outputFolder}`);
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node hexToFolder.js <input_hex_file> <output_folder>');
  process.exit(1);
}

const inputHexFile = path.resolve(process.argv[2]);
const outputFolder = path.resolve(process.argv[3]);

hexToFolder(inputHexFile, outputFolder);