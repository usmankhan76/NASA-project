const launchesDatabase = require('./launches.mongo');
const planets=require('./planets.mongo');


let latestFlightNumber=100;

async function isExistLaunch(id){
    return await launchesDatabase.findOne({flightNumber:id});

}

async function getLatestFlightNumber(){
    const latestLaunch= await launchesDatabase
    .findOne()
    .sort('-flightNumber') // this will sort the doucuments and return only higher flightNumber document and the - sign sort in decsending order

    // if there is no latestLaucnh 
    if(!latestLaunch){
        return latestFlightNumber
    }
    return latestLaunch.flightNumber
}

let launch={
    flightNumber:latestFlightNumber,
    mission:'Kepler Exploarion X',
    rocket:'Explorer ISI',
    launchDate:new Date('December 21, 2025'),
    target:'kepler-442 b',
    customers:['NASA'],
    upcoming:true,
    success:true,    
};

 saveLaunch(launch);

async function saveLaunch(launch){
        
    // const isPlanetExist= await planets.findOne({keplerName:launch.target});// we use findone becuase we only to return one object
        // if(!isPlanetExist){   this code isn't working
        //      throw new Error('no targert planet found');
        // }


        // return await launchesDatabase.updateOne({flightNumber:launch.flightNumber},launch,{upsert:true})// to understand this video#173 or planets.model see them

        //the upper method return us the $setOnInsert property in responce that we don't want so that's why we use the lower method

        return await launchesDatabase.findOneAndUpdate({flightNumber:launch.flightNumber},launch,{upsert:true})// to understand this video#179 
        
}


async function getAllLaunches(){
    return await launchesDatabase.find(
        {}, // this will return the all objects from the collection
        {'__v':0,'_id':0} // this will exclude both these fields from the reponse
        );
}

async function scheduleNewLaunch(launch){
    const newFlightNumber= await getLatestFlightNumber()+1;
    const newLaunch=Object.assign(launch,{
        upcoming:true,
        success:true,
        customers:['Usman khan ', 'NASA'],
        flightNumber:newFlightNumber,
        
    });
    await saveLaunch(newLaunch);

}

async function abortLaunch(launchId){
    const aborted= await launchesDatabase.updateOne({
        flightNumber:launchId,
    },{
        upcoming:false,
        success:false
    }// we aren't adding upsert there because we don't want to insert new document
    )
    return aborted.modifiedCount===1;

}


module.exports={
    getAllLaunches,
    scheduleNewLaunch,
    isExistLaunch,
    abortLaunch
}