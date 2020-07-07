import copyArr from "../util/copyArr";
import assert from "assert";
export default async function HeapSort(arr, setSortableComponents, getStop, getSpeed, getOtherStop) {
    //construct a binary heap from the data from the bottom up
    for (let i = Math.floor((arr.length - 1) / 2); i >= 0; i--) {
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
        arr[i].div.style.backgroundColor = "purple";
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed());
        });
        let x = (await sink(arr, i, arr.length, getStop, getOtherStop, getSpeed, setSortableComponents));
        arr[i].div.style.backgroundColor = "red";
        arr[x].div.style.backgroundColor = "red";
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed());
        });
    }
    console.log(isHeap(arr, 0, arr.length - 1));
    //pop the minimum repeatedly and enqueue it onto the end of the pq
    for (let i = arr.length - 1; i > 0; i--) {
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
        await pop(arr, i, getStop, getOtherStop, getSpeed, setSortableComponents);
    }
    console.log("fin");
    return copyArr(arr);
}
async function pop(arr, lastIndex, getStop, getOtherStop, getSpeed, setSortableComponents) {
    arr[lastIndex].div.style.backgroundColor = "purple";
    arr[0].div.style.backgroundColor = "black";
    let temp = arr[lastIndex];
    let otherTemp = arr[0];
    arr[lastIndex] = arr[0];
    arr[0] = temp;
    assert(otherTemp.value === arr[lastIndex].value);
    assert(temp.value === arr[0].value);
    setSortableComponents(copyArr(arr));
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, getSpeed());
    });
    await sink(arr, 0, lastIndex, getStop, getOtherStop, getSpeed, setSortableComponents);
    arr[lastIndex].div.style.backgroundColor = "red";
    arr[0].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
}
async function sink(arr, i, lastIndex, getStop, getOtherStop, getSpeed, setSortableComponents) {
    //if aux[i] is less than the lower node on the tree, swap
    while (2 * (i + 1) - 1 < lastIndex) {
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
        arr[i].div.style.backgroundColor = "purple";
        let j = 2 * (i + 1) - 1;
        if (j + 1 < lastIndex && arr[j].value < arr[j + 1].value)
            j++;
        arr[j].div.style.backgroundColor = "blue";
        setSortableComponents(copyArr(arr));
        if (arr[i].value < arr[j].value) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            arr[i].div.style.backgroundColor = "red";
            i = j;
            setSortableComponents(copyArr(arr));
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null);
                }, getSpeed());
            });
        }
        else {
            arr[j].div.style.backgroundColor = "red";
            break;
        }
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed());
        });
    }
    arr[i].div.style.backgroundColor = "red";
    return i;
}
async function swim(aux, i, getStop, getOtherStop, getSpeed, setSortableComponents) {
    //if aux[i] is more than the higher node on the tree, swap
    while (i > 1 && aux[i].value > aux[Math.floor(i / 2)].value) {
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
        let j = Math.floor(i / 2);
        let temp = aux[i];
        aux[i] = aux[j];
        aux[j] = temp;
        i = j;
        setSortableComponents(copyArr(aux));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, getSpeed());
        });
    }
}
function isHeap(arr, i, n) {
    // If a leaf node
    if (i > (n - 2) / 2) {
        return true;
    }
    // If an internal node and is greater than its children, and
    // same is recursively true for the children
    if (arr[i] >= arr[2 * i + 1] &&
        arr[i] >= arr[2 * i + 2] &&
        isHeap(arr, 2 * i + 1, n) &&
        isHeap(arr, 2 * i + 2, n)) {
        return true;
    }
    return false;
}
