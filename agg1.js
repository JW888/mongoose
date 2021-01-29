const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'agg'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = new mongoose.Schema({
   name:String,
   sales:Number,
   month:Number
},{})

let Sales = mongoose.model('Sales',schema)

Sales.create([
    {name:'Tom',sales:6000,month:1},
    {name:'Jerry',sales:5000,month:1},
    {name:'Tom',sales:4000,month:2},
    {name:'Jerry',sales:7000,month:2},
    {name:'Tom',sales:5000,month:3},
    {name:'Jerry',sales:9000,month:3}
],(err,res)=>{
    if(err) throw err
    console.log(res)
})