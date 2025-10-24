const express = require("express")
const { userAuth } = require("../middleware/auth");


const requestRouter = express.Router()


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //Sending a connection request
    console.log("Sending a connection is request");

    res.send(user.firstName + " sent the connect request!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;