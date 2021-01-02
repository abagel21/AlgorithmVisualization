export default class Queue {
    constructor() {
        this.length = 0;
        this.root = null;
    }
    push(val) {
        if (this.length == 0) {
            this.root = new Node(val);
        }
        else {
            let temp = this.root;
            this.root = new Node(val);
            this.root.prev = temp;
        }
        this.length++;
    }
    pop() {
        if (this.isEmpty())
            throw new Error();
        let val = this.root?.val;
        this.root = this.root?.prev;
        this.length--;
        return val;
    }
    isEmpty() {
        return this.length == 0;
    }
}
class Node {
    constructor(val) {
        this.prev = null;
        this.val = val;
    }
}
