import HexMap from "../../util/HexMap"
import PriorityQueue from "../datastructures/PriorityQueue"
import Coordinate from "../datastructures/Coordinate"
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function Dijkstra(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs called");
    let q:PriorityQueue<Coordinate> = new PriorityQueue<Coordinate>();
    let root:Coordinate|null = new Coordinate(startCol, startHeight, null);
    q.push(root);
    while(!q.isEmpty()) {
        await checkForStop("Graphing");
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -1000){
            root = node;
            break;
        }
        if(hexInfo < 0 || hexInfo == 1) continue;
        hexes.contents[col][height] = 1;
        let hex:Element = document.querySelector(`.hex-${col}-${height}`)!;
        let innerHex:HTMLDivElement = hex!.children[0] as HTMLDivElement;
        if(hexInfo != 1000) hex.classList.add("visited_hex");
        if(innerHex.style.opacity == "1") {
            innerHex.style.opacity = ".5";
        }
        if(col%2 == 0) {
            // + hexInfo/100
            q.push(new Coordinate(col, height - 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col + 1, height, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col + 1, height + 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col, height + 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col - 1, height + 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col - 1, height, node, node.weight + 1+ hexInfo/10));
        } else {
            q.push(new Coordinate(col, height - 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col + 1, height - 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col + 1, height, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col, height + 1, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col - 1, height, node, node.weight + 1+ hexInfo/10));
            q.push(new Coordinate(col - 1, height - 1, node, node.weight + 1+ hexInfo/10));
        }
        await speedBlock("Graph")
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(null);
    }, 250)});
    root = root.prev;
    while(root!.prev != null) {
        let col:number = root!.col;
        let height:number = root!.height;
        let hex:HTMLDivElement = document.querySelector(`.hex-${col}-${height}`)! as HTMLDivElement;
        let innerHex:HTMLDivElement = hex.children[0] as HTMLDivElement;
        hex!.classList.add("shortestPath")
        if(innerHex.style.opacity == "1") {
            innerHex.style.opacity = ".5";
        }
        root = root!.prev;
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}