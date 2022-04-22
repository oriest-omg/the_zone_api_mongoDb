const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
const PORT =3000
mongoose.Promise = global.Promise;

server.use(bodyParser.json());
server.use(cors());
routes(server);


server.listen(PORT,()=>{
    console.log("Ecoute sur le port "+PORT)

    mongoose.connect('mongodb://localhost/the_zone')
    
    mongoose.connection
    .once('open',()=>console.log('Connexion est établie'))
    .on('error',(error)=>{
        console.warn('Erreur durant la connexion',error)
    })
})
