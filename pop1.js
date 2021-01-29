const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'pop'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema_product = new mongoose.Schema({ 
    _id:Number,price:Number,
    rating:{type:mongoose.ObjectId,ref:'Rating'}
},{})

let schema_rating = new mongoose.Schema({ 
    rating:[Number] 
},{})

let Product = mongoose.model('Product',schema_product)
let Rating = mongoose.model('Rating',schema_rating)

let r_doc = new Rating({})
let p_doc = new Product({
    _id:100,price:25000,rating:r_doc._id
})

// r_doc.save()
// p_doc.save()

Product
.findOne({_id:100})
.populate({path:'rating',select:'-_id rating'})
.exec((err,doc)=>{
    if(err) throw err
    console.log(doc)
    console.log(doc.rating.rating)
})

// Product
// .findOne({_id:100},(err,doc)=>{
//     Rating.updateOne({_id:doc.rating},{$push:{rating:{$each:[4.5,4.6,4.9]}}})
//     .exec((err,res)=>{
//         if(err) throw err
//         console.log(res)
//     })
// })