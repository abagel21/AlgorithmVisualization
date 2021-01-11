import HexMap from "../../util/HexMap"
import Stack from "../datastructures/Stack"
import Coordinate from "../datastructures/Coordinate"
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function BreadthFirst(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs called");
    let q:Stack<Coordinate> = new Stack<Coordinate>();
    let root:Coordinate|null = new Coordinate(startCol, startHeight, null);
    q.push(root);
    while(!q.isEmpty()) {
        if (await checkForStop("Graphing")) return null;
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
        if (await checkForStop("Graphing")) return null;
        if(hexInfo != 1000 && !hex.classList.contains("start")) hex.classList.add("visited_hex");
        if(col%2 == 0) {
            q.push(new Coordinate(col, height - 1, node));
            q.push(new Coordinate(col + 1, height, node));
            q.push(new Coordinate(col + 1, height + 1, node));
            q.push(new Coordinate(col, height + 1, node));
            q.push(new Coordinate(col - 1, height + 1, node));
            q.push(new Coordinate(col - 1, height, node));
        } else {
            q.push(new Coordinate(col, height - 1, node));
            q.push(new Coordinate(col + 1, height - 1, node));
            q.push(new Coordinate(col + 1, height, node));
            q.push(new Coordinate(col, height + 1, node));
            q.push(new Coordinate(col - 1, height, node));
            q.push(new Coordinate(col - 1, height - 1, node));
        }
        await speedBlock("Graph")
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(null);
    }, 250)});
    root = root.prev;
    if(root == null) return;
    while(root!.prev != null) {
        let col:number = root!.col;
        let height:number = root!.height;
        let hex:Element|null = document.querySelector(`.hex-${col}-${height}`);
        hex!.classList.add("shortestPath")
        root = root!.prev;
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}