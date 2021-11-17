const express = require('express');
const cors = require('cors')
require('dotenv').config();

const {dbConexion} = require('./database/config');

const app = express();
//configurar cors
app.use(cors());

//base de datos
dbConexion();


//rutas

app.get('/',(request,response)=>{
    response.json({
        ok:true,
        msg:'Hola mundo'
    })
});


app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto ',process.env.PORT);
})