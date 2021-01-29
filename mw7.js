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
    //next()
    //throw new Error('err msg in pre save hook')
    //return Promise.reject('rejected promise in pre save hook')
    Car.find({brand:this.brand}).exec(function(err,res){
        if(err) throw err
        if(res.length==0){
            next()
        }else{
            next('brand already exists...')
        }
    })
})

schema.post('save',function(param,next){
    console.log('post save')
    next()
})

let Car = mongoose.model('Car',schema)

let doc = new Car({
    brand:'Nissanss', model:'GT-R', year:2020
})

doc.save(function(err,res){
    if(err){
        console.log('err msg from save: '+err)
    }else{
        console.log('saved doc: '+res)
    }
})

