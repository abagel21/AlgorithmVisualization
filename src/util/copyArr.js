export default function copyArr(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i];
    }
    return newArr;
}
