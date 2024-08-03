const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { password, mail } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          useId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(201).json({
        userDetails: {
          id: user._id,
          token,
        },
      });
    } else {
      return res
        .status(401)
        .send(
          "There was a problem logging in. Check your email and password or create an account."
        );
    }
  } catch (err) {
    return res.status(500).send("Somthing went wrong");
  }
};

module.exports = postLogin;
