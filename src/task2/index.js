const fs = require('fs');
const readline = require('readline');
const path = require('path');
const csv = require("csvtojson");

const fileName = 'nodejs-hw1-ex1';
const filePath = path.resolve(__dirname, `../../csv/${fileName}.csv`);

try {
  fs.accessSync(filePath, fs.constants.F_OK);
} catch (error) {
  console.error(error.message);
  return;
}

const readable = fs.createReadStream(filePath);
const writable = fs.createWriteStream(path.resolve(__dirname, `../../csv/${fileName}.txt`), 'utf-8');

const rd = readline.createInterface({
  input: readable.pipe(csv()),
  output: writable,
});

rd.on('line', (line) => writable.write(line + '\n'));
rd.on('close', () => writable.close());