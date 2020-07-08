//Checks if the function has been paused
function getStop() {
    const stop = document.querySelector(".stopSorting");
    return stop.dataset.status === "true";
}
//checks if the data has been reset or replaced
function getOtherStop() {
    const stop = document.querySelector(".stopSorting");
    return stop.dataset.reset === "true";
}
//checks both stopping functions and interrupts/ends the function if necessary
export default async function checkForStop() {
    if (getOtherStop()) {
        console.log("TRUE");
        return true;
    }
    while (getStop()) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 500);
        });
    }
}
