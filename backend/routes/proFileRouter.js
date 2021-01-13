const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/profile", auth, async (req, res) => {
  try {
      let {des} = req.body
    if (req.user) {
        console.log(req,"ÿo")
      const user = await User.findOneAndUpdate({_id:req.user}, {skills:["Hello",des],about:"Wassup boi"});
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
