import Queue from "../datastructures/Queue";
import Coordinate from "../datastructures/Coordinate";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function BreadthFirst(hexes, startCol, startHeight) {
    console.log("bfs called");
    let q = new Queue();
    let root = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    while (!q.isEmpty()) {
        if (await checkForStop("Graphing"))
            return null;
        let node = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height);
        if (hexInfo == -1000) {
            root = node;
            break;
        }
        if (hexInfo < 0 || hexInfo == 1)
            continue;
        hexes.contents[col][height] = 1;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        if (await checkForStop("Graphing"))
            return null;
        if (!hex.classList.contains("start"))
            hex.classList.add("visited_hex");
        if (col % 2 == 0) {
            q.enqueue(new Coordinate(col, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height, node));
            q.enqueue(new Coordinate(col + 1, height + 1, node));
            q.enqueue(new Coordinate(col, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height, node));
        }
        else {
            q.enqueue(new Coordinate(col, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height - 1, node));
            q.enqueue(new Coordinate(col + 1, height, node));
            q.enqueue(new Coordinate(col, height + 1, node));
            q.enqueue(new Coordinate(col - 1, height, node));
            q.enqueue(new Coordinate(col - 1, height - 1, node));
        }
        await speedBlock("Graph");
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, 250);
    });
    root = root.prev;
    if (root == null)
        return;
    while (root.prev != null) {
        let col = root.col;
        let height = root.height;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        hex.classList.add("shortestPath");
        root = root.prev;
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}
