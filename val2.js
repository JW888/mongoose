const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'validate'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({ 
    brand:{type:String,required:true},
    model:{type:String},
    year:{type:Number,max:[2020,'illegal year value'],min:1920}
})

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'Lexus', model:'ES200', year:2050
})

// doc.validate((err)=>{
//     console.log(err)
// })

let result = doc.validateSync()
console.log(result.errors.year.message)