const {response}=require('express')
const Medico = require('../models/medico.models');

const getMedico = async (req,res=response)=>{

    const medicos = await Medico.find().
                                    populate('usuario','nombre img').
                                    populate('hospital','nombre img');
    res.json({
        ok:true,
        medicos:medicos
    })
}

const crearMedico =async(req,res=response)=>{

    const uid = req.uid;
    const hospital = req.hospital;
    const medico = new Medico({
        usuario:uid,
        hospital:hospital,
        ...req.body
    });
    try {

        const medicoDB = await medico.save();


        res.json({
        ok:true,
        medico:medicoDB
    })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    
}
const actualizarMedico = async (req,res=response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        if (!medico){
            return res.status(404).json({
                ok:false,
                msg:'Error el médico no existe'
            });
        }
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB){
           return res.status(404).json({
                ok:false,
                msg:'Error el hospital no existe'
           }) 
        }

        const cambioMedico = {
            ...req.body,
            usuario:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambioMedico,{new:true})

        res.json({
            ok:true,
            medico:medicoActualizado
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    
}
const borrarMedico = async (req,res=response)=>{

    
    const id = req.params.id;    

    try {

        const medico = await Medico.findById(id);
        if (!medico){
           return res.status(404).json({
                ok:false,
                msg:'Error el médico no existe'
           }) 
        }       

        await Medico.findByIdAndDelete(id)

        res.json({
        ok:true,
        id
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error hable con el administrador'
        })
    }
}
module.exports={
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}