const http = require('http');
const app = require('./app');
const { getSpaceXLaunchData } = require('./models/launches.model');
const { getHabbitablePlanets } = require('./models/planets.model');
const {  getMongooseConnection } = require('./services/mongo');

const PORT=process.env.PORT || 4000;// we can define the configurable env.PORT in package json with start or wtach script it up to you by using which command you use to run the server 


const server=http.createServer(app)//createServer take the request listener which will listen to all requests which we pass it is app 



async function startServer(){
    await getMongooseConnection();
    await getHabbitablePlanets(); 
    await getSpaceXLaunchData();
    server.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`);
    });
}

startServer()