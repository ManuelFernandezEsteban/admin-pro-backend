/*
Ruta: /api/usuarios

*/ 
const { Router } = require('express');
const { check } =require('express-validator');
const { getUsuarios, crearUsuario,actualizarUsuario,borarUsuario } = require('../controllers/usuarios.controllers');
const { validarCampos } =require ('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-JWT');


const router =Router();

router.get(
    '/',
    validarJWT,
    getUsuarios
);

router.post(
    '/', 
    [        
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put(
    '/:id',
    [   
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),        
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete(
    '/:id',
    validarJWT,
    borarUsuario
);

module.exports=router;