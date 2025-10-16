const express = require("express");

const app = express();

const { adminAuth } = require("./middleware/auth")

// app.use("/admin", adminAuth)

app.get("/admin/getData", adminAuth, (req, res) => {
    res.send("Get user data")
})

app.get("/admin/allUserData", adminAuth, (req, res) => {
    res.send("Get all user data")
})

app.get("/user", (req, res, next) => {
  console.log("Handling the route user");
  // res.send("Respons !")
  next();
});

app.get("/user", (req, res, next) => {
  console.log("Handling the route user 2");
  res.send("Respons 2 !")
//   next();
});

app.listen(7777, () => {
  console.log("Server is Successfully running..... ");
});
