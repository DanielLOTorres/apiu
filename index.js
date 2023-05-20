import express from "express";
import axios from "axios";
import cors from 'cors'

const rts = cors
const app = express();
const port = 9000;
const url = "https://gift-repo.vercel.app/noticias";
var id = 0;
let usedIds = [];
let data = {}

const geraId = () => { 
  if(usedIds.length < 6){
    id = Math.floor(Math.random() * 6); 
    id === 0 ? id++ : id
    while (usedIds.indexOf(id) !== -1) {
      id = Math.floor(Math.random() * 7);
      id === 0 ? id++ : id
    }
    usedIds.push(id);
    return id
  }else{
    usedIds = []
    id = Math.floor(Math.random() * 6); 
    id === 0 ? id++ : id
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
    Ordem: dadoBruto.id,
    Noticia: dadoBruto.texto
  };
}

async function alteraNoticia() {
  let dadoBruto = await buscaDados(geraId())
  data = montaMensagem(dadoBruto)
}

// setInterval(alteranoticia,  24 * 60 * 60 * 1000);



setInterval(alteraNoticia, 3 * 60 * 1000);


app.use(rts())

app.get("/", async (req, res) => {
  res.send(data)
});

app.post('/reset', (req, res) => {
  usedIds = []
  res.json({message: 'Indice resetado'})
})

app.post('/change', (req, res) =>{
  alteraNoticia()
  res.json({message: 'Indice trocado'})
})

app.listen(9000, () => {
  console.log(`Server is running on port ${port}`);
});
