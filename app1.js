const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/test',{useNewUrlParser: true,useUnifiedTopology: true})

let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number
},{})

let Car = mongoose.model('Car',schema)

//let doc = new Car({brand:'Toyota',model:'Supra',year:"two thousand and ten"})

//console.log(doc)

// doc.save((err,resolve)=>{
//     if(err) throw err
//     console.log('new doc. inserted!')
//     console.log(resolve)
// })
Car.find({},(err,resolve)=>{
    console.log(resolve)
})