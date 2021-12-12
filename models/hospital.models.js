const {Schema, model}=require('mongoose');


const HospitalSchema = Schema({
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
    }
},{collection:'hospitales'});

HospitalSchema.method('toJSON',function() {
    const {__V,...obj} = this.toObject();    
    return obj;
})

module.exports=model('Hospital',HospitalSchema);