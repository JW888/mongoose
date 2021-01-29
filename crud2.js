const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars4'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number
},{})

let Car = mongoose.model('Car',schema)

// Car.find({brand:'Honda'},{_id:0,__v:0},(err,res)=>{
//     if(err) throw err
//     console.log(res)
// })

Car.find({brand:'Honda'},"brand model",(err,res)=>{
    if(err) throw err
    console.log(res)
})