const mongoose = require('mongoose');

const planetsSechema=new mongoose.Schema({
    keplerName:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Planet',planetsSechema);
// mongoose connect the planetsSechema to the Planets collection  which will make it pulral automatically
// the above statement is also called compiling the model, which means that it create the the object which read and write the documents in collection in MonogDb and we can use it by exporting it 