import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';
import { csv } from 'csvtojson';

try {
  const FILE_NAME = 'nodejs-hw1-ex1';
  const filePath = path.resolve(__dirname, `../../csv/${FILE_NAME}.csv`);

  fs.accessSync(filePath, fs.constants.F_OK);

  const readable = fs.createReadStream(filePath);
  const writable = fs.createWriteStream(path.resolve(__dirname, `../../csv/${FILE_NAME}.txt`), 'utf-8');

  const rd = readline.createInterface({
    input: readable.pipe(csv()),
    output: writable,
  });
  
  rd.on('line', (line) => writable.write(line + '\n'));
  rd.on('close', () => writable.close());
} catch (error) {
  console.error(error.message);
}