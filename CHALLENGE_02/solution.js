const fs = require('node:fs');

const symbols = fs.readFileSync('message_02.txt', 'utf8');
const operations = symbols.split('');

let result = '';
let num = 0;

operations.forEach((operation) => {
  switch (operation) {
    case '#':
      num += 1;
      break;
    case '@':
      num -= 1;
      break;
    case '*':
      num *= num;
      break;
    case '&':
      result += num;
      break;
    default:
      break;
  }
});

console.log({ result });
