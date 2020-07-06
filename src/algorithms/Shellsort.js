import copyArr from "../util/copyArr";
export default async function ShellSort(arr, setSortableComponents, getStop, getSpeed, getOtherStop) {
    let h = 1;
    while (h < Math.floor(arr.length / 3))
        h = 3 * h + 1;
    while (h >= 1) {
        for (let i = h; i < arr.length; i++) {
            arr[i].div.style.backgroundColor = "black";
            await new Promise((resolve, reject) => {
                setTimeout(() => { resolve(null); }, getSpeed());
            });
            for (let j = i; j >= h; j = j - h) {
                //stop condition for pausing
                while (getStop()) {
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(null);
                        }, 500);
                    });
                }
                //stop condition for reset
                if (getOtherStop()) {
                    return null;
                }
                if (i !== j)
                    arr[j].div.style.backgroundColor = "blue";
                await new Promise((resolve, reject) => {
                    setTimeout(() => { resolve(null); }, getSpeed());
                });
                if (arr[j].value < arr[j - h].value) {
                    let temp = arr[j];
                    arr[j] = arr[j - h];
                    arr[j - h] = temp;
                    if (i === j) {
                        arr[j].div.style.backgroundColor = "black";
                        arr[j - h].div.style.backgroundColor = "blue";
                    }
                    ;
                    setSortableComponents(copyArr(arr));
                    await new Promise((resolve, reject) => {
                        setTimeout(() => { resolve(null); }, getSpeed());
                    });
                    if (i !== j)
                        arr[j].div.style.backgroundColor = "red";
                    await new Promise((resolve, reject) => {
                        setTimeout(() => { resolve(null); }, getSpeed());
                    });
                }
                else {
                    arr[j].div.style.backgroundColor = "red";
                    break;
                }
                arr[0].div.style.backgroundColor = "red";
            }
            arr[i].div.style.backgroundColor = "red";
        }
        h = Math.floor(h / 3);
    }
    return copyArr(arr);
}
