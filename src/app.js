const express = require("express")

const app = express()


app.get("/", (req, res) => {
    res.send("Namste AKash")
})

app.get("/hello", (req, res) => {
    res.send("Hello hello hola")
})

app.listen(7777, ()=>{
    console.log("Server is Successfully running..... ")
})
