import process from 'process';

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdout.write('Push the value:' + '\n\n');
process.stdin.on('data', reverseString);

function reverseString(value) {
  let result = '';
  for (let current of value) {
    result = current + result;
  }
  process.stdout.write(result.replace(/\r?\n|\r/g, '') + '\n\n');
}