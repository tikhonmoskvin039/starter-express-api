const { User } = require("../db/models");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signIn = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        login,
      },
    });
    if (!user) {
   return res.status(400).json({ message: "Invalid password or username" });
    }
    const isAuth = await bcrypt.compare(password, user.password);

    if (!user || !isAuth) {
      return res.status(400).json({ message: "Invalid password or username" });
    } else if (user && !isAuth) {
      return res.status(400).json({ message: "Invalid password" });
    } else if (!user && isAuth) {
      return res.status(400).json({ message: "Invalid username" });
    } else {
      req.session.user = {
        id: user.id,
        login: user.login,
      };
      req.session.save(() => {
        const { user } = req.session;
        const { login } = user;
        return res.json({ login });
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.checkUserAuth = async (req, res) => {
  if (req.session.user) {
    const user = await User.findOne(
      { where: { id: req.session.user.id } },
      { raw: true }
    );
    console.log("\x1b[36m%s\x1b[0m", "req.session.user :", req.session?.user);
    res.json({ user });
  } else {
    res.json({ name: "", isFailed: true });
  }
};

exports.logOut = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("sid");
      res.json({ login: "", isFailed: "" });
    });
  } catch (error) {
    console.log("error", error);
  }
};
