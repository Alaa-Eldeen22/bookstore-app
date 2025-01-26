const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class AuthService {
  constructor() {
    this.UserModel = UserModel;
    this.tokenKey = config.JWT_SECRET; // Use your secret key from config
  }

  /**
   * Logs in a user by verifying their credentials.
   * @param {Object} credentials - The user's login credentials.
   * @param {string} credentials.mail - The user's email.
   * @param {string} credentials.password - The user's password.
   * @returns {Object} The user's details, including a token.
   * @throws {Error} If the email or password is invalid.
   */
  async login({ mail, password }) {
    const user = await this.UserModel.findOne({ mail: mail.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid email or password. Please try again.");
      error.statusCode = 401;
      throw error;
    }

    const token = this.generateToken(user);

    return {
      id: user._id,
      token,
      role: user.role,
    };
  }

  /**
   * Registers a new user and returns their details with a token.
   * @param {Object} userData - The user's registration details.
   * @param {string} userData.firstname - The user's first name.
   * @param {string} userData.lastname - The user's last name.
   * @param {string} userData.mail - The user's email.
   * @param {string} userData.password - The user's password.
   * @param {string} [userData.role="user"] - The user's role.
   * @returns {Object} The newly registered user's details, including a token.
   * @throws {Error} If the email is already in use.
   */
  async register({ firstname, lastname, mail, password, role = "user" }) {
    const userExist = await this.UserModel.exists({ mail: mail.toLowerCase() });

    if (userExist) {
      const error = new Error("Email already in use.");
      error.statusCode = 409;
      throw error;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.UserModel.create({
      firstname,
      lastname,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    const token = this.generateToken(user);

    return {
      id: user._id,
      token,
      role: user.role,
    };
  }

  /**
   * Generates a JWT token for a user.
   * @param {Object} user - The user object.
   * @returns {string} The JWT token.
   */
  generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      this.tokenKey,
      { expiresIn: "7d" } // Token valid for 7 days
    );
  }
}

module.exports = AuthService;
