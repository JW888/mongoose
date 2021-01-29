const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'mw2'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String, model:String, year:Number
})

schema.pre('insertMany',function(next){
    console.log('pre insertMany')
    //console.log(this)
    next()
})

schema.post('insertMany',function(param,next){
    console.log('post insertMany')
    let results = await this.find()
    console.log(results)
    next()
})

let Car = mongoose.model('Car',schema)

Car
.insertMany([
    {brand:'Toyota',model:'Camry',year:2019},
    {brand:'Nissan',model:'GT-R',year:2018},
    {brand:'Honda',model:'Civic',year:2017}
],
(err,res)=>{
    if(err){
        console.log('insertMany has failed.')
    }else{
        console.log('insertMany has succeeded.')
    }
})


