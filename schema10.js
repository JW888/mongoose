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
    year:{type:Number,alias:'Y'}
},{
    id:false
})

schema.virtual('full_name')
.get(function(){
    return this.brand+" "+this.model
})
.set(function(v){
    this.brand = v.substr(0,v.indexOf(' '))
    this.model = v.substr(v.indexOf(' ')+1)
})

let Car = mongoose.model('Car',schema)

let doc = new Car({brand:'Honda',model:'Civic',year:2010})
console.log(doc)
doc.full_name = 'Nissan GT-R'
console.log(doc.Y=== doc.year)

// doc.save((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })