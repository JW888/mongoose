const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

// array: primitive & subDoc. 
// [1,2,3] & [ {doc} ]
let schema = new mongoose.Schema({
    arr:[Number]
},{})

console.log(schema)

let Arr = mongoose.model('Arr',schema)

let doc = new Arr({arr:['1',2,3,4]})

console.log(doc)