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

Sales
.find({})
.exec((err,res)=>{
    if(err) throw err
    console.log(res)
})

Sales
.aggregate([
    //{$match:{name:'Tom'}},
    {$project:{_id:0,name:1,sales:1}},
    {$group:{_id:'$name',avg_sales:{$avg:'$sales'},total_sales:{$sum:'$sales'}}}
])
.exec((err,res)=>{
    if(err) throw err
    console.log(res)
})