const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/profile", auth, async (req, res) => {
  try {
      let {Name,Email,About,Skills} = req.body
      if(!Name || !Email || !About || !Skills)
      {
        return res.status(400).json({msg:'Empty Field'})
      }
      if(User.findOne({email:Email})){
        return res.status(400).json({msg:"This email is already taken"})
      }
    if (req.user) {
      const user = await User.findOneAndUpdate({_id:req.user}, {displayName:Name,email:Email,skills:[Skills],about:About});
      return res.json({ user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
