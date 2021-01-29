const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{
    console.log('connected to '+mongoose.connection.name)
    console.log(mongoose.connections.length)
})
.catch((err)=>{
    console.log('cannot connect to '+mongoose.connection.name)
})

let schema = mongoose.Schema({
    brand:String,model:String,year:Number
},{})

let Car = mongoose.connection.model('Car',schema)
let Driver_constructor = mongoose.connection.model('Driver',{name:String})

console.log(mongoose.connection.modelNames())
console.log(mongoose.connection.models.Driver === Driver_constructor)

let doc = new Car({brand:'Lexus',model:'LFA',year:2019})

Car.find({},(err,resolve)=>{
    if(err) throw err
    console.log(resolve)
})