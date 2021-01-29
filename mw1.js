const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'mw1'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String, model:String, year:Number
})

schema.pre('save',function(next){
    console.log('pre save')
    this.brand = this.brand.toUpperCase()
    next()
})

// schema.pre('save',function(n){
//     console.log('pre save TWO')
//     n()
// })

schema.post('save',function(param,next){
    console.log('post save')
    console.log(param== this)
    next()
})

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'mazda',model:'MX5',year:2011
})

doc.save((err,res)=>{
    if(err){
        console.log('something is wrong, cannot save doc.')
    }else{
        console.log('new doc. saved!')
    }
})
