import copyArr from "../util/copyArr";
import checkForStop from "../util/checkForStop";
import speedBlock from "../util/speedBlock";
/* eslint-disable */
export default async function knuth(arr, setSortableComponents) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (await checkForStop())
            return null;
        arr[i].div.style.backgroundColor = "black";
        let j = Math.floor(Math.random() * (arr.length - i)) + i;
        arr[j].div.style.backgroundColor = "blue";
        await speedBlock();
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        setSortableComponents(copyArr(arr));
        await speedBlock();
        arr[i].div.style.backgroundColor = "red";
        arr[j].div.style.backgroundColor = "red";
        await speedBlock();
    }
    return arr;
}
