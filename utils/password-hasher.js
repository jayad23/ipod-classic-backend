const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const onComparePassword = async (password, hash) =>
  new Promise(async (resolve, reject) => {
    await comparePassword(password, hash)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = { hashPassword, onComparePassword };
