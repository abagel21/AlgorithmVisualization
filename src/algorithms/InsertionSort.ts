import _ from 'lodash';
import SortableComponent from '../util/SortableComponent';
import copyArr from "../util/copyArr";
export default async function InsertionSort(arr : SortableComponent[], setSortableComponents : any, getStop : any, getSpeed: any,
    getOtherStop: any) {
    for(let i = 0; i < arr.length; i++) {
        arr[i].div.style.backgroundColor = "black";
        await new Promise((resolve, reject) => {
            setTimeout(() => {resolve(null)}, getSpeed())
        })
        for(let j = i; j > 0; j--) {
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
            await new Promise((resolve, reject) => {
                setTimeout(() => {resolve(null)}, getSpeed())
            })
            if(arr[j].value < arr[j-1].value) {
                let temp : SortableComponent = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
                if(i === j) {
                    arr[j].div.style.backgroundColor = "black";
                    arr[j-1].div.style.backgroundColor = "blue";
                };
                setSortableComponents(copyArr(arr));
                await new Promise((resolve, reject) => {
                    setTimeout(() => {resolve(null)}, getSpeed())
                })
                if(i !== j) arr[j].div.style.backgroundColor = "red";
                await new Promise((resolve, reject) => {
                    setTimeout(() => {resolve(null)}, getSpeed())
                })
            } else {
                arr[j].div.style.backgroundColor = "red";
                break;
            }
            arr[0].div.style.backgroundColor = "red";
        }
        arr[i].div.style.backgroundColor = "red";
    }
    return copyArr(arr);
}