import copyArr from "../util/copyArr";
import checkForStop from "../util/checkForStop";
import speedBlock from "../util/speedBlock";
export default async function Quicksort(arr, setSortableComponents) {
    //   knuth shuffle for probabilistic guarantee (and displaying that shuffling is happening)
    const info = document.querySelector(".algorithmInformation");
    info.style.visibility = "visible";
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
    //setting info div to invisible
    info.style.visibility = "hidden";
    //call recursive quicksort
    await quicksort(arr, 0, arr.length - 1, setSortableComponents);
    return arr;
}
async function quicksort(arr, lo, hi, setSortableComponents) {
    if (hi <= lo)
        return;
    let pointer = lo;
    let originalHi = hi;
    let originalLo = lo;
    lo++;
    arr[pointer].div.style.backgroundColor = "purple";
    setSortableComponents(copyArr(arr));
    while (hi !== lo) {
        if (await checkForStop())
            return null;
        for (let i = originalLo; i <= originalHi; i++) {
            if (i === hi)
                arr[i].div.style.backgroundColor = "green";
            else if (i === lo)
                arr[i].div.style.backgroundColor = "blue";
            else
                arr[i].div.style.backgroundColor = "black";
        }
        arr[pointer].div.style.backgroundColor = "purple";
        setSortableComponents(copyArr(arr));
        // arr[pointer].div.style.backgroundColor = "purple";
        // arr[hi].div.style.backgroundColor = "green";
        // arr[lo].div.style.backgroundColor = "blue";
        await speedBlock();
        //incrementing lo while the value at lo is less than the value at pointer
        while (arr[lo].value < arr[pointer].value) {
            if (await checkForStop())
                return null;
            if (hi === lo)
                break;
            if (pointer !== lo)
                arr[lo].div.style.backgroundColor = "blue";
            lo++;
            //changing div colors
            if (lo - 1 !== pointer)
                arr[lo - 1].div.style.backgroundColor = "black";
            arr[lo].div.style.backgroundColor = "blue";
            setSortableComponents(copyArr(arr));
            await speedBlock();
        }
        //incrementing hi while the value at hi is greater than the value at pointer
        while (arr[hi].value > arr[pointer].value) {
            if (await checkForStop())
                return null;
            if (hi === lo)
                break;
            hi--;
            //changing colors
            arr[hi + 1].div.style.backgroundColor = "black";
            arr[hi].div.style.backgroundColor = "green";
            setSortableComponents(copyArr(arr));
            await speedBlock();
        }
        //swapping the two "erroneous" values
        let temp = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = temp;
        //swapping colors back
        arr[lo].div.style.backgroundColor = "black";
        arr[hi].div.style.backgroundColor = "black";
        setSortableComponents(copyArr(arr));
        await speedBlock();
    }
    if (arr[hi].value > arr[pointer].value) {
        hi--;
    }
    console.log("HI " + hi);
    console.log("LO " + lo);
    //swapping pointer and combined hi and lo
    let temp = arr[hi];
    arr[hi] = arr[pointer];
    arr[pointer] = temp;
    setSortableComponents(copyArr(arr));
    for (let i = originalLo; i <= originalHi; i++) {
        arr[i].div.style.backgroundColor = "red";
    }
    arr[pointer].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
    await speedBlock();
    if (await checkForStop())
        return null;
    await quicksort(arr, originalLo, hi - 1, setSortableComponents);
    if (await checkForStop())
        return null;
    await quicksort(arr, hi + 1, originalHi, setSortableComponents);
}
