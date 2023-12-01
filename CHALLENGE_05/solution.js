const fs = require('node:fs');

const fileCsv = fs.readFileSync('database_attacked.csv', 'utf-8');

/**
 *
 * @param {string} file
 * @returns {Array} users
 */
const getUsersFromFile = (file) => {
  const userRows = file.split('\n');

  const users = userRows.map((row) => {
    const user = row.split(',');
    return {
      id: user[0],
      username: user[1],
      email: user[2],
      age: user[3],
      location: user[4].trim(),
    };
  });

  return users;
};

/**
 *
 * @param {{ id, username, email, age, location }} user
 * @returns {boolean} isValidUser
 */
const isValidUser = (user) => {
  const { id, username, email, age, location } = user;

  const idUsernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const ageRegex = /^\d*$/;

  const isValidLocation = location ? location.length > 0 && typeof location === 'string' : true;

  return (
    idUsernameRegex.test(id) &&
    idUsernameRegex.test(username) &&
    emailRegex.test(email) &&
    ageRegex.test(age) &&
    isValidLocation
  );
};

const users = getUsersFromFile(fileCsv);

const validUsers = users.filter((user) => isValidUser(user));
const invalidUsers = users.filter((user) => !isValidUser(user));

const hidenMessage = invalidUsers.map((invalidUser) => invalidUser.username.charAt(0)).join('');

console.log({ hidenMessage });
