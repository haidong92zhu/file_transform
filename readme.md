### 运行方式

## png转二进制文件
```bash
node src/pngToBinary.js input.png output.txt
```

## 二进制转png文件
```bash
node src/binaryToPng.js input.txt output.png
```

## 批量PNG到二进制转换
```bash
node src/batchPngToBinary.js ./input_png_folder ./output_binary_folder
```

## 批量二进制到PNG转换
```bash
node src/batchBinaryToPng.js ./input_binary_folder ./output_png_folder
```

## 压缩二进制文本
```bash
node src/compressBinary.js input.txt output.gz
```

## 二进制文本转十六进制
```bash
node src/binaryToHex.js input.txt output.hex
```

## 十六进制转二进制
```bash
node src/hexToBinary.js input.hex output.txt
```

## 压缩并转换为十六进制
```bash
node src/compressAndHexify.js input_file output.hex
```

## 十六进制转换为原始未压缩文件
```bash
node src/hexToUncompressed.js input.hex output_file
```

## 压缩并转换文件夹为十六进制
```bash
node src/compressAndHexifyFolder.js input_folder output_folder
```

## 还原十六进制文件夹为原始未压缩文件
```bash
node src/uncompressAndDehexifyFolder.js input_hex_folder output_folder
```

## 压缩文件夹为zip并转换成十六进制文件
```bash
npm install archiver
node src/folderToZipHex.js input_folder output.hex
```
## 恢复十六进制文件到原始文件夹
```bash
npm install adm-zip
node src/hexToFolder.js input.hex output_folder
```

## 文件转换成十六进制文件
```bash
node src/fileToHex.js input_file output.hex
```

## 文件转换成六十四进制文件
```bash
node src/fileToHex64.js input_file output.hex
```

## 批量跑把文件转换成16进制文件
```bash
node src/batchFileToHex.js input_directory output_directory
```

## hex文件均匀地分割成n个新的hex文件
```bash
node src/sliceHexFile.js input.hex ./output_slices 5
```
## hex文件删除换行
```bash
node src/mergeHexLines.js input.hex output.hex
```

## pdf转word
```bash
npm install pdf-parse docx
node src/convertPdfToWord.js input.pdf output.docx
```
