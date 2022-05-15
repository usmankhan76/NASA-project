// const launches = require('./launches.mongo');

let launches=new Map();
let latestFlightNumber=100;
function isExistLaunch(id){
    return launches.has(id);
}
let launch={
    flightNumber:latestFlightNumber,
    mission:'Kepler Exploarion X',
    rocket:'Explorer ISI',
    launchDate:new Date('December 21, 2025'),
    target:'Kepler-442 b',
    customers:['NASA'],
    upcoming:true,
    success:true,    
};

launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    // addLaunch()
    return Array.from(launches.values())
}
function addNewLaunch(launch){
    latestFlightNumber++;

    return launches.set(
        latestFlightNumber,
        Object.assign(launch,{
            flightNumber:latestFlightNumber,
            upcoming:true,
            success:true,
            customer:['Usman khan','NASA'],
            

    }))
}

function abortLaunch(id){
    let aborted=launches.get(id);
    aborted.upcoming=false;
    aborted.success=false
    return aborted
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    isExistLaunch,
    abortLaunch
}