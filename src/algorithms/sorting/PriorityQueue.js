import copyArr from "../../util/copyArr";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
class PriorityQueue {
    //UNFINISHED
    async pop(arr, lastIndex, setSortableComponents) {
        arr[lastIndex].div.style.backgroundColor = "green";
        arr[0].div.style.backgroundColor = "black";
        let temp = arr[lastIndex];
        let otherTemp = arr[0];
        arr[lastIndex] = arr[0];
        arr[0] = temp;
        setSortableComponents(copyArr(arr));
        await speedBlock();
        await this.sink(arr, 0, lastIndex, setSortableComponents);
        arr[lastIndex].div.style.backgroundColor = "red";
        arr[0].div.style.backgroundColor = "red";
        setSortableComponents(copyArr(arr));
    }
    async sink(arr, i, lastIndex, setSortableComponents) {
        //if aux[i] is less than the lower node on the tree, swap
        while (2 * (i + 1) - 1 < lastIndex) {
            if (await checkForStop())
                return null;
            let j = 2 * (i + 1) - 1;
            arr[j].div.style.backgroundColor = "blue";
            setSortableComponents(copyArr(arr));
            if (j + 1 < lastIndex && arr[j].value < arr[j + 1].value)
                j++;
            if (arr[i].value < arr[j].value) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                arr[i].div.style.backgroundColor = "blue";
                i = j;
                setSortableComponents(copyArr(arr));
                await speedBlock();
            } else {
                break;
            }
            arr[j].div.style.backgroundColor = "red";
            setSortableComponents(copyArr(arr));
            await speedBlock();
        }
        return i;
    }
    async swim(aux, i, setSortableComponents) {
        //if aux[i] is more than the higher node on the tree, swap
        while (i > 1 && aux[i].value > aux[Math.floor(i / 2)].value) {
            if (await checkForStop())
                return null;
            let j = Math.floor(i / 2);
            let temp = aux[i];
            aux[i] = aux[j];
            aux[j] = temp;
            i = j;
            setSortableComponents(copyArr(aux));
            await speedBlock();
        }
    }
    isHeap(arr, i, n) {
        // If a leaf node
        if (i > (n - 2) / 2) {
            return true;
        }
        // If an internal node and is greater than its children, and
        // same is recursively true for the children
        if (arr[i] >= arr[2 * i + 1] &&
            arr[i] >= arr[2 * i + 2] &&
            this.isHeap(arr, 2 * i + 1, n) &&
            this.isHeap(arr, 2 * i + 2, n)) {
            return true;
        }
        return false;
    }
}