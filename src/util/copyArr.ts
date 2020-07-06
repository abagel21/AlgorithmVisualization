import SortableComponent from "./SortableComponent";

export default function copyArr<T>(arr: SortableComponent[]) : SortableComponent[] {
    const newArr : SortableComponent[] = [];
    for(let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i];
    }
    return newArr;
}