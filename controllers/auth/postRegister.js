const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { firstname, lastname, mail, password, role } = req.body;
    const userExist = await User.exists({ mail: mail.toLowerCase() });

    if (userExist) {
      return res.status(409).send("Email already used.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    console.log(user);
    const token = jwt.sign(
      {
        useId: user._id,
        mail: mail.toLowerCase(),
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        id: user._id,
        token,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};

module.exports = postRegister;
