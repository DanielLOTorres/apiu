import express from "express";
import axios from "axios";

const app = express();
const port = 9000;
const url = "https://gift-repo-eurawdqtt-daniellotorres.vercel.app/razoes";
var id = 0;
let usedIds = [];
let data = {}

const geraId = () => {
  // id = Math.floor(Math.random() * 5);
  // id === 0 ? id++ : id
  // while (!usedIds.indexOf(id)) {
  //   id = Math.floor(Math.random() * 5);
  //   id === 0 ? id++ : id
  // }
  // usedIds.push(id);
  id < 12 ? id++ : id
  return id
};

const buscaDados = async() => {
    let retorno = {}
    await axios({
        method: "get",
        url: url+'/'+id,
      }).then(function (response) {
        retorno = response.data
      });
    return retorno
}

const montaMensagem = (dadoBruto) =>{
  return {
    id: dadoBruto.id,
    texto: dadoBruto.texto
  };
}

async function alteraRazao() {
  geraId()
  data = montaMensagem(await buscaDados())
}

setInterval(alteraRazao, 1 * 3 * 1000);


app.use("/", async (req, res) => {
  res.send(data)
});

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});
