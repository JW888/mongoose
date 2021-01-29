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
    year:{type:Number}
})

schema.path('year').validate(function(v){
    // async validator
    //return Promise.reject('reject reason')
    return Promise.resolve(false)
},'custom validator error message')

let Car = mongoose.model('Car',schema)

let doc = new Car({ brand:'Lexus', model:'ES200', year:2020 })

doc.validate()
.catch((err)=>{
    console.log(err)
    console.log(err.message)
    console.log(err.errors.year.reason)
})