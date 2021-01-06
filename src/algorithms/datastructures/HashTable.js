export default class HashTable {
    constructor(initNumBuckets) {
        this.MAX_LOAD_FACTOR = 0.75;
        this.buckets = null;
        this.size = 0;
        this.resize(initNumBuckets);
    }
    hash(o) {
        let h = o.hash();
        let x1 = -1640531527 * h;
        let x2 = -7099797528 * h;
        // mixes the two products, gets top top 44 bits
        // remove the sign bit
        return ((x1 ^ x2) >>> 20) >>> 1;
    }
    getSize() {
        return this.size;
    }
    bucket(hash) {
        return hash % this.buckets.length;
    }
    loadFactor() {
        return this.size / this.buckets.length;
    }
    getBuckets() {
        return this.buckets.length;
    }
    resize(newSize) {
        let arr = Array.apply(null, Array(newSize)).map(function () { return null; });
        // if called from constructor, buckets will be null
        if (this.buckets != null) {
            // go through all entries
            this.buckets.forEach(bucket => {
                // go through the linked list
                while (bucket != null) {
                    // calculate new bucket for entry and add it
                    let newBucketIndex = bucket.hash % newSize;
                    arr[newBucketIndex] = new Node(bucket.hash, bucket.key, bucket.value, arr[newBucketIndex]);
                    bucket = bucket.next;
                }
            });
        }
        this.buckets = arr;
    }
    isEmpty() {
        return this.size == 0;
    }
    fastValueEquals(value1, value2) {
        return value1 == value2 || value1.equals(value2);
    }
    fastKeyEquals(key, hash, node) {
        return node.hash == hash && (key == node.key || key.equals(node.key));
    }
    containsKey(key) {
        return this.get(key) != null;
    }
    get(key) {
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
    put(key, value) {
        let hash = this.hash(key);
        let bucket = this.bucket(hash);
        let n = this.buckets[bucket];
        this.size++;
        while (n != null) {
            if (this.fastKeyEquals(key, hash, n)) {
                n.value = value;
            }
            n = n.next;
        }
        // create a new node at the beginning of the bucket
        this.buckets[bucket] = new Node(hash, key, value, this.buckets[bucket]);
        // resize with two times the current number of buckets if needed
        if (this.loadFactor() > this.MAX_LOAD_FACTOR)
            this.resize(2 * this.buckets.length);
    }
    clear() {
        for (let i = 0; i < this.buckets.length; i++)
            this.buckets[i] = null;
        this.size = 0;
    }
}
class Node {
    constructor(hash, key, value, next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
