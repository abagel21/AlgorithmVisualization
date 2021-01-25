//Checks if the function has been paused
function getStop(str:string) {
    const stop = document.querySelector(`.stop${str}`)! as HTMLDivElement;
    return stop.dataset.status === "true";
  }
  //checks if the data has been reset or replaced
  function getOtherStop(str:string) {
    const stop = document.querySelector(`.stop${str}`)! as HTMLDivElement;
    return stop.dataset.reset === "true";
  }
//checks both stopping functions and interrupts/ends the function if necessary
  export default async function checkForStop(str:string) {
    if (getOtherStop(str)) {
      console.log("TRUE")
      return true;
    }
    while (getStop(str)) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(false);
          }, 500);
        });
      }
      if (getOtherStop(str)) {
        console.log("TRUE")
        return true;
      }
  }