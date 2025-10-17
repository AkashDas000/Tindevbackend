const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")


app.post("/signup", async (req, res) => {
  
  //Creating a new Instance of the User model
  const user = new User({
    firstName: "Virat",
    lastName: "Kholi",
    emailId: "virat@gmail.com",
    password: "virat@123",
  })

  await user.save() // this will give a promise that's why we use await
  res.send("User added Successfully...")

})



connectDB()
  .then(() => {
    console.log("Database connect is successfully");
    app.listen(7777, () => {
      console.log("Server is Successfully running..... ");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
