const fs = require('node:fs');

const files = fs.readFileSync('files_quarantine.txt', 'utf8').split('\n');

/**
 * Function that checks if a file is valid
 * @param {string} file
 * @returns {{newChecksum, isValid}}
 */
const isfileValid = (file) => {
  let [name, checksum] = file.split('-');
  checksum = checksum.trim();

  const countLetters = {};

  name.split('').forEach((letter) => {
    countLetters[letter] ? countLetters[letter]++ : (countLetters[letter] = 1);
  });

  let newChecksum = '';

  for (const letter of name) {
    // console.log(countLetters[letter]);
    // console.log(letter);
    if (countLetters[letter] === 1) {
      newChecksum += letter;
    }
  }

  // console.log({ name, countLetters, checksum, newChecksum });

  return checksum === newChecksum ? { newChecksum, isValid: true } : { newChecksum, isValid: false };
};

let count = 0;

files.forEach((file) => {
  const fileEvaluated = isfileValid(file);

  fileEvaluated.isValid ? count++ : null;

  if (count === 33) {
    console.log(fileEvaluated.newChecksum);
  }
});
