import PriorityQueue from "../datastructures/PriorityQueue";
import Coordinate from "../datastructures/Coordinate";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function AStar(hexes, startCol, startHeight, goal) {
    console.log("bfs called");
    let q = new PriorityQueue();
    let root = new Coordinate(startCol, startHeight, null);
    q.push(root);
    while (!q.isEmpty()) {
        await checkForStop("Graphing");
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
        if (hexInfo != 1000)
            hex.classList.add("visited_hex");
        if (col % 2 == 0) {
            q.push(new Coordinate(col, height - 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col, height - 1)));
            q.push(new Coordinate(col + 1, height, node, node.weight +hexInfo / 10, calculateDistance(goal, col + 1, height)));
            q.push(new Coordinate(col + 1, height + 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col + 1, height + 1)));
            q.push(new Coordinate(col, height + 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col, height + 1)));
            q.push(new Coordinate(col - 1, height + 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col - 1, height + 1)));
            q.push(new Coordinate(col - 1, height, node, node.weight +hexInfo / 10, calculateDistance(goal, col - 1, height)));
        }
        else {
            q.push(new Coordinate(col, height - 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col, height - 1)));
            q.push(new Coordinate(col + 1, height - 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col + 1, height - 1)));
            q.push(new Coordinate(col + 1, height, node, node.weight +hexInfo / 10, calculateDistance(goal, col + 1, height)));
            q.push(new Coordinate(col, height + 1, node, node.weight +hexInfo / 10, calculateDistance(goal, col, height + 1)));
            q.push(new Coordinate(col - 1, height, node, node.weight +hexInfo / 10, calculateDistance(goal, col - 1, height)));
            q.push(new Coordinate(col - 1, height - 1, node, node.weigh +hexInfo / 10, calculateDistance(goal, col - 1, height - 1)));
        }
        await speedBlock("Graph");
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, 250);
    });
    root = root.prev;
    while (root.prev != null) {
        let col = root.col;
        let height = root.height;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = hex.children[0];
        hex.classList.add("shortestPath");
        if (innerHex.style.opacity == "1") {
            innerHex.style.opacity = ".5";
        }
        root = root.prev;
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}
function calculateDistance(goal, nextCol, nextHeight) {
    let x = goal.col - nextCol;
    let y = goal.height - nextHeight;
    if(x%2 != 0) {
        y = y + (x + 1)/2;
    } else {
        y = y + x / 2
    }
    if (Math.sign(x) == Math.sign(y)) {
        return Math.abs(x + y);
    }
    else {
        return Math.max(Math.abs(x), Math.abs(y));
    }
}
