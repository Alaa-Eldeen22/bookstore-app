const jwt = require("jsonwebtoken");

const generateToken = (user, tokenKey) => {
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

const verifyToken = (token, tokenKey) => {
  return jwt.verify(token, tokenKey);
};

module.exports = {
  generateToken,
  verifyToken,
};
