const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'agg'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema_product = new mongoose.Schema({ _id:Number, price:Number },{})

let schema_rating = new mongoose.Schema({ p_id:Number, rating:[Number] },{})

let Product = mongoose.model('Product',schema_product)
let Rating = mongoose.model('Rating',schema_rating)

Product.create([
    {_id:100,price:1000}, {_id:200,price:2500},
    {_id:300,price:5000}, {_id:400,price:6500}
],(err,res)=>{
    if(err) throw err; console.log(res)
})

Rating.create([
    {p_id:100,rating:[4.5,4.8]}, {p_id:200,rating:[4.6,4.9]},
    {p_id:300,rating:[4.5,4.9]}, {p_id:400,rating:[4.6,4.7]}
],(err,res)=>{
    if(err) throw err; console.log(res)
})
