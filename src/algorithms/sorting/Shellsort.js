import copyArr from "../../util/copyArr";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
export default async function ShellSort(arr, setSortableComponents) {
    let h = 1;
    while (h < Math.floor(arr.length / 3))
        h = 3 * h + 1;
    while (h >= 1) {
        for (let i = h; i < arr.length; i++) {
            for (let k = i; k >= h; k = k - h) {
                arr[k].div.style.backgroundColor = "blue";
            }
            arr[i].div.style.backgroundColor = "black";
            setSortableComponents(copyArr(arr));
            await speedBlock("Sorting");
            for (let j = i; j >= h; j = j - h) {
                if (await checkForStop("Sorting")) {
                    return null;
                }
                setSortableComponents(copyArr(arr));
                await speedBlock("Sorting");
                if (arr[j].value < arr[j - h].value) {
                    let temp = arr[j];
                    arr[j] = arr[j - h];
                    arr[j - h] = temp;
                    setSortableComponents(copyArr(arr));
                    await speedBlock("Sorting");
                }
                else {
                    break;
                }
            }
            for (let k = i; k >= h; k = k - h) {
                arr[k].div.style.backgroundColor = "red";
            }
            arr[i].div.style.backgroundColor = "red";
            setSortableComponents(copyArr(arr));
            await speedBlock("Sorting");
        }
        arr[0].div.style.backgroundColor = "red";
        h = Math.floor(h / 3);
    }
    return copyArr(arr);
}
