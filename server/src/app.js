const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { planetRoutes } = require('./routes/planets/planets.route');
const { launchesRoute } = require('./routes/launches/launches.route');
const { apiRouter } = require('./routes/api');


const app=express();
// app.use(cors({
//     origin:'http://localhost:3000',
// }))// it will used for the cross origin request and we can also fix the origins that makes the request to our server
app.use(cors())
app.use(morgan('combined'))
app.use(express.json());

//make versioning of our app we can add version here but don't do this because we want that our all same version routers live under the one route so for this we move it into api.js file 

// we can also define the routes here with this middleware
app.use('/v1',apiRouter)

// to understand this concept watch video#115
app.use(express.static(path.join(__dirname, "..","build" ,)))
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","build","index.html"))
})

module.exports=app;