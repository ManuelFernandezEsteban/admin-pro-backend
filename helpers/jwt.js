const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{

    return new Promise((resolve,reject)=>{
        const paylod= {uid};
        jwt.sign(paylod,process.env.JWT_SECRET,{expiresIn:'12h'},(err,token)=>{
            if (err){
            console.log(err);
            reject(err);
            }else{
                resolve(token)
            }
        });
    })
    
}

module.exports={generarJWT}