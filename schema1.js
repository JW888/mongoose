const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({
    brand:{type:String,required:true,default:'Default Brand'},
    model:{type:String,index:'text'},
    year:{type:Number,index:-1}
},{})

let Car = mongoose.model('Car',schema)

//console.log(schema.path('brand')===schema.paths.brand)
//console.log(mongoose.Schema.Types)
// console.log(mongoose.Types.ObjectId())
// console.log(new mongoose.Types.Decimal128(128.128))

// let doc = new Car({})
// console.log(doc)
// doc.save((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })