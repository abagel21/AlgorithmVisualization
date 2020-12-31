export default class Queue {
    constructor() {
        this.root = null;
        this.last = null;
    }
    enqueue(val) {
        if (this.last == null) {
            this.root = new Node(val);
            this.last = this.root;
        }
        else {
            let temp = new Node(val);
            this.last.next = temp;
            this.last = temp;
        }
    }
    pop() {
        if (this.isEmpty())
            throw new Error();
        let val = this.root?.val;
        this.root = this.root?.next;
        return val;
    }
    isEmpty() {
        return this.root == null;
    }
}
class Node {
    constructor(val) {
        this.next = null;
        this.val = val;
    }
}
