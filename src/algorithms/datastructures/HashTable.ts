
export default class HashTable<K, V>{
    // MAX_LOAD_FACTOR:number = 0.75;
    // buckets:Node<K, V>[] = [];
    // size:number;

    // constructor(initNumBuckets:number) {
    //     this.resize(initNumBuckets);
    // }

    // hash(o:K):number {
    //     let h = o.hash();
    //     let x1 = -1640531527 * h;
    //     let x2 = -7099797528 * h;
    //     // mixes the two products, gets top top 44 bits
    //     // remove the sign bit
    //     return (int) ((x1 ^ x2) >>> 20) >>> 1;
    // }

    // size():number {
    //     return this.size;
    // }

    // bucket(hash:number):number {
    //     return hash % this.buckets.length;
    // }

    // loadFactor():number {
    //     return this.size / this.buckets.length;
    // }

    // buckets():number {
    //     return this.buckets.length;
    // }

    // resize(int newSize):number {
    //     var arr = (Node<K, V>[]) new Node[newSize];
    //     // if called from constructor, buckets will be null
    //     if (buckets != null) {
    //         // go through all entries
    //         for (var bucket : buckets) {
    //             // go through the linked list
    //             while (bucket != null) {
    //                 // calculate new bucket for entry and add it
    //                 int newBucketIndex = bucket.hash % newSize;
    //                 arr[newBucketIndex] = new Node<>(bucket, arr[newBucketIndex]);

    //                 bucket = bucket.next;
    //             }
    //         }
    //     }
    //     buckets = arr;
    // }

    // isEmpty():boolean {
    //     return this.size == 0;
    // }

    // private boolean fastValueEquals(Object value1, Object value2) {
    //     return value1 == value2 || value1.equals(value2);
    // }

    // private boolean fastKeyEquals(Object key, int hash, Node<K, V> node) {
    //     return node.hash == hash && (key == node.key || key.equals(node.key));
    // }

    // public boolean containsKey(Object key) {
    //     return get(key) != null;
    // }

    // public boolean containsValue(Object value) {
    //     if (value == null)
    //         throw new NullPointerException();
    //     // goes through all entries to find value
    //     for (var n : buckets) {
    //         while (n != null) {
    //             if (fastValueEquals(n.value, value))
    //                 return true;
    //             n = n.next;
    //         }
    //     }
    //     return false;
    // }

    // public V get(Object key) {
    //     int hash = hash(key);
    //     int bucket = bucket(hash);
    //     // cursor node
    //     var n = buckets[bucket];
    //     // navigate through list until we find the key
    //     while (n != null) {
    //         if (fastKeyEquals(key, hash, n))
    //             return n.value;
    //         n = n.next;
    //     }
    //     return null;
    // }

    // public V put(K key, V value) {
    //     int hash = hash(key);
    //     if (value == null)
    //         throw new NullPointerException("value is null");
    //     int bucket = bucket(hash);
    //     // remove the key
    //     var prev = remove(key, hash, bucket);
    //     size++;
    //     // create a new node at the beginning of the bucket
    //     buckets[bucket] = new Node<>(hash, key, value, buckets[bucket]);

    //     // resize with two times the current number of buckets if needed
    //     if (loadFactor() > MAX_LOAD_FACTOR)
    //         resize(2 * buckets.length);

    //     return prev;
    // }

    // clear():void {
    //     for (let i = 0; i < this.buckets.length; i++)
    //         this.buckets[i] = null;
    //     this.size = 0;
    // }


    // /**
    //  * A simple implementation of a node in a linked list. Node stores the key, value, and the next
    //  * Node. In addition, Node caches the hash of a key.
    //  *
    //  * @param <K> Key type
    //  * @param <V> Value type
    //  */
    // private static class Node<K, V> {
    //     /**
    //      * Cached hash code of {@link #key}.
    //      */
    //     int hash;

    //     K key;
    //     V value;

    //     /**
    //      * The next node in this linked list.
    //      */
    //     Node<K, V> next;

    //     /**
    //      * Constructor: copies the hash, key, and value from the given node and takes a next node.
    //      *
    //      * @param old  The old node
    //      * @param next The next node
    //      */
    //     public Node(Node<K, V> old, Node<K, V> next) {
    //         this(old.hash, old.key, old.value, next);
    //     }

    //     /**
    //      * Constructor: creates and inserts a node before the given next node with the given hash,
    //      * key, and value.
    //      *
    //      * @param hash  The hash of the key. Precondition: hash is the hash code of the key
    //      * @param key   The key
    //      * @param value The value
    //      * @param next  The next node
    //      */
    //     public Node(int hash, K key, V value, Node<K, V> next) {
    //         this.hash = hash;
    //         this.key = key;
    //         this.value = value;
    //         this.next = next;
    //     }
    // }

    // /**
    //  * Calculates and returns an approximate clustering constant.
    //  *
    //  * @return The approximate clustering constant
    //  */
    // public double clustering() {
    //     if (size <= 1)
    //         return 1;
    //     // m = number of buckets, n = number of elements
    //     int m = 0;
    //     int n = 0;
    //     double sum = 0; // sum of length squared of buckets
    //     for (var b : buckets) {
    //         m++;
    //         // iterate through list, counting # of elements
    //         int l = 0;
    //         while (b != null) {
    //             l++;
    //             b = b.next;
    //         }
    //         n += l;
    //         sum += l * l;
    //         if (n > 1500) // stop at 1500 elements
    //             break;
    //     }
    //     sum /= n;
    //     return (double) m / (n - 1) * (sum - 1);
    // }

}
