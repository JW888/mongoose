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
    year:{
        type:Number,
        validate:{
          validator:function(v){
            let maxYear = new Date().getFullYear()
            let minYear = maxYear-100
            if(v>maxYear || v<minYear) return false
          },
          message:function(prop){
            return prop.path+' value ('+prop.value+") is illegal."
          }
        }
    }
})

schema.pre('save',function(next){
    console.log('pre save')
    next()
})

schema.pre('validate',function(next){
    console.log('pre validate')
    next()
})

schema.post('save',function(param,next){
    console.log('post save')
    next()
})

schema.post('validate',function(param,next){
    console.log('post validate')
    next()
})

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'Lexus', model:'ES200', year:2050
})

doc.save(function(err,res){
    if(err){
        console.log('err msg from save: '+err.message)
    }else{
        console.log(res)
    }
})

