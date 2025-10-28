const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData, validatePassword } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");



const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile is updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try{
    validatePassword(req);

    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user.id)

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch) res.status(400).send("Old password is incorrect")

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.send("Password update Successfully..")
    
  }catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = profileRouter;
