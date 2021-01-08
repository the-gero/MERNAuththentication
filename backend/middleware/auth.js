const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) res.status(401).json({ msg: "No auth token found" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      res
        .status(401)
        .json({ msg: "Token verification failed, authorization Denied." });
    console.log(verified);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
};

module.exports = auth;
