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
},{
    toObject:{virtuals:true},toJSON:{virtuals:true}
})

let schema_rating = new mongoose.Schema({ 
    rating:[Number] 
},{})

let Product = mongoose.model('Product',schema_product)
let Rating = mongoose.model('Rating',schema_rating)

schema_product.virtual('msg').get(function(){return 'this is a virtual prop.'})

let p_doc = new Product({_id:500,price:500})
console.log(p_doc.toJSON())