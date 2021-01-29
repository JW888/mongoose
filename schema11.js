const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars3'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({
    brand:{type:String,requried:true,default:'Default Brand'},
    model:{type:String},
    year:{type:Number}
},{})

schema.methods.instanceMtd = function(){
    if(this.year === new Date().getFullYear()){
        console.log('New Car!')
    }else{
        console.log('NOT New Car!')
    }
}

schema.statics.staitcMtd = function(){
    this.find({},(err,res)=>{
        if(err) throw err
        console.log(res)
    })
}

//schema.query

let Car = mongoose.model('Car',schema)

let doc = new Car({brand:'Honda',model:'Civic',year:2019})

Car.staitcMtd()