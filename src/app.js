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

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try{
    const user = await User.find({emailId: userEmail})
    if(user.length == 0){
      res.send("User not found")
    }else{
      res.send(user)
    }
  }catch(err){
    res.status(404).send("Something wend wrong")
  }
})

app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({})
    res.send(users)
  }catch(err){
    res.status(404).send("Something wend wrong")
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId

  try{
    const user = await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  }catch(err){
    res.status(404).send("Something wend wrong")
  }
})

app.patch("/user", async (req, res) => {
  const id = req.body.id
  const data = req.body
  console.log(data)
  try{
    await User.findByIdAndUpdate({_id: id}, data)
    res.send("User update successfully!")
  }catch(err){
    res.status(404).send("Something wend wrong")
  } 
})

// app.get("/findId", async (req, res) => {
//   try{
//     const user = await User.findById('68f2873bf3875e5627498e5d')
//     res.send(user)
//   }catch(err){
//     req.status(404).send("Something wend wrong")
//   }
// })

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
