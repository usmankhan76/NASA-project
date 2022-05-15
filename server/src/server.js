const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { getHabbitablePlanets } = require('./models/planets.model');

const PORT=process.env.PORT || 4000;// we can define the configurable env.PORT in package json with start or wtach script it up to you by using which command you use to run the server 
const  MONGO_URL= 'mongodb+srv://NASA-API:vkEhaLi290Qm9NW7@cluster0.fhjhw.mongodb.net/nasa?retryWrites=true&w=majority' 

const server=http.createServer(app)//createServer take the request listener which will listen to all requests which we pass it is app 

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection Ready!')
})
mongoose.connection.on('error',(err)=>{console.error(err)})
async function startServer(){
    await mongoose.connect(MONGO_URL)
    await getHabbitablePlanets();
    
    server.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
    });
}

startServer()