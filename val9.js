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
    //return false
    //throw new Error()
    //let obj = {}
    //console.log(obj.prop)
   // obj.mtd()
   //console.log(obj.prop)
   // check THIS: doc or query
})

let Car = mongoose.model('Car',schema)

let doc = new Car({ brand:'Lexus', model:'ES200', year:2020 })

let result = doc.validateSync()
if(result){
    console.log(result.message)
}else{
    console.log('validation passed')
}
// doc.save((err,res)=>{
//     if(err) console.log('CANNOT save doc: '+err.message)
//     console.log(res)
// })

// Car.updateOne({},{$set:{year:2020}},{
//     runValidators:true
// },(err,res)=>{
//     if(err) console.log(err.message)
//     console.log(res)
// })