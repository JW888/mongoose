const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'validate'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({ 
    brand:{type:String,required:true},
    model:{type:String},
    year:{
        type:Number,
        max:[new Date().getFullYear(),'Path `{PATH}` value ({VALUE}) cannot be bigger than {MAX}'],
        min:[new Date().getFullYear()-100,'Path `{PATH}` value ({VALUE}) cannot be smaller than {MIN}']
    }
})

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'Lexus', model:'ES200', year:2010
})

let result = doc.validateSync()
if(result){
    console.log(result.errors.year.properties)
}else{
    console.log('validation passed')
}