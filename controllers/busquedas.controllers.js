const { response } = require('express');
const Usuario = require('../models/usuario.models');
const Medico = require('../models/medico.models');
const Hospital = require('../models/hospital.models');



const getTodo = async (request, res = response) => {

    const cadena = request.params.busqueda;
    const regex = new RegExp(cadena, 'i');
    /*const usuarios = await Usuario.find({nombre:regex});
    const medicos = await Medico.find({nombre:regex});
    const hospitales = await Hospital.find({nombre:regex});
*/
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])


    res.json({
        ok: true,
        msg: 'getTodo',
        usuarios,
        medicos,
        hospitales
    })
};

const getDocumentosColeccion = async (request, res = response) => {

    const tabla = request.params.tabla;
    const cadena = request.params.busqueda;
    const regex = new RegExp(cadena, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario','nombre img').populate('hospital','nombre img');;
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario','nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla no existe'
            });

    }
    res.json({
        ok:true,
        resultado:data
    })

    
};

module.exports = { getTodo, getDocumentosColeccion }