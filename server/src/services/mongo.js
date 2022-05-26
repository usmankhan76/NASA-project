const mongoose = require('mongoose');

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection Ready!')
})
mongoose.connection.on('error',(err)=>{console.error(err)});

const  MONGO_URL= 'mongodb+srv://NASA-API:vkEhaLi290Qm9NW7@cluster0.fhjhw.mongodb.net/nasa?retryWrites=true&w=majority';

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