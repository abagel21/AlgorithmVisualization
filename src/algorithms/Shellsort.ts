import _ from 'lodash';
import SortableComponent from '../util/SortableComponent';
import copyArr from "../util/copyArr";
export default async function ShellSort(arr : SortableComponent[], setSortableComponents : any, getStop : any, getSpeed: any,
    getOtherStop: any) {
        let h:number = 1;
        while(h < Math.floor(arr.length /3)) h= 3* h + 1
        while(h>=1) {
    for(let i = h; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "black";
        setSortableComponents(copyArr(arr));
        await new Promise((resolve, reject) => {
            setTimeout(() => {resolve(null)}, getSpeed())
        })
        for(let j = i; j >= h; j = j - h) {
            //stop condition for pausing
            while (getStop()) {
                await new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(null);
                  }, 500);
                });
              }
              //stop condition for reset
              if (getOtherStop()) {
                return null;
              }
              if(i !== j) arr[j].div.style.backgroundColor = "blue";
              setSortableComponents(copyArr(arr));
            await new Promise((resolve, reject) => {
                setTimeout(() => {resolve(null)}, getSpeed())
            })
            if(arr[j].value < arr[j-h].value) {
                let temp : SortableComponent = arr[j];
                arr[j] = arr[j-h];
                arr[j-h] = temp;
                if(i === j) {
                    arr[j].div.style.backgroundColor = "black";
                    arr[j-h].div.style.backgroundColor = "blue";
                };
                setSortableComponents(copyArr(arr));
                await new Promise((resolve, reject) => {
                    setTimeout(() => {resolve(null)}, getSpeed())
                })
                if(i !== j) arr[j].div.style.backgroundColor = "red";
                setSortableComponents(copyArr(arr));
                await new Promise((resolve, reject) => {
                    setTimeout(() => {resolve(null)}, getSpeed())
                })
            } else {
                arr[j].div.style.backgroundColor = "red";
                setSortableComponents(copyArr(arr));
                break;
            }
            arr[0].div.style.backgroundColor = "red";
            setSortableComponents(copyArr(arr));
        }
        arr[i].div.style.backgroundColor = "red";
        setSortableComponents(copyArr(arr));
    }
    h = Math.floor(h/3);
}
    return copyArr(arr);
}