const express = require('express');
const { launchesRoute } = require("./launches/launches.route")
const { planetRoutes } = require("./planets/planets.route")

const apiRouter=express.Router();

apiRouter.use('/planets',planetRoutes) 
apiRouter.use('/launches',launchesRoute);

module.exports={
    apiRouter
}