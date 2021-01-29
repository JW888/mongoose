const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

// array: primitive & subDoc. 
// [1,2,3] & [ {doc} ]

let s1 = new mongoose.Schema({
    arr:[{
        name:String, ID:Number
    }]
},{})

let s2 = new mongoose.Schema({
    arr:[
        new mongoose.Schema({
            name:String, ID:Number
        },{})
    ]
},{})

let M1 = mongoose.model('M1',s1)
let M2 = mongoose.model('M2',s2)

let doc1 = new M1({
    arr:[{name:'Tom',ID:100}]
})
let doc2 = new M2({
    arr:[{name:'Jerry',ID:200}]
})
console.log(doc1)
console.log(doc2)