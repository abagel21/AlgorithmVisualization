import copyArr from "../util/copyArr";
export default async function knuth(arr, setSortableComponents, getStop, getSpeed, getOtherStop) {
    for (let i = 0; i < arr.length - 1; i++) {
        while (getStop()) {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null);
                }, 500);
            });
        }
        if (getOtherStop()) {
            return null;
        }
        arr[i].div.style.backgroundColor = "black";
        let j = Math.floor(Math.random() * (arr.length - i)) + i;
        arr[j].div.style.backgroundColor = "blue";
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed() * 3);
        });
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed() * 3);
        });
        arr[i].div.style.backgroundColor = "red";
        arr[j].div.style.backgroundColor = "red";
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed() * 3);
        });
    }
    return arr;
}
