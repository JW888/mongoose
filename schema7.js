const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars3'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({
    brand:String,
    model:String,
    year:{type:Number,index:true}
},{
    autoCreate:true,
    autoIndex:true
})

schema.index({brand:1,model:-1,year:1})

let Car = mongoose.model('Car',schema)

let doc = new Car({brand:'Nissan',model:'GT-R',year:2010})
console.log(doc)
console.log(schema.indexes())
// doc.save((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })