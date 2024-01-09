const mongoose = require("mongoose");
mongoose.connect(process.env.mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection

connection.on('error' , ()=>{
    console.log('Mongo DB Connection failed')
})
connection.on('connected' , ()=>{
    console.log('Mongo db successful')
})

module.exports = mongoose 