const {Schema, model}=require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:false        
    },
    role:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    }
});

UsuarioSchema.method('toJSON',function() {
    const {__V,_id,password,...obj} = this.toObject();
    obj.uid=_id;
    return obj;
})

module.exports=model('Usuario',UsuarioSchema);