//Checks if the function has been paused
function getStop(str) {
    const stop = document.querySelector(`.stop${str}`);
    return stop.dataset.status === "true";
}
//checks if the data has been reset or replaced
function getOtherStop(str) {
    const stop = document.querySelector(`.stop${str}`);
    return stop.dataset.reset === "true";
}
//checks both stopping functions and interrupts/ends the function if necessary
export default async function checkForStop(str) {
    if (getOtherStop(str)) {
        return true;
    }
    while (getStop(str)) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 500);
        });
    }
}
