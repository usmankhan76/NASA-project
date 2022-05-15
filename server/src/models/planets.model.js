const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets=require('./planets.mongo');

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
 function getHabbitablePlanets(){
  return new Promise((reslove,reject)=>{
      console.log('function is running');

      fs.createReadStream(path.join(__dirname,"..","data","kepler_data.csv"))
          .pipe(parse({
              comment: '#',
              columns: true,  
          }))
          .on('data',async (data) => {
              if (isHabitablePlanet(data)) {
                // habitablePlanets.push(data);
                // it will create the object on every restart of the server so need to use the upserts so we are don't using it
                // await planets.create({
                //   keplerName:data.kepler_name
                // })
                
                // below method is using upsert 
                savePlanets(data);
              }
          })
          .on('error', (err) => {
              console.log(err);
              reject(err)
          })
          .on('end',async () => {
            const countPlanetFind=(await getAllPlanets()).length;
              console.log(`${countPlanetFind} habitable planets found!`);
          reslove()
      });
    })
}
async function getAllPlanets(){
  return await planets.find({},// this will return all objects in collection
    {'__v':0, '_id':0} // this will exclude the these both fields from response
    );
}
async function savePlanets(planet){
  // this is the upsert which mean only insert if it already doesn't exist and update it if it exist 
   try {
    return await planets.updateOne({
        keplerName:planet.kepler_name
      },// this will check the existense of planet
      {keplerName:planet.kepler_name},// this will update it if it present or exist
      {upsert:true}// this will create the upsert that only added new thing if it already does'nt exist
  )
  } catch (error) {
    console.error(`We could not save planet ${error}`)
  } 
}
// we can also do it without promiss simply return the stream
  module.exports={
    getHabbitablePlanets,
    getAllPlanets,
  }