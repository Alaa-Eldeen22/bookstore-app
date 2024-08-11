const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .json({ message: "To access this route a token must be provided" });
  }

  try {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(decoded);
    req.user = decoded;
    return next();
  } catch (err) {
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = authUser;
