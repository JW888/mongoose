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
    year:Number,
    location:String
},{})

let Car = mongoose.model('Car',schema)

Car.updateMany({brand:'Honda'},{$set:{location:'Newcastle'}},(err,res)=>{
    if(err) throw err
    console.log(res)
})