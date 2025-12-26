const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoURL gender age skills about";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("formUserId", USER_SAFE_DATA);

    res.json({ message: "Data fetch Successfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { formUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("formUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.formUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.formUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //Find all the connections request (sent + received)
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ formUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("formUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.formUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        {_id: {$nin: Array.from(hideUserFromFeed)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    res.send(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
