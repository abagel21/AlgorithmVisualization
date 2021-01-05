import HexMap from "./HexMap"
import Queue from "../algorithms/datastructures/Queue"
import Coordinate from "../algorithms/datastructures/Coordinate"
import checkForStop from "./checkForStop";
import speedBlock from "./speedBlock";
/* eslint-disable */
export async function clearAll(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs clearAll called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    let root:Coordinate = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited:number[][] = [];
    for(let i = 0; i < hexes.contents.length; i++) {
            let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () {return 0;});
            visited.push(temparr);
    }
    while(!q.isEmpty()) {
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -2 || visited[col][height] == 1) continue;
        if(hexInfo != 100 && hexInfo != -100) {
            console.log(hexInfo);
            hexes.contents[col][height] = 0;
        }
        visited[col][height] = 1;
        let hex:Element = document.querySelector(`.hex-${col}-${height}`)!;
        if(hexInfo != 100) hex.classList.remove("visited_hex");
        if(hex.classList.contains("shortestPath")) hex.classList.remove("shortestPath")
        if(hex.children[0].classList.contains("wall")) hex.children[0].classList.remove("wall")
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
    return root;
}

export async function clearAlgorithm(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs clearAlgorithm called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    let root:Coordinate = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited:number[][] = [];
    for(let i = 0; i < hexes.contents.length; i++) {
            let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () {return 0;});
            visited.push(temparr);
    }
    while(!q.isEmpty()) {
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -2 || visited[col][height] == 1) continue;
        let hex:Element = document.querySelector(`.hex-${col}-${height}`)!;
        let innerHex:HTMLDivElement = hex.children[0]! as HTMLDivElement;
        if(hexInfo == 1) {
            hexes.contents[col][height] = 0;
            hex.classList.remove("visited_hex");
            if(hex.classList.contains("shortestPath")) hex.classList.remove("shortestPath")
            if(innerHex.style.opacity = "0.5") innerHex.style.opacity = "1";
        }
        visited[col][height] = 1;
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
    return root;
}

export async function clearWeights(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs clearAlgorithm called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    let root:Coordinate = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited:number[][] = [];
    for(let i = 0; i < hexes.contents.length; i++) {
            let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () {return 0;});
            visited.push(temparr);
    }
    while(!q.isEmpty()) {
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -2 || visited[col][height] == 1) continue;
        let hex:HTMLDivElement = document.querySelector(`.hex-${col}-${height}`)! as HTMLDivElement;
        let innerHex:HTMLDivElement = hex.children[0]! as HTMLDivElement;
        if(hexInfo > 1 && hexInfo != 1000 && hexInfo != -1000) {
            hexes.contents[col][height] = 0;
            innerHex.style.backgroundColor = "transparent";
        }
        visited[col][height] = 1;
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
    return root;
}