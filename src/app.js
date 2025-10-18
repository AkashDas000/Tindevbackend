const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new Instance of the User model
  const user = new User(req.body);

  try{
  await user.save(); // this will give a promise that's why we use await
  res.send("User added Successfully...");
  }catch(err){
  res.status(400).send("Error saving the user :" + err.message)
  }
});

connectDB()
  .then(() => {
    console.log("Database connect is successfully");
    // console.log("About to start server..."); // ✅ ADD THIS

    app.listen(7777, () => {
      console.log("Server is Successfully running..... ");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
