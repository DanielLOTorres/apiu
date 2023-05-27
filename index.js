import express from "express";
import axios from "axios";
import cors from 'cors'
import nodemailer from 'nodemailer'

const mailer = nodemailer
const rts = cors
const app = express();
const port = 9000;
const url = "https://gift-repo.vercel.app/noticias";
var id = 0;
let usedIds = [];
let data = {}

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'daniellourenco30@gmail.com',
    pass: 'oiftuudupxtudvxo'
  }
});

const mailOptions = {
  from: 'daniellourenco30@gmail.com',
  to: 'laizzaly@gmail.com',
  subject: 'Beloved.',
  text: 'Venha descobrir mais um motivo pelo qual te amo, mozinho!    https://beloved-beta.vercel.app/'
};

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
app.disable('etag');

app.get("/", async (req, res) => {
  res.send(data)
});

app.post('/email', (req, res) =>{
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  
  res.send('Enviado')

})

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
