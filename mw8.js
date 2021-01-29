const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'mw3'
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

schema.pre('updateOne',
    //{query:false,document:true},
function(next){
    console.log('pre updateOne')
    console.log(this) // doc or query
    this.getUpdate().$set.brand = 'Nissan'
    next()
})

let Car = mongoose.model('Car',schema)


// Car.updateOne({},{$set:{model:'Patrol'}},function(err,res){
//     if(err) throw err
//     console.log(res)
// })

Car.findOne({},function(err,doc){
    if(err) throw err
    doc.updateOne({$set:{brand:'Datsun'}}).exec(function(err,res){
        if(err) throw err
        console.log(res)
    })
})