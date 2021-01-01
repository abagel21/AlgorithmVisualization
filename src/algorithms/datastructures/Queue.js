export default class Queue {
    constructor() {
        this.length = 0;
        this.root = null;
        this.last = null;
    }
    enqueue(val) {
        if (this.length == 0) {
            this.root = new Node(val);
            this.last = this.root;
        }
        else {
            let temp = new Node(val);
            this.last.next = temp;
            this.last = temp;
        }
        this.length++;
    }
    pop() {
        if (this.isEmpty())
            throw new Error();
        let val = this.root?.val;
        this.root = this.root?.next;
        this.length--;
        return val;
    }
    isEmpty() {
        return this.length == 0;
    }
}
class Node {
    constructor(val) {
        this.next = null;
        this.val = val;
    }
}
