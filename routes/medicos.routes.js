/* 
    Hospitales 
    '/api/medicos'
*/
 
const { Router } = require('express');
const { check } =require('express-validator');

const { validarCampos } =require ('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-JWT');

const {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}=require('../controllers/medicos.controllers');

const router =Router();

router.get(
    '/',    
    getMedico
);

router.post(
    '/', 
    [        
      validarJWT,
      check('nombre','El nombre del médico es necesario').not().isEmpty(),
      check('hospital','El hospital id debe ser válido').isMongoId(),
      validarCampos
    ],
    crearMedico
);

router.put(
    '/:id',
    [   
        
    ],
    actualizarMedico,

);

router.delete(
    '/:id',    
    borrarMedico

);

module.exports=router;