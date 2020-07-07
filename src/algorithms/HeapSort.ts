import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
import assert from "assert";
import checkForStop from "../util/checkForStop";
import speedBlock from "../util/speedBlock";
export default async function HeapSort(
  arr: SortableComponent[],
  setSortableComponents: any
) {
  //construct a binary heap from the data from the bottom up
  for (let i = Math.floor((arr.length - 1)/2); i >= 0; i--) {
    if(await checkForStop()) return null;
    arr[i].div.style.backgroundColor = "purple";
    setSortableComponents(copyArr(arr));
    await speedBlock();
    let x : number = (await sink(arr, i, arr.length, setSortableComponents))!;
    arr[i].div.style.backgroundColor = "red";
    arr[x].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
    await speedBlock();
  }
  console.log(isHeap(arr, 0, arr.length - 1));
  //pop the minimum repeatedly and enqueue it onto the end of the pq
  for (let i = arr.length - 1; i > 0; i--) {
    if(await checkForStop()) return null;
    await pop(arr, i, setSortableComponents);
  }
  return copyArr(arr);
}

async function pop(
    arr: SortableComponent[],
  lastIndex: number,
  setSortableComponents: any
) {
    arr[lastIndex].div.style.backgroundColor = "purple";
    arr[0].div.style.backgroundColor = "black";
  let temp: SortableComponent = arr[lastIndex];
  let otherTemp : SortableComponent = arr[0];
  arr[lastIndex] = arr[0];
  arr[0] = temp;
  assert(otherTemp.value === arr[lastIndex].value);
  assert(temp.value === arr[0].value);
  setSortableComponents(copyArr(arr));
  await speedBlock();
  await sink(
    arr,
    0,
    lastIndex,
    setSortableComponents
  );
  arr[lastIndex].div.style.backgroundColor = "red";
    arr[0].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
}

async function sink(
    arr: SortableComponent[],
  i: number,
  lastIndex: number,
  setSortableComponents: any
) {
  //if aux[i] is less than the lower node on the tree, swap
  while (2 * (i + 1) - 1 < lastIndex) {
    if(await checkForStop()) return null;
    arr[i].div.style.backgroundColor = "purple";
    let j = 2 * (i + 1) - 1;
    if (j + 1 < lastIndex && arr[j].value < arr[j + 1].value) j++;
    arr[j].div.style.backgroundColor = "blue";
    setSortableComponents(copyArr(arr));
    if (arr[i].value < arr[j].value) {
      let temp: SortableComponent = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      arr[i].div.style.backgroundColor = "red";
      i = j;
      setSortableComponents(copyArr(arr));
      await speedBlock();
    } else {
        arr[j].div.style.backgroundColor = "red";
      break;
    }
    setSortableComponents(copyArr(arr));
    await speedBlock();
  }
  arr[i].div.style.backgroundColor = "red";
  return i;
}

// async function swim(
//   aux: SortableComponent[],
//   i: number,
//   getStop: any,
//   getOtherStop: any,
//   getSpeed: any,
//   setSortableComponents: any
// ) {
//   //if aux[i] is more than the higher node on the tree, swap
//   while (i > 1 && aux[i].value > aux[Math.floor(i / 2)].value) {
//     while (getStop()) {
//       await new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(null);
//         }, 500);
//       });
//     }
//     if (getOtherStop()) {
//       return null;
//     }
//     let j = Math.floor(i / 2);
//     let temp: SortableComponent = aux[i];
//     aux[i] = aux[j];
//     aux[j] = temp;
//     i = j;
//     setSortableComponents(copyArr(aux));
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(null);
//       }, getSpeed());
//     });
//   }
// }

function isHeap(arr: SortableComponent[], i: number, n: number) {
  // If a leaf node
  if (i > (n - 2) / 2) {
    return true;
  }

  // If an internal node and is greater than its children, and
  // same is recursively true for the children
  if (
    arr[i] >= arr[2 * i + 1] &&
    arr[i] >= arr[2 * i + 2] &&
    isHeap(arr, 2 * i + 1, n) &&
    isHeap(arr, 2 * i + 2, n)
  ) {
    return true;
  }

  return false;
}
