const express = require("express")
require("dotenv").config()

// express app
const app = express()

const port = process.env.PORT || 5000

// routes
app.get("/",(req,res)=>{
  res.status(200).json({message:"hello express js"})
})

app.listen(port,()=>{
  console.log(`app listing on port ${port}`);
})