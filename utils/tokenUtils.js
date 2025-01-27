const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY;

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      mail: user.mail,
      role: user.role,
    },
    tokenKey,
    { expiresIn: "24h" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, tokenKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
