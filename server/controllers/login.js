const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json({ message: "wrong username or password" });

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json({ message: "wrong username or password" });

    // send res
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = login;
