import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
/* eslint-disabel */
export default async function SelectionSort(
  arr: SortableComponent[],
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
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
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
    for (let i = pointer + 1; i < arr.length; i++) {
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
      arr[i].div.style.backgroundColor = "blue";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
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
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
    arr[min].div.style.backgroundColor = "red";
    arr[pointer].div.style.backgroundColor = "red";
  }
  return copyArr(arr);
}
