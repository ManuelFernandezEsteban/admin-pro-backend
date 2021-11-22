const express = require('express');
const cors = require('cors')
require('dotenv').config();

const {dbConexion} = require('./database/config');

const app = express();
//configurar cors
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//base de datos
dbConexion();


//rutas

app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));
/*

*/

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto ',process.env.PORT);
})