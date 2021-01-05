/* eslint-disable */
// Minimum priority queue
export default class PriorityQueue {
    constructor() {
        this.lastIndex = 0;
        this.arr = [];
    }
    push(val) {
        if (this.arr.length == this.lastIndex) {
            this.arr.push(val);
        }
        else {
            this.arr[this.lastIndex] = val;
        }
        this.swim(this.lastIndex);
        this.lastIndex++;
    }
    pop() {
        let temp = this.arr[0];
        this.arr[0] = this.arr[this.lastIndex - 1];
        this.sink(0);
        this.lastIndex--;
        return temp;
    }
    sink(i) {
        //if i is greater than the lower node on the tree, swap
        while (2 * i + 1 < this.lastIndex) {
            let j = 2 * i + 1;
            if (j + 1 < this.lastIndex && this.arr[j].compare(this.arr[j + 1]) > 0)
                j++;
            if (this.arr[i].compare(this.arr[j]) > 0) {
                let temp = this.arr[i];
                this.arr[i] = this.arr[j];
                this.arr[j] = temp;
                i = j;
            }
            else {
                break;
            }
        }
    }
    swim(i) {
        //if arr[i] is less than the higher node on the tree, swap
        while (i > 0 && this.arr[i].compare(this.arr[Math.floor((i - 1) / 2)]) < 0) {
            let j = Math.floor((i - 1) / 2);
            let temp = this.arr[i];
            this.arr[i] = this.arr[j];
            this.arr[j] = temp;
            i = j;
        }
    }
    isEmpty() {
        return this.lastIndex == 0;
    }
    isHeap(i, n) {
        // If a leaf node
        if (i > (n - 2) / 2) {
            return true;
        }
        // If an internal node and is greater than its children, and
        // same is recursively true for the children
        if (this.arr[i] >= this.arr[2 * i + 1] &&
            this.arr[i] >= this.arr[2 * i + 2] &&
            this.isHeap(2 * i + 1, n) &&
            this.isHeap(2 * i + 2, n)) {
            return true;
        }
        return false;
    }
}
