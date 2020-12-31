export default class Queue<M> {
    root: Node<M>|null|undefined;
    last: Node<M>|null|undefined;
    constructor() {
        this.root = null;
        this.last = null;
    }
    enqueue(val:M) {
        if(this.last == null) {
            this.root = new Node(val)
            this.last = this.root;
        } else {
            let temp = new Node(val);
            this.last.next = temp;
            this.last = temp;
        }
    }
    pop():M {
        if(this.isEmpty()) throw new Error();
        let val:any = this.root?.val;
        this.root = this.root?.next;
        return val;
    }
    isEmpty():boolean {
        return this.root == null;
    }
}
class Node<T> {
    val: T;
    next: Node<T>|null = null;
    constructor(val:T) {
        this.val = val;
    }
}