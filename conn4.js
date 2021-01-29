const mongoose = require('mongoose')

let conn1 = mongoose.createConnection('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})

let conn2 = mongoose.createConnection('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})

conn1.model('Owner',{owner:String})

conn2.model('Owner2',{Vehicle:String})

console.log(conn1.modelNames())
console.log(conn2.modelNames())

console.log(conn1.models)
console.log(conn2.models)