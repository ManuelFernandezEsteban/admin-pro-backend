const {response} = require('express');
const Usuario = require('../models/usuario.models');
const bcrypt =require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req,res=response)=>{

    const {email,password}=req.body;

    try {

        //verificar email
        const usuario = await Usuario.findOne({email});

        if(!usuario){
            res.status(404).json({
                ok:false,
                msg:'Email o contraseña no válidas'
            })
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            res.status(400).json({
                ok:false,
                msg:'Email o contraseña no válidas'
            })
        }        

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, hable con el administrador'
        })
    }
}

const googleSignIn = async (req,res=response)=>{

    const googleToken=req.body.token;

    try {

        const{name,email,picture} =await googleVerify(googleToken);
        //verificar si existe email
        let usuario;
        const usuarioDB = await Usuario.findOne({email});
        
        if ( !usuarioDB ){
            
            usuario=new Usuario({
                nombre:name,
                email:email,
                password:'@@@',
                img:picture,
                google:true
            });
        }else{
            //existe usuario
            
            usuario=usuarioDB;
            usuario.google=true;
        }
        //Guardar en BD
      
        await usuario.save();
        
        const token = await generarJWT(usuario.id);
        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Error en el token'
        })
    }

    

}

module.exports = {login,googleSignIn}