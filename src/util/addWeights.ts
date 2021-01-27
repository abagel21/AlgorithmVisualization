import HexMap from "./HexMap"
import Queue from "../algorithms/datastructures/Queue"
import Coordinate from "../algorithms/datastructures/Coordinate"
import checkForStop from "./checkForStop";
import speedBlock from "./speedBlock";
/* eslint-disable */
export default async function addWeights(hexes:HexMap, startCol:number, startHeight:number):Promise<Coordinate|null> {
    console.log("bfs called");
    let q:Queue<Coordinate> = new Queue<Coordinate>();
    let root:Coordinate|null = new Coordinate(startCol, startHeight, null);
    let visited:number[][] = [];
    for(let i = 0; i < hexes.contents.length; i++) {
            let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () {return 0;});
            visited.push(temparr);
    }
    q.enqueue(root);
    while(!q.isEmpty()) {
        if(await checkForStop("Graphing")) return null;
        let node:Coordinate = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height)
        if(hexInfo == -2 || visited[col][height] == 1) continue;
        visited[col][height] = 1;
        if(hexInfo != 1000 && hexInfo != -1000) {
            // select random weight
            let weight = Math.floor(Math.random() * 11) * 10;
            hexes.contents[col][height] = weight;
            let hex:HTMLDivElement = document.querySelector(`.hex-${col}-${height}`)! as HTMLDivElement;
            let innerHex:HTMLDivElement = hex.childNodes[0] as HTMLDivElement;
            innerHex.style.opacity= "1";
            if(hexes.contents[col][height] > 0)
                innerHex.style.backgroundColor = `rgba(194,12,12,${(hexes.contents[col][height]/200 + .5)})`
        }
        if (await checkForStop("Graphing")) return null;
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
}