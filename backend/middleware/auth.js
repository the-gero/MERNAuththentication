const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) res.status(401).json({ msg: "No auth token found" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!verified)
      res
        .status(401)
        .json({ msg: "Token verification failed, authorization Denied." });
    req.user = verified.id;
    req.userDetails = user;
    next();
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

module.exports = auth;
