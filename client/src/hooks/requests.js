const API_URL='http://localhost:5000/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  const res=await fetch(`${API_URL}/planets`);
  const data=await res.json();
  console.log('planets request')
  return data
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response=await fetch(`${API_URL}/launches`);
  const launchData=await response.json()
  //to understand the below step watch the video#119
  return launchData.sort((a,b)=>{return a.flightNumber-b.flightNumber})

  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
      return await fetch(`${API_URL}/launches`,{
      method:'post',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(launch), // post request take the data in string we need to convert it in the string
    })

  } catch (error) {
    console.log(error)
    return {ok:false}
  }
    
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
      return await fetch(`${API_URL}/launches/${id}`,{
          method:'delete'
  })  
  } catch (error) {
    console.log(error)
    return{ok:false};
  }
  
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};