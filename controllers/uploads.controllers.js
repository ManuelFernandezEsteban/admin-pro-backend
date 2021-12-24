const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'La tabla no es correcta'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión premitida'
        });
    }
    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // actualizar base de datos

        actualizarImagen(tipo,id,nombreArchivo);
        res.json({
            ok: true,
            msg:'Archivo subido',
            nombreArchivo
        })

    });

}


const retornaImagen = (req,res=response)=>{
    const tipo = req.params.tipo;
    const file = req.params.file;

    const pathImage=path.join(__dirname,`../uploads/${tipo}/${file}`);

    //imagen por defecto
    if (fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else{
        const pathImage=path.join(__dirname,`../uploads/no-image.jpg`);
        res.sendFile(pathImage);
    }

    
}

module.exports = {
    fileUpload,
    retornaImagen
}