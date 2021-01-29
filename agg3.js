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
.aggregate()
//.match({name:'Jerry'})
.project({_id:0,name:1,sales:1})
.group({_id:'$name',total_sales:{$sum:'$sales'},avg_sales:{$avg:'$sales'}})
// .exec((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })
.then((success)=>{console.log(success)})
//.catch((err)=>{console.log('Err:'+err)})
