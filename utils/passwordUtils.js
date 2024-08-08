const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (inputPassword, userPassword) => {
  return await bcrypt.compare(inputPassword, userPassword);
};

module.exports = {
  encryptPassword,
  comparePasswords,
};
