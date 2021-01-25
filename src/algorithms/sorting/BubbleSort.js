import copyArr from "../../util/copyArr";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
export default async function bubbleSort(arr, setSortableComponents) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "black";
        await speedBlock("Sorting");
        for (let j = i; j > 0; j--) {
            //stop condition for pausing
            if (await checkForStop("Sorting"))
                return null;
            if (i !== j)
                arr[j].div.style.backgroundColor = "blue";
            setSortableComponents(copyArr(arr));
            await speedBlock("Sorting");
            if (arr[j].value < arr[j - 1].value) {
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                if (i === j) {
                    arr[j].div.style.backgroundColor = "black";
                    arr[j - 1].div.style.backgroundColor = "blue";
                }
                ;
                setSortableComponents(copyArr(arr));
                await speedBlock("Sorting");
                if (i !== j)
                    arr[j].div.style.backgroundColor = "red";
                await speedBlock("Sorting");
            }
            else {
                arr[j].div.style.backgroundColor = "red";
                break;
            }
            arr[0].div.style.backgroundColor = "red";
            setSortableComponents(copyArr(arr));
        }
        arr[i].div.style.backgroundColor = "red";
        setSortableComponents(copyArr(arr));
    }
    return copyArr(arr);
}
