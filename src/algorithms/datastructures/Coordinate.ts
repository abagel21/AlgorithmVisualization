import Comparable from "./Comparable"
/* eslint-disable */
export default class Coordinate implements Comparable {
    col:number;
    height:number;
    prev:Coordinate|null;
    weight:number;
    dist:number;
    constructor(col:number, height:number, prev?:Coordinate|null, weight?:number, dist?:number) {
        this.col = col;
        this.height = height;
        this.prev = prev || null;
        this.weight = weight || 0;
        this.dist = dist || 0;
    }
    compare(val:Coordinate) {
        return (this.weight + this.dist) - (val.weight + val.dist);
    }
}