import HexMap from "../../util/HexMap"
import Queue from "../datastructures/Queue"
import Coordinate from "../datastructures/Coordinate"
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
export default async function BreadthFirst(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    // let startRow = hexes.convertToRow(startCol, startHeight);
    let root:Coordinate = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    while(!q.isEmpty()) {
        await checkForStop("Graphing");
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
        if(hexInfo != 100) hex.classList.add("visited_hex");
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
        await speedBlock("Graph")
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(null);
    }, 250)});
    while(root.prev != null) {
        let col:number = root.col;
        let height:number = root.height;
        let hex:Element|null = document.querySelector(`.hex-${col}-${height}`);
        hex!.classList.add("shortestPath")
        root = root.prev;
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}