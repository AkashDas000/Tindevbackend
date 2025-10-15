const express = require("express")

const app = express()


app.get("/", (req, res) => {
    res.send("Namste AKash")
})

app.get("/user/:userId", (req, res) => {
    console.log(req.params)
    res.send({firstName: "Akash", lastName: "Das"})
})

app.get("/abc", (req, res) => {
    res.send({firstName: "Akash", lastName: "Das"})
})

app.post("/user", (req, res) => {
    res.send("Data successfully saved in the database")
})

// app.get("/hello", (req, res) => {
//     res.send("Hello hello hola")
// })

app.listen(7777, ()=>{
    console.log("Server is Successfully running..... ")
})
