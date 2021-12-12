/*
Ruta: /api/uploads

*/ 
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload,retornaImagen } = require('../controllers/uploads.controllers');

const {validarJWT} = require('../middlewares/validar-JWT');


const router =Router();
router.use(expressFileUpload());
router.put(
    '/:tipo/:id',   
    validarJWT,
    fileUpload
);

router.get(
    '/:tipo/:file',       
    retornaImagen
);

module.exports=router;