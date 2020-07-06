import copyArr from "../util/copyArr";
export default async function MergeSort(arr, setSortableComponents, getStop, getSpeed, getOtherStop) {
    while (getStop()) {
        console.log(getStop());
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, 500);
        });
    }
    if (getOtherStop()) {
        return null;
    }
    const aux = copyArr(arr);
    await sort(arr, aux, 0, arr.length - 1, setSortableComponents, getStop, getSpeed, getOtherStop);
    for (let i = 0; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "red";
    }
    console.log(arr);
    return arr;
}
async function merge(arr, aux, lo, mid, hi, setSortableComponents, getStop, getSpeed, getOtherStop) {
    let i = lo;
    let j = mid + 1;
    //copy array
    for (let i = lo; i <= hi; i++) {
        aux[i] = arr[i];
        // arr[i].div = arr[i].div.cloneNode() as HTMLDivElement;
        // arr[i].div.setAttribute("key", Math.random() * 100000 + "");
    }
    //color partitions
    for (let i = lo; i <= hi; i++) {
        if (i <= mid) {
            arr[i].div.style.backgroundColor = "blue";
            aux[i].div.style.backgroundColor = "blue";
        }
        else {
            arr[i].div.style.backgroundColor = "green";
            aux[i].div.style.backgroundColor = "green";
        }
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, getSpeed());
    });
    for (let n = lo; n <= hi; n++) {
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
        console.log(arr);
        if (i > mid) {
            arr[n] = aux[j++];
        }
        else if (j > hi) {
            arr[n] = aux[i++];
        }
        else if (aux[j].value < aux[i].value) {
            arr[n] = aux[j++];
        }
        else {
            arr[n] = aux[i++];
        }
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed());
        });
    }
    arr[mid].div.style.backgroundColor = "red";
    for (let i = lo; i < hi; i++) {
        arr[i].div.style.backgroundColor = "red";
        aux[i].div.style.backgroundColor = "red";
    }
}
async function sort(arr, aux, i, j, setSortableComponents, getStop, getSpeed, getOtherStop) {
    if (j <= i) {
        return;
    }
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
    await sort(arr, aux, i, Math.floor(i + (j - i) / 2), setSortableComponents, getStop, getSpeed, getOtherStop);
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
    await sort(arr, aux, Math.floor(i + (j - i) / 2) + 1, j, setSortableComponents, getStop, getSpeed, getOtherStop);
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
    await merge(arr, aux, i, Math.floor(i + (j - i) / 2), j, setSortableComponents, getStop, getSpeed, getOtherStop);
}
