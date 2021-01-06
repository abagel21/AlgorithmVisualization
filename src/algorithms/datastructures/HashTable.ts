import Hashable from "./Hashable";
/* eslint-disable */
export default class HashTable<K extends Hashable, V>{
    MAX_LOAD_FACTOR:number = 0.75;
    buckets:Node<K, V>[] = null;
    size:number = 0;

    constructor(initNumBuckets:number) {
        this.resize(initNumBuckets);
    }

    hash(o:K):number {
        let h = o.hash();
        let x1 = -1640531527 * h;
        let x2 = -7099797528 * h;
        // mixes the two products, gets top top 44 bits
        // remove the sign bit
        return ((x1 ^ x2) >>> 20) >>> 1;
    }

    getSize():number {
        return this.size;
    }

    bucket(hash:number):number {
        return hash % this.buckets.length;
    }

    loadFactor():number {
        return this.size / this.buckets.length;
    }

    getBuckets():number {
        return this.buckets.length;
    }

    resize(newSize:number):void {
        let arr:Node<K,V>[] = Array.apply(null, Array(newSize)).map(function () {return null;});
        // if called from constructor, buckets will be null
        if (this.buckets != null) {
            // go through all entries
            this.buckets.forEach(bucket => {
                // go through the linked list
                while (bucket != null) {
                    // calculate new bucket for entry and add it
                    let newBucketIndex = bucket.hash % newSize;
                    arr[newBucketIndex] = new Node<K, V>(bucket.hash, bucket.key, bucket.value, arr[newBucketIndex]);

                    bucket = bucket.next;
                }
            })
        }
        this.buckets = arr;
    }

    isEmpty():boolean {
        return this.size == 0;
    }

    fastValueEquals(value1:K, value2:K):boolean {
        return value1 == value2 || value1.equals(value2);
    }

    fastKeyEquals(key:K, hash:number, node:Node<K, V>):boolean {
        return node.hash == hash && (key == node.key || key.equals(node.key));
    }

    containsKey(key:K):boolean {
        return this.get(key) != null;
    }

    get(key:K):V {
        let hash = this.hash(key);
        let bucket = this.bucket(hash);
        // cursor node
        var n = this.buckets[bucket];
        // navigate through list until we find the key
        while (n != null) {
            if (this.fastKeyEquals(key, hash, n))
                return n.value;
            n = n.next;
        }
        return null;
    }

    put(key:K, value:V):void {
        let hash = this.hash(key);
        let bucket = this.bucket(hash);
        let n = this.buckets[bucket]
        this.size++;
        while(n!=null) {
            if (this.fastKeyEquals(key, hash, n)) {
                n.value = value;
            }
            n = n.next;
        }
        // create a new node at the beginning of the bucket
        this.buckets[bucket] = new Node<K,V>(hash, key, value, this.buckets[bucket]);

        // resize with two times the current number of buckets if needed
        if (this.loadFactor() > this.MAX_LOAD_FACTOR)
            this.resize(2 * this.buckets.length);
    }

    clear():void {
        for (let i = 0; i < this.buckets.length; i++)
            this.buckets[i] = null;
        this.size = 0;
    }

}

class Node<K, V> {
        hash:number;
        key:K;
        value:V;
        next:Node<K, V>;

        constructor(hash:number, key:K, value:V, next:Node<K, V>) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }
}