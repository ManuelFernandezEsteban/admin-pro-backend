const {response}=require('express')

const Hospital = require('../models/hospital.models');

const getHospitales = async (req,res=response)=>{

    const hospitales = await Hospital.find().
                                        populate('usuario','nombre img');


    res.json({
        ok:true,
        hospitales:hospitales
    });
}

const crearHospital = async(req,res=response)=>{

    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
    
    try {


        const hospitalDB = await hospital.save();


       res.json({
        ok:true,
        hospital:hospitalDB
    }) 
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
     

    
}
const actualizarHospital = async (req,res=response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB){
           return res.status(404).json({
                ok:false,
                msg:'Error en la actualización del hospital'
           }) 
        }
        const cambioHospital = {
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambioHospital,{new:true})

        res.json({
        ok:true,
        hospital:hospitalActualizado
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error hable con el administrador'
        })
    }

    
}
const borrarHospital = async (req,res=response)=>{

    
    const id = req.params.id;    

    try {

        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB){
           return res.status(404).json({
                ok:false,
                msg:'Error en la eliminación del hospital'
           }) 
        }
       

        await Hospital.findByIdAndDelete(id)

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
    getHospitales,
    borrarHospital,
    actualizarHospital,
    crearHospital
}