import _ from "lodash";
import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
export default async function MergeSort(
  arr: SortableComponent[],
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  while (getStop()) {
    console.log(getStop());
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
  }
  if (getOtherStop()) {
    return null;
  }
  console.log(arr.length);
  const aux: SortableComponent[] = copyArr(arr);
  await sort(
    arr,
    aux,
    0,
    arr.length - 1,
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );
  for (let i = 0; i < arr.length; i++) {
    arr[i].div.style.backgroundColor = "red";
  }
  return arr;
}

async function merge(
  arr: SortableComponent[],
  aux: SortableComponent[],
  lo: number,
  mid: number,
  hi: number,
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  let i = lo;
  let j = mid + 1;
  for (let i = lo; i < hi; i++) {
      aux[i] = arr[i];
    if (i <= mid) {
      arr[i].div.style.backgroundColor = "blue";
    } else {
      arr[i].div.style.backgroundColor = "green";
    }
  }
  for (let n = lo; n <= hi; n++) {
    while (getStop()) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, 500);
      });
    }
    //Create new div to avoid issue where divs cannot be double rendered
    const div : HTMLDivElement = document.createElement("DIV")! as HTMLDivElement;
        div.setAttribute("key", Math.random()*100000 + "");
        div.classList.add('sortableElement');
        
    if (getOtherStop()) {
      return null;
    }
    if (i > mid){ 
        div.setAttribute('data-status', aux[j].value.toString());
        aux[j].div = div;
        aux[j].setSize((window.innerWidth - window.innerWidth * .1)/(aux.length) - 8 + "px");
        arr[n] = arr[j];
        j++;
    }
    else if (j > hi){ 
        div.setAttribute('data-status', aux[j].value.toString());
        aux[i].div = div;
        aux[i].setSize((window.innerWidth - window.innerWidth * .1)/(aux.length) - 8 + "px");
        arr[n] = aux[i];
        i++;
    }
    else if (aux[j].value < aux[i].value) { 
        div.setAttribute('data-status', aux[j].value.toString());
        aux[j].div = div;
        aux[j].setSize((window.innerWidth - window.innerWidth * .1)/(aux.length) - 8 + "px");
        arr[n] = aux[j];
        j++;
    }
    else {
        div.setAttribute('data-status', aux[j].value.toString());
        aux[i].div = div;
        aux[i].setSize((window.innerWidth - window.innerWidth * .1)/(aux.length) - 8 + "px");
         arr[n] = aux[i];
         i++;
        }
        arr[n].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
  }
  for (let i = lo; i < hi; i++) {
    arr[i].div.style.backgroundColor = "red";
  }
}

async function sort(
  arr: SortableComponent[],
  aux: SortableComponent[],
  i: number,
  j: number,
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  console.log("sort");

  if (j <= i) {
    return;
  }

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

  await sort(
    arr,
    aux,
    i,
    Math.floor(i + (j - i) / 2),
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );

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

  await sort(
    arr,
    aux,
    Math.floor(i + (j - i) / 2) + 1,
    j,
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );

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
  await merge(
    arr,
    aux,
    i,
    Math.floor(i + (j - i) / 2),
    j,
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );
}
