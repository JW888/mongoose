const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars5'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String, model:String, year:Number
})

schema.pre('find',function(next){
    console.log('pre find')
    this.getQuery().brand='Nissan'
    next()

})

schema.post('find',function(param,next){
    console.log('post find')
    //console.log(this==param)

})

let Car = mongoose.model('Car',schema)

Car.findOne({brand:'Toyota'},{_id:0}).exec((err,res)=>{
    if(err){
        console.log('cannot retreive documents.')
    }else{
        console.log('Documents retrieved: '+res)
    }
})