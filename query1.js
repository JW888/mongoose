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

let Car = mongoose.model('Car',schema)

// console.log(Car.find().exec())
// console.log(Car.updateMany().exec())

Car
//.find()
.where()
.where('brand')
.in(['Toyota','Lexus'])
.select('-_id -__v')
.sort({year:1})
.count()
.find()
.exec((err,res)=>{
    console.log(res)
})