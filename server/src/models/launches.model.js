const launchesDatabase = require('./launches.mongo');
const planets=require('./planets.mongo');
const  axios = require('axios');

let latestFlightNumber=100;



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

async function saveLaunch(launch){
        // return await launchesDatabase.updateOne({flightNumber:launch.flightNumber},launch,{upsert:true})// to understand this video#173 or planets.model see them

        //the upper method return us the $setOnInsert property in responce that we don't want so that's why we use the lower method

        return await launchesDatabase.findOneAndUpdate({flightNumber:launch.flightNumber},launch,{upsert:true})// to understand this video#179 
        
}
const  SPACE_X_API_URL=' https://api.spacexdata.com/v4/launches/query';
async function populateSpaceXLaunches(){
    console.log( "downloading launch data");
    const response =await axios.post(
        SPACE_X_API_URL,
        { // we want to query to get the launch data as we have in our former launch
            query:{},
            options:{
                  // theres are limits of docs which we recieve in response because the server didn't pass all the data at once, it may create performance issues so that's why server send us response in pagination there are limit of docs in one page so we can use page property to specify the response that how many pages docs we want in response and we also turn off this pagination
                // page:2,
                 pagination:false,
                  populate:[
                    {
                        path:'rocket',
                        select:{
                            name:1
                        }
                    },
                    {
                        path:'payloads',
                        select:{
                            customers:1
                        }
                    }
                ]
            }
        }
        );
        if (response.status !==200) {
            console.log("There is error in laoding Launch")
            throw new Error("Space X Laucnh Data faild")
        }
        let launchDocs=response.data.docs;
        for (const launchDoc of launchDocs ) {
            const launch={
                flightNumber:launchDoc['flight_number'],
                success:launchDoc['success'],
                upcoming:launchDoc['upcoming'],
                mission:launchDoc['name'],
                launchDate:launchDoc['date_local'],
                rocket:launchDoc['rocket']['name'],
                customers:launchDoc['payloads'][0].customers
            }          
            console.log(`${launch.flightNumber} ${launch.mission}`)
            await saveLaunch(launch);
        }
}


async function getSpaceXLaunchData(){
    console.log("spaceXLaucnh Data function is running")
    const isLaunchFind= await findLaunch({
        flightNumber:1,
        mission:'FalconSat',
        rocket:'Falcon 1'
    })
    if(isLaunchFind){
        console.log("Space X Launch Data is already loaded");
        
    }else{
       await populateSpaceXLaunches();
    }
    

    }
    
async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}
async function isExistLaunch(id){
    return await findLaunch({flightNumber:id});

}


async function getAllLaunches(skip,limit){

    return await launchesDatabase.find(
        {}, // this will return the all objects from the collection
        {'__v':0,'_id':0} // this will exclude both these fields from the reponse
        )
        .skip(skip) // skip define how many documents we're skippin over in the result from database
        .limit(limit); // limit define how many document we have in one page
        //to understand this watch video#196 &197
}

async function scheduleNewLaunch(launch){
    // const isPlanetExist= await planets.findOne({keplerName:launch.target});// we use findone becuase we only to return one object
        // if(!isPlanetExist){   this code isn't working
        //      throw new Error('no targert planet found');
        // }
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
    abortLaunch,
    getSpaceXLaunchData
}