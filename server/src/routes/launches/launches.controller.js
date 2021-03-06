const { 
     getAllLaunches,
     scheduleNewLaunch,
     abortLaunch,
     isExistLaunch } = require("../../models/launches.model");
const { paginationUsingQuery } = require("../../services/query");

async function httpGetAllLaunches(req,res){
    const {skip,limit}=paginationUsingQuery(req.query)
    return res.status(200).json(await getAllLaunches(skip,limit));  // we do this because we want to pass the array in json  
};

async function httpAddNewLaunch(req,res){
    let {flightNumber,mission,rocket,launchDate,target}=req.body;
    let launch={
        flightNumber,
        mission,
        rocket,
        target,
    }; 
    launch.launchDate=new Date(launchDate);

    if(!launch.mission ||!launch.rocket ||!launch.target || !launch.launchDate ){
       return res.status(400).json({error:"Please fullfill the requirements"})
    }

    if(isNaN(launch.launchDate)){
        return res.status(400).json({name:'Enter correct Date'})
    }
    await scheduleNewLaunch(launch);
    // let similarity=checkExistence(launch.mission);
    // console.log("check similarity",similarity)
    return res.status(201).json(launch) 
    // we use the 201 status code becuse it return the data that was we created 
}
async function httpAbortLaunch(req,res){
    let launchId=Number(req.params.id);// the id coming from the params in string so we convert it into the number
    const isExist= await isExistLaunch(launchId);
    if(!isExist){
      return res.status(404).json({error:"Launch is not Exist"})
    }
    let aborted= await abortLaunch(launchId)//we  don't want to delete it but we want keep it for history, only remove from upcoming ;
    if(!aborted){
        res.status(400).json({error:"Launch is not aborted "})
    }
    return res.status(200).json(aborted)
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}