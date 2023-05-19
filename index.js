import express from "express";
import axios from "axios";
import cors from 'cors'

const rts = cors
const app = express();
const port = 9000;
const url = "https://gift-repo-eurawdqtt-daniellotorres.vercel.app/razoes";
var id = 0;
let usedIds = [];
let data = {}

const geraId = () => { 
  if(usedIds.length < 12){
    id = Math.floor(Math.random() * 12); 
    id === 0 ? id++ : id
    while (usedIds.indexOf(id) !== -1) {
      id = Math.floor(Math.random() * 12);
      id === 0 ? id++ : id
    }
    usedIds.push(id);
    return id
  }
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
    Num: dadoBruto.id,
    Reason: dadoBruto.texto
  };
}

async function alteraRazao() {
  geraId()
  data = montaMensagem(await buscaDados())
  console.log(data)
}

setInterval(alteraRazao, 60 * 1000);


app.use(rts())

app.get("/", async (req, res) => {
  res.send(data)
});

app.post('/reset', (req, res) => {
  id=0
  res.json({message: 'Indice resetado'})
})

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});
