const fs = require('node:fs');

const encryptionPolicies = fs.readFileSync('encryption_policies.txt', 'utf8').split('\n');

let invalid = 0;
let result = '';

for (const policy of encryptionPolicies) {
  const [range, letter, key] = policy.split(' ');
  const [min, max] = range.split('-');

  const regex = new RegExp(letter[0], 'g');
  const matches = (key.match(regex) ?? []).length;

  if (matches < min || matches > max) {
    invalid++;
  }

  if (invalid === 13) {
    result = key;
    break;
  }

  // console.log({ invalid });
  // console.log({ min, max, letter: letter[0], key, matches });
}

console.log({ result });
