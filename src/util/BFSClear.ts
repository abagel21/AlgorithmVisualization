import HexMap from "./HexMap"
import Queue from "../algorithms/datastructures/Queue"
import Coordinate from "../algorithms/datastructures/Coordinate"
import checkForStop from "./checkForStop";
import speedBlock from "./speedBlock";
export default async function BreadthFirst(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    // let startRow = hexes.convertToRow(startCol, startHeight);
    let root:Coordinate = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    while(!q.isEmpty()) {
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -100){
            root = node;
            break;
        }
        if(hexInfo < 0 || hexInfo == 1) continue;
        hexes.contents[col][height] = 1;
        let hex:Element = document.querySelector(`.hex-${col}-${height}`)!;
        if(hexInfo != 100) hex.classList.remove("visited_hex");
        if(col%2 == 0) {
            q.enqueue(new Coordinate(col, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height, node));
            q.enqueue(new Coordinate(col + 1, height + 1, node));
            q.enqueue(new Coordinate(col, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height, node));
        } else {
            q.enqueue(new Coordinate(col, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height, node));
            q.enqueue(new Coordinate(col, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height, node));
            q.enqueue(new Coordinate(col - 1, height - 1, node));
        }
    }
    while(root.prev != null) {
        let col:number = root.col;
        let height:number = root.height;
        let hex:Element|null = document.querySelector(`.hex-${col}-${height}`);
        hex!.classList.remove("shortestPath")
        root = root.prev;
    }
    return root;
}