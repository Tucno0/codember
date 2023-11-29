const fs = require('node:fs');

const message = fs.readFileSync('message_01.txt', 'utf8');
const words = message.split(' ');

const wordsCount = {};

words.forEach((word) => {
  if (!wordsCount[word]) {
    const wordsUniques = message.match(new RegExp(word, 'gi'));
    wordsCount[word.toLowerCase()] = wordsUniques.length;
  }
});

let result = '';

for (const key of Object.keys(wordsCount)) {
  result += `${key}${wordsCount[key]}`;
}

console.log(result);
