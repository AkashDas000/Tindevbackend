const express = require("express");

const app = express();

app.get("/userData", (req, res) => {
    // best practice use try and catch
  try {
    throw new Error("anfajfnnma");
    res.send("Get user data");
  } catch(err) {
    res.status(404).send("Error 404! Contact Support Team")
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.send("Somethind went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is Successfully running..... ");
});
