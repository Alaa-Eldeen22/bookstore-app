const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access denied. Invalid or expired token.");
  }

  try {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    res.status(401).send("Access denied. Invalid or expired token.");
  }
};

module.exports = authUser;
