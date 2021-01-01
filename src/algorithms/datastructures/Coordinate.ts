export default class Coordinate {
    col:number;
    height:number;
    prev:Coordinate|null;
    constructor(col:number, height:number, prev:Coordinate|null) {
        this.col = col;
        this.height = height;
        this.prev = prev;
    }
}