import HexMap from "./HexMap"
import Queue from "../algorithms/datastructures/Queue"
import Coordinate from "../algorithms/datastructures/Coordinate"
import checkForStop from "./checkForStop";
import speedBlock from "./speedBlock";
/* eslint-disable */
export async function clearAll(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
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
        visited[col][height] = 1;
        let hex:HTMLDivElement = document.querySelector(`.hex-${col}-${height}`)! as HTMLDivElement;
        if(hexInfo != 1000 && hexInfo != -1000 && !hex.classList.contains("start") && !hex.classList.contains("target")) {
            hexes.contents[col][height] = 0;
        }
        let innerHex:HTMLDivElement = hex.children[0]! as HTMLDivElement;
        if(hexInfo != 1000) hex.classList.remove("visited_hex");
        if(hex.classList.contains("shortestPath")) hex.classList.remove("shortestPath")
        if(innerHex.classList.contains("wall")) hex.children[0].classList.remove("wall")
        innerHex.style.opacity = "0";
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
            // if(innerHex.style.opacity == "1") innerHex.style.opacity = "0";
            if (innerHex.style.backgroundColor != "transparent") {
                let num:string|string[] = innerHex.style.backgroundColor.split(",")[3]
                let weight = 0;
                if (num != null) {
                    num = num.trim().split(".")[1].split("")
                    if (num.length > 2) {
                        num = num[0] + num[1]
                        weight = (parseInt(num) - 50) / 100 * 200
                        console.log(weight)
                    } else {
                        num = num[0]
                        weight = (parseInt(num) - 5) / 10 * 200
                        console.log(weight)
                    }
                }
                hexes.contents[col][height] = weight;
            }
            
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
        innerHex.style.opacity = "0";
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