const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

// { info: {name:'Tom', ID: 100 } }

let nested_path_schema = mongoose.Schema({
    info: {
        name:String,
        ID:Number
    }
},{})

let Arr = mongoose.model('Arr',nested_path_schema)

// console.log(nested_path_schema.path('info'))
// console.log(nested_path_schema.path('info.name'))
let doc = new Arr({
    info:{
       name:'Orwell',ID:1984
    }
})
console.log(doc)
doc.save((err,res)=>{
    if(err) throw err
    console.log(res)
})
