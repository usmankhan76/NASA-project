import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  // const [success, setSuccess] = useState(true);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    saveLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setPendingLaunch(true);
    const data = new FormData(e.target);
    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    const response = await httpSubmitLaunch({
      launchDate,
      mission,
      rocket,
      target,
    });// we are assiging function it is also calling mean excuting

    // TODO: Set success based on response.
    console.log("reponse",response)
    console.log("reponse ok",response.ok)

    const success = response.ok; // we can also use the useState for managing it 
    // setSuccess(response.ok)
    if (success) {
      getLaunches();
      setTimeout(() => {
        setPendingLaunch(false);
        onSuccessSound();
      }, 800);
    } else {
      setTimeout(()=>{
        onFailureSound();
        setPendingLaunch(false);

      },500)

    }
  }, [getLaunches, onSuccessSound, onFailureSound,]);

  const abortLaunch = useCallback(async (id) => {
    console.log('abort id',id)
    const response = await httpAbortLaunch(id);
    console.log('abort reponse',response)

    // TODO: Set success based on response.
    
    const success = response.ok;
    if (success) {
      getLaunches();
      onAbortSound();
    } else {
      onFailureSound();
      
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;