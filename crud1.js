const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars5'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    brand:String,
    model:String,
    year:Number
},{})

let Car = mongoose.model('Car',schema)

Car.create(
    [
        {brand:'Toyota',model:'Supra',year:2019},
        {brand:'Honda',model:'Civic',year:2010},
        {brand:'Nissan',model:'GT-R',year:2019}
    ],
    {},
    (err,res)=>{
        if(err) throw err
        console.log(res)
    }
)
