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
    console.log('validate year')
    console.log(this.getUpdate())
    console.log(this.getQuery())
})

let Car = mongoose.model('Car',schema)

Car.updateOne({brand:'Lexus'},{$set:{year:2020}},{
    runValidators:true,context:'query'
},(err,res)=>{
    if(err) console.log(err.message)
    console.log(res)
})