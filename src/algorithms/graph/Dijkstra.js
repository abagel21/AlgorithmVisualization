import PriorityQueue from "../datastructures/PriorityQueue";
import Coordinate from "../datastructures/Coordinate";
import HashTable from "../datastructures/HashTable";
import checkForStop from "../../util/checkForStop";
import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export default async function Dijkstra(hexes, startCol, startHeight) {
    let q = new PriorityQueue();
    let root = new Coordinate(startCol, startHeight, null);
    let weights = new HashTable(hexes.contents.length * hexes.contents[0].length);
    let prev = new HashTable(hexes.contents.length * hexes.contents[0].length);
    q.push(root);
    weights.put(root, 0);
    prev.put(root, null);
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
        let innerHex = hex.children[0];
        if (hexInfo != 1000)
            hex.classList.add("visited_hex");
        if (innerHex.style.opacity == "1") {
            // innerHex.style.opacity = "0";
            // hex.style.animationFillMode = "none";
        }
        if (col % 2 == 0) {
            let next = new Coordinate(col, height - 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col + 1, height, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col + 1, height + 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col, height + 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col - 1, height + 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col - 1, height, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
        }
        else {
            let next = new Coordinate(col, height - 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col + 1, height - 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col + 1, height, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col, height + 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col - 1, height, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
            next = new Coordinate(col - 1, height - 1, node, node.weight + 1 + hexInfo / 10);
            updatePath(next, node, weights, prev);
            q.push(next);
        }
        await speedBlock("Graph");
    }
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, 250);
    });
    root = prev.get(root);
    while (prev.containsKey(root)) {
        let col = root.col;
        let height = root.height;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = hex.children[0];
        hex.classList.add("shortestPath");
        // if(innerHex.style.opacity == "1") {
        //     innerHex.style.opacity = ".5";
        // }
        root = prev.get(root);
        await speedBlock("Graph");
        await speedBlock("Graph");
    }
    return root;
}
function updatePath(node, prev, weights, prevDict) {
    if (weights.containsKey(node)) {
        let weight = weights.get(node);
        if (node.weight < weight) {
            weights.put(node, node.weight);
            prevDict.put(node, prev);
        }
    }
    else {
        weights.put(node, node.weight);
        prevDict.put(node, prev);
    }
}
