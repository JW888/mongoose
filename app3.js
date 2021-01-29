const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected!')})
.catch((err)=>{console.log('cannot connect');console.log(err)})

let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number
},{})

let Car = mongoose.connections[0].model('Car',schema)

let doc = new Car({brand:'Lexus',model:'LFA',year:2019})
// doc.save((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })
Car.find({},(err,resolve)=>{
    if(err) throw err
    console.log(resolve)
})