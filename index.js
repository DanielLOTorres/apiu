import express  from "express";
const cron = require('node-cron');

const app = express()
const port = 9000
const url = "https://gift-repo-eurawdqtt-daniellotorres.vercel.app/razoes"

const randomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${minutes} ${hours} * * *`;
  };


app.use("/", (req, res) => {
    res.json({message : "Hello world",
'randomTime': {randomTime}})
})

app.listen(9000, () =>{
    console.log(`Server is running on port ${port}`)
} )

