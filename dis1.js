const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'dis'
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
},{discriminatorKey:'expanded_constructor'})

let expanded_schema = new mongoose.Schema({
    owner:String
})

schema.pre('save',function(n){
    console.log('schema pre save')
    n()
})

expanded_schema.pre('save',function(n){
    console.log('expanded schema pre save')
    n()
})

const Car = mongoose.model('Car',schema)

const Car_Owner = Car.discriminator('Car_Owner', expanded_schema)

new Car({brand:'Toyota',model:'Supra',year:2010,owner:'me'})
.save(function(err,res){
    if(err) throw err
    console.log(res)
})

