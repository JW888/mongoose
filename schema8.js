const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars3'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({
    //_id:Number,
    brand:String,
    model:String,
    year:{type:Number,index:true}
},{
    autoCreate:true,
    autoIndex:false,
    _id:true,
    id:false
})

let Car = mongoose.model('Car',schema)

let doc = new Car({brand:'Nissan',model:'GT-R',year:2010})
console.log(doc.id)

doc.save((err,res)=>{
    if(err) throw err
    console.log(res)
})