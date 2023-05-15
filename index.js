import express  from "express";

const app = express()
const port = 9000

app.use("/", (req, res) => {
    res.json({message : "Hello world"})
})

app.listen(9000, () =>{
    console.log(`Server is running on port ${port}`)
} )

