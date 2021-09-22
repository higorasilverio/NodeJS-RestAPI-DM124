require("dotenv").config();
const Bcrypt = require("bcryptjs");

const { promisify } = require("util");

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);

class PasswordHelper {
  static hashPassword(pass) {
    return hashAsync(pass, parseInt(process.env.BCRYPT_SALT, 10));
  }

  static comparePassword(pass, hash) {
    return compareAsync(pass, hash);
  }
}

module.exports = PasswordHelper;
