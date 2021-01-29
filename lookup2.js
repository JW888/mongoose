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

//aggregate.lookup(
 //   { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' }
//);

Product
.aggregate()
.lookup({
    from:'ratings', // collection name, not model constructor name
    localField:'_id',
    foreignField:'p_id',
    as:'user_rating_field'
})
.exec((err,res)=>{if(err) throw err; console.log(res[0])})