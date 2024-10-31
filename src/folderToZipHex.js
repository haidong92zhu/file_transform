const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');

function folderToZipHex(inputFolder, outputHexFile) {
  return new Promise((resolve, reject) => {
    const tempZipFile = path.join(path.dirname(outputHexFile), 'temp.zip');
    const output = fs.createWriteStream(tempZipFile);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      const zipBuffer = fs.readFileSync(tempZipFile);
      const hexString = zipBuffer.toString('hex');
      fs.writeFileSync(outputHexFile, hexString);
      fs.unlinkSync(tempZipFile);
      console.log(`${outputHexFile} created successfully. Total bytes: ${hexString.length / 2}`);
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(inputFolder, false);
    archive.finalize();
  });
}

// Check command line arguments
if (process.argv.length < 4) {
  console.log('Usage: node folderToZipHex.js <input_folder> <output_hex_file>');
  process.exit(1);
}

const inputFolder = path.resolve(process.argv[2]);
const outputHexFile = path.resolve(process.argv[3]);

folderToZipHex(inputFolder, outputHexFile)
  .then(() => console.log('Process completed successfully.'))
  .catch((error) => console.error('Error:', error));