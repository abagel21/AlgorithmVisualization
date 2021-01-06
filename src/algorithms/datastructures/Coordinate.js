/* eslint-disable */
export default class Coordinate {
    constructor(col, height, prev, weight, dist) {
        this.col = col;
        this.height = height;
        this.prev = prev || null;
        this.weight = weight || 0;
        this.dist = dist || 0;
    }
    compare(val) {
        return (this.weight + this.dist) - (val.weight + val.dist);
    }
    hash() {
        return Math.floor((this.col + this.height) * (this.col + this.height + 1) / 2 + this.height);
    }
    equals(o) {
        return o.col == this.col && o.height == this.height;
    }
}
