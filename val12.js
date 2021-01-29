const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27000/admin',{
    useNewUrlParser: true,useUnifiedTopology: true,
    user:'rootUser',pass:'pwd123',dbName:'reg'
})
.then(()=>{console.log('connected to '+mongoose.connection.name)})
.catch((err)=>{console.log('cannot connect to '+mongoose.connection.name)})

let schema = mongoose.Schema({
    user:{ type:String, lowercase:true }
})

schema.path('user').validate(async function(v){
    let result = await Reg.find({user:v})
    if(result.length!==0) return Promise.resolve(false)
    //Promise.reject('duplicated user name')//return false
},'no duplicated user name')

let Reg = mongoose.model('Reg',schema)

let doc = new Reg({
    user:'tom@example.com'
})

doc.save((err,res)=>{
    if(err) console.log(err)
    console.log(res)
})