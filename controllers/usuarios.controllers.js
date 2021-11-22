const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(request,response)=>{


    const usuarios = await Usuario.find({},'nombre email role google');

    response.json({
        ok:true,       
        usuarios
    })
};

const crearUsuario = async (request,resp=response)=>{

    const {email,password} = request.body;
    
    try {

        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return resp.status(400).json({
                ok:false,
                msg:'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(request.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);
        //guardar usuario
        await usuario.save();        
        //generar JWT
        const token = await generarJWT(usuario.id);        
        
        resp.json({
            ok:true,            
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg:'Error inesperado...revisar logs'
        })
    }

    
};

const actualizarUsuario= async(req,res=response)=>{

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }
        //validar Token 

        //Actualizar usuario

        const {password,google, email, ...campos} = req.body;
        if(usuarioDB.email!==email){
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'El correo ya está registrado'
                });
            }
        }
        campos.email=email;
        const usarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok:true,
            usuario:usarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado ... revisar logs'
        })
        
    }
}
const borarUsuario = async(req,res=response)=>{
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }
        //eliminar usuario
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado ... revisar logs'
        })
        
    }
}

module.exports={getUsuarios,crearUsuario,actualizarUsuario,borarUsuario}