import HexMap from "../../util/HexMap"
import PriorityQueue from "../datastructures/PriorityQueue"
import Coordinate from "../datastructures/Coordinate"
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function AStar(hexes:HexMap, startCol:number, startHeight:number, goal:Coordinate):Promise<Coordinate|null> {
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
        if(hexInfo != 1000) hex.classList.add("visited_hex");
        if(col%2 == 0) {
            q.push(new Coordinate(col, height - 1, node, node.weight + hexInfo/10, calculateDistance(goal,col, height - 1)));
            q.push(new Coordinate(col + 1, height, node, node.weight + hexInfo/10, calculateDistance(goal,col + 1, height)));
            q.push(new Coordinate(col + 1, height + 1, node, node.weight + hexInfo/10, calculateDistance(goal,col + 1, height + 1)));
            q.push(new Coordinate(col, height + 1, node, node.weight + hexInfo/10, calculateDistance(goal,col, height + 1)));
            q.push(new Coordinate(col - 1, height + 1, node, node.weight + hexInfo/10, calculateDistance(goal,col - 1, height + 1)));
            q.push(new Coordinate(col - 1, height, node, node.weight + hexInfo/10, calculateDistance(goal,col - 1, height)));
        } else {
            q.push(new Coordinate(col, height - 1, node, node.weight + hexInfo/10, calculateDistance(goal, col, height - 1)));
            q.push(new Coordinate(col + 1, height - 1, node, node.weight + hexInfo/10, calculateDistance(goal, col + 1, height - 1)));
            q.push(new Coordinate(col + 1, height, node, node.weight + hexInfo/10, calculateDistance(goal, col + 1, height)));
            q.push(new Coordinate(col, height + 1, node, node.weight + hexInfo/10, calculateDistance(goal, col, height + 1)));
            q.push(new Coordinate(col - 1, height, node, node.weight + hexInfo/10, calculateDistance(goal, col - 1, height)));
            q.push(new Coordinate(col - 1, height - 1, node, node.weight + hexInfo/10, calculateDistance(goal, col - 1, height - 1)));
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

function calculateDistance(goal:Coordinate, nextCol:number, nextHeight:number) {
    let x = goal.col - nextCol;
    let y = goal.height - nextHeight;
    if(x%2 != 0) {
        y = y + (x + 1)/2;
    } else {
        y = y + x / 2
    }
    y = (y + x)/2;
    if(Math.sign(x)==Math.sign(y)) {
        return Math.abs(x + y);
    } else {
        return Math.max(Math.abs(x), Math.abs(y));
    }
}