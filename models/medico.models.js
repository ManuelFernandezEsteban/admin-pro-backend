const {Schema, model}=require('mongoose');


const MedicoSchema = Schema({
    nombre:{
        type:String,
        required:true
    },    
    img:{
        type:String,
        required:false        
    },
    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    hospital:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    }
});

MedicoSchema.method('toJSON',function() {
    const {__V,...obj} = this.toObject();    
    return obj;
})

module.exports=model('Medico',MedicoSchema);