const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'cars'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

// let date_obj = new Date()

// date_obj.setDate(date_obj.getDate()+1)

// console.log(date_obj)

let schema = new mongoose.Schema({
    reg_date: Date
},{})

console.log(schema.path('reg_date'))

let Reg_date = mongoose.model('Reg_date',schema)

// let doc = new Reg_date({
//     reg_date:new Date()
// })
// console.log(doc)
// doc.save((err,res)=>{
//     if(err) throw err
//     console.log(res)
// })

Reg_date.findOne((err,doc)=>{
    //console.log(doc)
    doc.reg_date.setDate(doc.reg_date.getDate()+1)
    console.log(doc)
    doc.markModified('reg_date')
    doc.save((err,res)=>{
        if(err) throw err
        console.log(res)
    })
})