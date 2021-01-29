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

Car.findOne({brand:'Honda'},(err,doc)=>{
    if(err) throw err
    doc.model = 'New Pilot'
    doc.save((err,res)=>{
        if(err) throw err
        console.log(res)
    })
})