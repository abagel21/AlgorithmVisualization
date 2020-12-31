import HexMap from "../../util/HexMap"
import Queue from "../datastructures/Queue"
import Coordinate from "../datastructures/Coordinate"
function BreadthFirst(hexes:HexMap, startCol:number, startHeight:number):Coordinate|null {
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    let root:Coordinate = new Coordinate(startCol, startHeight);
    q.enqueue(root);
    while(!q.isEmpty()) {
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -100) return node;
        if(hexInfo < 0 || hexInfo == 1) continue;
        hexes.contents[col][height] = 1;
        let hex:Element = document.querySelector(`.hex-${col}-${height}`)!;
        hex.classList.add("visited");
        q.enqueue(new Coordinate(col, height + 2));
        q.enqueue(new Coordinate(col + 1, height + 1));
        q.enqueue(new Coordinate(col - 1, height + 1));
        q.enqueue(new Coordinate(col-1, height - 1));
        q.enqueue(new Coordinate(col+1, height - 1));
        q.enqueue(new Coordinate(col, height - 2));
    }
    return null;
}