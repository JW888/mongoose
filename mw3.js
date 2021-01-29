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

schema.pre('aggregate',function(next){
    console.log('pre aggregate')
    this.pipeline()[0]={$match:{name:"Tom"}}
    //this.pipeline().pop()
    //this.pipeline().pop()
    //this.match({name:'Tom'})
    //this.sort({total_sales:-1})
    next()
})

schema.post('aggregate',function(param,next){
    console.log('post aggregate')
    console.log(param)
    //console.log(this)
    next()
})

let Sales = mongoose.model('Sales',schema)

Sales
.aggregate()
.match({})
.project({_id:0,name:1,sales:1})
.group({_id:'$name',total_sales:{$sum:'$sales'},avg_sales:{$avg:'$sales'}})
.exec((err,res)=>{
    if(err) throw err
    //console.log(res)
})

// Sales
// .aggregate([
//     {$match:{name:'Tom'}},
//     {$project:{_id:0,name:1,sales:1}},
//     {$group:{_id:'$name',avg_sales:{$avg:'$sales'},total_sales:{$sum:'$sales'}}}
// ])
// .exec((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })