import _ from "lodash";
import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
export default async function ThreeWayQuicksort(
  arr: SortableComponent[],
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  //shuffle for probabilistic guarantee (and displaying that shuffling is happening)
  const info = document.querySelector(".algorithmInformation")! as HTMLDivElement;
  info.style.visibility = "visible";
  for(let i = 0; i < arr.length - 1; i++) {
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
      arr[i].div.style.backgroundColor = "black";
    let j = Math.floor(Math.random() * (arr.length-i)) + i
    arr[j].div.style.backgroundColor = "blue";
    await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed()* 3);
      });
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
    setSortableComponents(copyArr(arr));
    await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed()* 3);
      });
      arr[i].div.style.backgroundColor = "red";
      arr[j].div.style.backgroundColor = "red";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed()* 3);
      });
}
//setting information div to invisible
info.style.visibility = "hidden";
//first call to recursive three way quicksort
    await threeWayQuicksort(arr, 0, arr.length - 1, setSortableComponents, getStop, getSpeed, getOtherStop);
    for(let i = 0; i < arr.length; i++) {
      arr[i].div.style.backgroundColor = "red";
  }
    return arr;
}

async function threeWayQuicksort(
  arr: SortableComponent[],
  lo: number,
  hi: number,
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  if(hi <= lo) return;
  const originalLo = lo;
  const originalHi = hi;
  let pointer = originalLo + 1;
  while(pointer <= hi) {
    // arr[pointer].div.style.backgroundColor = "purple";
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
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
    for(let i = 0; i < arr.length; i++) {
      if(i < lo) arr[i].div.style.backgroundColor = "blue";
      else if( i > hi) arr[i].div.style.backgroundColor = "green";
      else if(i >= lo && i < pointer) arr[i].div.style.backgroundColor = "purple";
      else arr[i].div.style.backgroundColor = "black";
    }
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
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
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
    if(arr[pointer].value < arr[lo].value) {
      let temp = arr[pointer];
      arr[pointer] = arr[lo];
      arr[lo] = temp;
      lo++;
      pointer++;
      arr[lo].div.style.backgroundColor = "blue";
      setSortableComponents(copyArr(arr));
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
    } else if (arr[pointer].value > arr[lo].value) {
      let temp = arr[pointer];
      arr[pointer] = arr[hi];
      arr[hi] = temp;
      hi--;
      setSortableComponents(copyArr(arr));
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
    } else {
      pointer++;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
    }
  }
  await threeWayQuicksort(arr, originalLo, lo-1, setSortableComponents, getStop, getSpeed, getOtherStop);
  await threeWayQuicksort(arr, pointer, originalHi, setSortableComponents, getStop, getSpeed, getOtherStop);
}
