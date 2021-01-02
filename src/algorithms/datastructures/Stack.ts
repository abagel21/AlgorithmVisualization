export default class Queue<M> {
    root: Node<M>|null|undefined;
    length: number = 0;
    constructor() {
        this.root = null;
    }
    push(val:M) {
        if(this.length == 0) {
            this.root = new Node(val)
        } else {
            let temp:Node<M>|null|undefined = this.root;
            this.root = new Node(val);
            this.root.prev = temp;
        }
        this.length++;
    }
    pop():M {
        if(this.isEmpty()) throw new Error();
        let val:any = this.root?.val;
        this.root = this.root?.prev;
        this.length--;
        return val;
    }
    isEmpty():boolean {
        return this.length == 0;
    }
}
class Node<T> {
    val: T;
    prev: Node<T>|null|undefined = null;
    constructor(val:T) {
        this.val = val;
    }
}