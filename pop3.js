const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'agg'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema_product = new mongoose.Schema({ 
    _id:Number,price:Number
},{
    toObject:{virtuals:true},toJSON:{virtuals:true}
})

let schema_rating = new mongoose.Schema({ 
    p_id:Number,rating:[Number] 
},{})

let Product = mongoose.model('Product',schema_product)
let Rating = mongoose.model('Rating',schema_rating)

schema_product.virtual('userRating',{
    ref:'Rating',
    localField:'_id',
    foreignField:'p_id',
    //justOne:true,
    count:true
})

Product.findOne({_id:100})
.populate({path:'userRating',select:'-_id rating p_id'})
.exec((err,res)=>{
    if(err) throw err
    console.log(res.toJSON().userRating)
    console.log(res.toObject().userRating)
})