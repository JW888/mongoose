const mongoose = require('mongoose')
mongoose.set('bufferCommands',false)
let conn = mongoose.connect('mongodb://localhost:27000/test',{useNewUrlParser: true,useUnifiedTopology: true})
conn.then((fulfill)=>{console.log(fulfill==mongoose)})
let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number
},{})

let Car = mongoose.model('Car',schema)
console.log(Car)
//let doc = new Car({brand:'Toyota',model:'Supra',year:"two thousand and ten"})

//console.log(doc)

// doc.save((err,resolve)=>{
//     if(err) throw err
//     console.log('new doc. inserted!')
//     console.log(resolve)
// })
Car.find({},(err,resolve)=>{
    console.log(err)
    console.log(resolve)
})