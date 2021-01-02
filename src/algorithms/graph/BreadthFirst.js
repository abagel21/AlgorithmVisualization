import Queue from "../datastructures/Queue";
import Coordinate from "../datastructures/Coordinate";
import speedBlock from "../../util/speedBlock";
import checkForStop from "../../util/checkForStop"
export default async function BreadthFirst(hexes, startCol, startHeight) {
    console.log("bfs called");
    let q = new Queue();
    // let startRow = hexes.convertToRow(startCol, startHeight);
    let root = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    while (!q.isEmpty()) {
        await checkForStop("Graphing");
        let node = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height);
        if (hexInfo == -100) {
            root = node;
            break;
        }
        if (hexInfo < 0 || hexInfo == 1)
            continue;
        hexes.contents[col][height] = 1;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        if (hexInfo != 100)
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
        }, 500);
    });
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
