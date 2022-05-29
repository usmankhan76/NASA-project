const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connection.once('open',()=>{
    console.log('MongoDB connection Ready!')
})
mongoose.connection.on('error',(err)=>{console.error(err)});

const  MONGO_URL= process.env.MONGO_URL;

async function getMongooseConnection(){
    return await mongoose.connect(MONGO_URL)
     
}
async function closeMongooseConnection() {
    await mongoose.disconnect();
}

module.exports={
    getMongooseConnection,
    closeMongooseConnection,
}