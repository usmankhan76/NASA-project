const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { planetRoutes } = require('./routes/planets/planets.route');
const { launchesRoute } = require('./routes/launches/launches.route');


const app=express();
// app.use(cors({
//     origin:'http://localhost:3000',
// }))// it will used for the cross origin request and we can also fix the origins that makes the request to our server
app.use(cors())
app.use(morgan('combined'))
app.use(express.json());

app.use('/planets',planetRoutes)// we can also define the routes here with this middleware
app.use('/launches',launchesRoute)

// to understand this concept watch video#115
app.use(express.static(path.join(__dirname, "..","build" ,)))
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","build","index.html"))
})

module.exports=app;