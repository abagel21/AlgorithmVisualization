import copyArr from "../../util/copyArr";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
export default async function ThreeWayQuicksort(arr, setSortableComponents) {
    //shuffle for probabilistic guarantee (and displaying that shuffling is happening)
    const info = document.querySelector(".algorithmInformation");
    info.style.visibility = "visible";
    for (let i = 0; i < arr.length - 1; i++) {
        if (await checkForStop("Sorting"))
            return null;
        arr[i].div.style.backgroundColor = "black";
        let j = Math.floor(Math.random() * (arr.length - i)) + i;
        arr[j].div.style.backgroundColor = "blue";
        await speedBlock("Sorting");
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        setSortableComponents(copyArr(arr));
        await speedBlock("Sorting");
        arr[i].div.style.backgroundColor = "red";
        arr[j].div.style.backgroundColor = "red";
        await speedBlock("Sorting");
    }
    //setting information div to invisible
    info.style.visibility = "hidden";
    //first call to recursive three way quicksort
    await threeWayQuicksort(arr, 0, arr.length - 1, setSortableComponents);
    for (let i = 0; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "red";
    }
    return arr;
}
async function threeWayQuicksort(arr, lo, hi, setSortableComponents) {
    if (hi <= lo)
        return;
    const originalLo = lo;
    const originalHi = hi;
    let pointer = originalLo + 1;
    while (pointer <= hi) {
        // arr[pointer].div.style.backgroundColor = "purple";
        await speedBlock("Sorting");
        if (await checkForStop("Sorting"))
            return null;
        for (let i = originalLo; i <= originalHi; i++) {
            if (i < lo)
                arr[i].div.style.backgroundColor = "blue";
            else if (i > hi)
                arr[i].div.style.backgroundColor = "green";
            else if (i >= lo && i < pointer)
                arr[i].div.style.backgroundColor = "purple";
            else
                arr[i].div.style.backgroundColor = "black";
        }
        setSortableComponents(copyArr(arr));
        await speedBlock("Sorting");
        if (await checkForStop("Sorting"))
            return null;
        await speedBlock("Sorting");
        if (arr[pointer].value < arr[lo].value) {
            let temp = arr[pointer];
            arr[pointer] = arr[lo];
            arr[lo] = temp;
            lo++;
            pointer++;
            // arr[lo].div.style.backgroundColor = "blue";
            setSortableComponents(copyArr(arr));
            await speedBlock("Sorting");
        }
        else if (arr[pointer].value > arr[lo].value) {
            let temp = arr[pointer];
            arr[pointer] = arr[hi];
            arr[hi] = temp;
            hi--;
            setSortableComponents(copyArr(arr));
            await speedBlock("Sorting");
        }
        else {
            pointer++;
            await speedBlock("Sorting");
        }
    }
    for (let i = originalLo; i <= originalHi; i++) {
        arr[i].div.style.backgroundColor = "red";
    }
    setSortableComponents(copyArr(arr));
    await threeWayQuicksort(arr, originalLo, lo - 1, setSortableComponents);
    await threeWayQuicksort(arr, pointer, originalHi, setSortableComponents);
}
