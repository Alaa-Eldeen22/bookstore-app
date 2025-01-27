class AuthService {
  /**
   * Handles business logic for authentication operations.
   * @param {Model} UserModel - Mongoose model for User.
   * @param {object} passwordUtils - Utility functions for password encryption and comparison.
   * @param {object} tokenUtils - Utility functions for generating and verifying JWT tokens.
   */
  constructor(UserModel, passwordUtils, tokenUtils) {
    this.UserModel = UserModel;
    this.passwordUtils = passwordUtils;
    this.tokenUtils = tokenUtils;
  }

  /**
   * Login a user by verifying credentials and returning a JWT token.
   * @param {object} credentials - User credentials (email and password).
   * @returns {object} - User details and JWT token.
   * @throws {Error} - If login fails due to invalid credentials.
   */
  async login({ mail, password }) {
    const user = await this.UserModel.findOne({ mail: mail.toLowerCase() });
    if (
      !user ||
      !(await this.passwordUtils.comparePasswords(password, user.password))
    ) {
      const error = new Error(
        "There was a problem logging in. Check your email and password or create an account."
      );
      error.statusCode = 401;
      throw error;
    }

    const token = this.tokenUtils.generateToken(user);
    return {
      id: user._id,
      token,
      role: user.role,
    };
  }

  /**
   * Register a new user by saving their data to the database and returning a JWT token.
   * @param {object} userData - User data (name, email, password).
   * @returns {object} - Newly created user details and JWT token.
   * @throws {Error} - If the email is already registered.
   */
  async register({ firstname, lastname, mail, password }) {
    const userExist = await this.UserModel.exists({ mail: mail.toLowerCase() });
    if (userExist) {
      const error = new Error("Email already used");
      error.statusCode = 409;
      throw error;
    }

    const encryptedPassword = await this.passwordUtils.encryptPassword(
      password
    );
    const user = await this.UserModel.create({
      firstname,
      lastname,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = this.tokenUtils.generateToken(user);
    return {
      id: user._id,
      token,
      role: user.role,
    };
  }
}

module.exports = AuthService;
