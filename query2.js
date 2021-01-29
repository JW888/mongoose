const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars5'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number,
    location:String
},{})

schema.query.sortByYear = function(){
   return this.sort({year:1}).select('-_id -__v').exec((err,res)=>{
    if(err) throw err
    console.log(res)
})
}

let Car = mongoose.model('Car',schema)

console.log(Car.where().sortByYear().where())