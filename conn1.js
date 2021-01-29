const mongoose = require('mongoose')

let conn_test = mongoose.createConnection('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'test'
})
conn_test
.then((fulfill)=>{
    console.log('connected to '+fulfill.name)
    //console.log(mongoose.connections)
})
.catch((err)=>{
    console.log('cannot connect to '+conn_test.name)
})

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{
    console.log('connected to '+mongoose.connection.name)
    //console.log(mongoose.connections)
})
.catch((err)=>{
    console.log('cannot connect to '+mongoose.connection.name)
})

let schema = mongoose.Schema({
    brand:String,model:String,year:Number
},{})

let Car = conn_test.model('Car',schema)

let doc = new Car({brand:'Lexus',model:'LFA',year:2019})

Car.find({},(err,resolve)=>{
    if(err) throw err
    console.log(resolve)
})