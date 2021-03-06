//calculates the speed value in milliseconds based on the range input
const getSpeed = (str) => {
    let speedEl = document.querySelector(`.speed${str}`);
    let speed = (Number)(speedEl.value) / 6.25;
    return speed < 8
        ? 25 * (8 - speed)
        : speed === 8
            ? 25
            : (12.5 * 1) / (speed - 8);
};
//pauses the function for the requisite milliseconds
export default async function speedBlock(str) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, getSpeed(str));
    });
}
