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
    year:{type:Number}
})

schema.path('year').validate(function(v){
    let maxYear = new Date().getFullYear()
    let minYear = maxYear-100
    if(v>maxYear || v<minYear) return false
},function(prop){
    return prop.path+' value ('+prop.value+") is illegal."
}) //"{PATH} value ({VALUE}) is illegal."

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'Lexus', 
    model:'ES200', year:2050
})

let result = doc.validateSync()
if(result){
    console.log(result.message)
}else{
    console.log('validation passed')
}

doc.save({validateBeforeSave:false},(err,res)=>{
    if(err) console.log('CANNOT save doc: '+err.message)
    console.log(res)
})

