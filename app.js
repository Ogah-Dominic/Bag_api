const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: "./Config/config.env"})
const route = require('./Router/bagRouter')

const app = express()

app.use(express.json());
app.use('/uploads', express.static("uploads"))
app.use("/api", route)

app.get("/", (req,res)=>{
    res.send("Welcome Message")
});   

module.exports = app;