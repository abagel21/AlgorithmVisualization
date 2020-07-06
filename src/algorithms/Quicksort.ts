import _ from "lodash";
import SortableComponent from "../util/SortableComponent";
import copyArr from "../util/copyArr";
export default async function Quicksort(
  arr: SortableComponent[],
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
//   knuth shuffle for probabilistic guarantee (and displaying that shuffling is happening)
  const info = document.querySelector(".algorithmInformation")! as HTMLDivElement;
  info.style.visibility = "visible";
    for (let i = 0; i < arr.length - 1; i++) {
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
      let j = Math.floor(Math.random() * (arr.length - i)) + i;
      arr[j].div.style.backgroundColor = "blue";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed() * 3);
      });
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      setSortableComponents(copyArr(arr));
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed() * 3);
      });
      arr[i].div.style.backgroundColor = "red";
      arr[j].div.style.backgroundColor = "red";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed() * 3);
      });
    }
    //setting info div to invisible
    info.style.visibility = "hidden";
  //call recursive quicksort
  await quicksort(
    arr,
    0,
    arr.length - 1,
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );
  return arr;
}

async function quicksort(
  arr: SortableComponent[],
  lo: number,
  hi: number,
  setSortableComponents: any,
  getStop: any,
  getSpeed: any,
  getOtherStop: any
) {
  if (hi <= lo) return;
  let pointer = lo;
  let originalHi = hi;
  let originalLo = lo;
  lo++;

  arr[pointer].div.style.backgroundColor = "black";

  while (hi !== lo) {
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
    arr[pointer].div.style.backgroundColor = "black";
    arr[hi].div.style.backgroundColor = "green";
    arr[lo].div.style.backgroundColor = "blue";
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
    //incrementing lo while the value at lo is less than the value at pointer
    while (arr[lo].value < arr[pointer].value) {
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
      if (hi === lo) break;
      if (pointer !== lo) arr[lo].div.style.backgroundColor = "blue";
      lo++;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
      //changing div colors
      if (lo - 1 !== pointer) arr[lo - 1].div.style.backgroundColor = "red";
      arr[lo].div.style.backgroundColor = "blue";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
    }
    //incrementing hi while the value at hi is greater than the value at pointer
    while (arr[hi].value > arr[pointer].value) {
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
      if (hi === lo) break;
      hi--;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
      //changing colors
      arr[hi + 1].div.style.backgroundColor = "red";
      arr[hi].div.style.backgroundColor = "green";
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(null);
        }, getSpeed());
      });
    }
    //swapping the two "erroneous" values
    let temp: SortableComponent = arr[lo];
    arr[lo] = arr[hi];
    arr[hi] = temp;
    //swapping colors back
    arr[lo].div.style.backgroundColor = "red";
    arr[hi].div.style.backgroundColor = "red";
    setSortableComponents(copyArr(arr));
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, getSpeed());
    });
  }
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, getSpeed());
  });
  if (arr[hi].value > arr[pointer].value) {
    hi--;
  }
  console.log("HI " + hi);
  console.log("LO " + lo);
  //swapping pointer and combined hi and lo
  let temp: SortableComponent = arr[hi];
  arr[hi] = arr[pointer];
  arr[pointer] = temp;
  setSortableComponents(copyArr(arr));
  arr[pointer].div.style.backgroundColor = "red";
  arr[hi].div.style.backgroundColor = "red";
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
  await quicksort(
    arr,
    originalLo,
    hi - 1,
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
  await quicksort(
    arr,
    hi + 1,
    originalHi,
    setSortableComponents,
    getStop,
    getSpeed,
    getOtherStop
  );
}
