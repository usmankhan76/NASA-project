const mongoose = require('mongoose');

const launchesSchema=new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true,
    },
    launchDate:{
        type:Date,
        required:true,
    },
    mission:{
        type:String,
        required:true,
    },
    rocket:{
        type:String,
        required:true,
    },
    target:{
        type:String,
        required:true,
    },
    customers:[String],
    upcoming:{
        type:Boolean,
        required:true,
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }

});

module.exports=mongoose.model('Launch',launchesSchema);
// mongoose connect the launchesSchema to the launches collection which will make it pulral automatically
// the above statement is also called compiling the model, which means that it create the the object which read and write the documents in collection in MonogDb and we can use it by exporting it 