import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
import checkForStop from "../util/checkForStop";
import speedBlock from "../util/speedBlock";
/* eslint-disable */
export default async function SelectionSort(
  arr: SortableComponent[],
  setSortableComponents: any,
) {
  const speed: HTMLInputElement = document.querySelector(
    ".speedNumber"
  )! as HTMLInputElement;
  const stop: HTMLInputElement = document.querySelector(
    ".stopSorting"
  )! as HTMLInputElement;
  for (let pointer = 0; pointer < arr.length - 1; pointer++) {
    let min: number = pointer;
    arr[pointer].div.style.backgroundColor = "black";
    setSortableComponents(copyArr(arr));
    await speedBlock();
    for (let i = pointer + 1; i < arr.length; i++) {
      if(await checkForStop()) {
        return null;
      }
      arr[i].div.style.backgroundColor = "blue";
      setSortableComponents(copyArr(arr));
      await speedBlock();
      if (arr[i].value < arr[min].value) {
        if (min !== pointer) {
          arr[min].div.style.backgroundColor = "red";
        }
        min = i;
        arr[min].div.style.backgroundColor = "green";
      } else {
        arr[i].div.style.backgroundColor = "red";
      }
    }
    const temp: SortableComponent = arr[min];
    arr[min] = arr[pointer];
    arr[pointer] = temp;
    setSortableComponents(copyArr(arr));
    await speedBlock();
    arr[min].div.style.backgroundColor = "red";
    arr[pointer].div.style.backgroundColor = "red";
  }
  return copyArr(arr);
}
