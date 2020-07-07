import copyArr from "../util/copyArr";
import checkForStop from "../util/checkForStop";
import speedBlock from "../util/speedBlock";
/* eslint-disable */
export default async function MergeSort(arr, setSortableComponents) {
    if (await checkForStop())
        return null;
    const aux = copyArr(arr);
    await sort(arr, aux, 0, arr.length - 1, setSortableComponents);
    for (let i = 0; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "red";
    }
    return arr;
}
async function merge(arr, aux, lo, mid, hi, setSortableComponents) {
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
    await speedBlock();
    for (let n = lo; n <= hi; n++) {
        if (await checkForStop())
            return null;
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
        await speedBlock();
    }
    arr[mid].div.style.backgroundColor = "red";
    for (let i = lo; i < hi; i++) {
        arr[i].div.style.backgroundColor = "red";
        aux[i].div.style.backgroundColor = "red";
    }
}
async function sort(arr, aux, i, j, setSortableComponents) {
    if (j <= i) {
        return;
    }
    if (await checkForStop())
        return null;
    await sort(arr, aux, i, Math.floor(i + (j - i) / 2), setSortableComponents);
    if (await checkForStop())
        return null;
    await sort(arr, aux, Math.floor(i + (j - i) / 2) + 1, j, setSortableComponents);
    if (await checkForStop())
        return null;
    await merge(arr, aux, i, Math.floor(i + (j - i) / 2), j, setSortableComponents);
}
