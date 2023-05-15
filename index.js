import express from "express";
import axios from "axios";
import cron from 'node-cron'

const app = express();
const port = 9000;
const url = "https://gift-repo-eurawdqtt-daniellotorres.vercel.app/razoes";
var id = 0;
let usedIds = [];
let data = ''
let a = ''

// const geraHora = () => {
//   geraId();
//   const minutes = Math.floor(Math.random() * 60);
//   a = `${minutes} * * * * * *`
//   return a;
// };

const geraId = () => {
  id = Math.floor(Math.random() * 5);
  id === 0 ? id++ : id
  while (!usedIds.indexOf(id)) {
    id = Math.floor(Math.random() * 5);
    id === 0 ? id++ : id
  }
  usedIds.push(id);
};

const buscaDados = async() => {
    await axios({
        method: "get",
        url: url+'/'+id,
      }).then(function (response) {
        console.log(response.data)
        return response.data
      });
}

app.use("/", (req, res) => {
  geraId()
  let a = buscaDados()
  res.json({
    message: "Hello world",
    randomTime: a,
    data: a
  });
});

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});
