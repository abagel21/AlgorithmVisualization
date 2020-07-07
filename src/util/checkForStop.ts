//Checks if the function has been paused
function getStop() {
    const stop = document.querySelector(".stopSorting")! as HTMLDivElement;
    return stop.dataset.status === "true";
  }
  //checks if the data has been reset or replaced
  function getOtherStop() {
    const stop = document.querySelector(".stopSorting")! as HTMLDivElement;
    return stop.dataset.reset === "true";
  }
//checks both stopping functions and interrupts/ends the function if necessary
  export default async function checkForStop() {
    while (getStop()) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(false);
          }, 500);
        });
      }
      if (getOtherStop()) {
        return true;
      }
  }