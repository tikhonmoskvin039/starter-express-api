const express = require("express");
const router = express.Router();

const {
  signIn,
  logOut,
  checkUserAuth,
} = require("../controllers/authController");

router.post("/signin", signIn);
router.get("/", logOut);
router.get("/isAuth", checkUserAuth);

module.exports = router;
