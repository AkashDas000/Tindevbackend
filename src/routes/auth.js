const express = require("express")
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    //Validate of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password, age  } = req.body;
    //Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //Creating a new Instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      photoURL,
      password: passwordHash,
    });

    await user.save(); // this will give a promise that's why we use await
    res.send("User added Successfully...");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Email");
    }


    const passwordValid = await user.validatePassword(password);
    if (passwordValid) {
      //Create JWT Token
      const token = await user.getJWT()

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.send("Logout Successfully....")
})

module.exports = authRouter;    
