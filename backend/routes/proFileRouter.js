const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/profile", auth, async (req, res) => {
  try {
    let { Name, Email, About, Skills } = req.body;
    if (!Name || !Email || !About || !Skills) {
      return res.status(400).json({ msg: "Empty Field" });
    }
    let fetchedUser = User.findOne({ email: Email });
    console.log(fetchedUser);
    if (fetchedUser._id != req.user._id) {
      return res.status(400).json({ msg: "This email is already taken" });
    }
    if (req.user) {
      const user = await User.findOneAndUpdate(
        { _id: req.user },
        { displayName: Name, skills: Skills, about: About }
      );
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});
router.get("/profile", auth, async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user);
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
