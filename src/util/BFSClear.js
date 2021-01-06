import Queue from "../algorithms/datastructures/Queue";
import Coordinate from "../algorithms/datastructures/Coordinate";
/* eslint-disable */
export async function clearAll(hexes, startCol, startHeight) {
    console.log("bfs clearAll called");
    let q = new Queue();
    let root = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited = [];
    for (let i = 0; i < hexes.contents.length; i++) {
        let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () { return 0; });
        visited.push(temparr);
    }
    while (!q.isEmpty()) {
        let node = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height);
        if (hexInfo == -2 || visited[col][height] == 1)
            continue;
        if (hexInfo != 1000 && hexInfo != -1000) {
            console.log(hexInfo);
            hexes.contents[col][height] = 0;
        }
        visited[col][height] = 1;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = hex.children[0];
        if (hexInfo != 1000)
            hex.classList.remove("visited_hex");
        if (hex.classList.contains("shortestPath"))
            hex.classList.remove("shortestPath");
        if (innerHex.classList.contains("wall"))
            hex.children[0].classList.remove("wall");
        innerHex.style.opacity = "0";
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
    }
    return root;
}
export async function clearAlgorithm(hexes, startCol, startHeight) {
    console.log("bfs clearAlgorithm called");
    let q = new Queue();
    let root = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited = [];
    for (let i = 0; i < hexes.contents.length; i++) {
        let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () { return 0; });
        visited.push(temparr);
    }
    while (!q.isEmpty()) {
        let node = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height);
        if (hexInfo == -2 || visited[col][height] == 1)
            continue;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = hex.children[0];
        if (hexInfo == 1) {
            hexes.contents[col][height] = 0;
            hex.classList.remove("visited_hex");
            if (hex.classList.contains("shortestPath"))
                hex.classList.remove("shortestPath");
            // if(innerHex.style.opacity == "1") innerHex.style.opacity = "0";
        }
        visited[col][height] = 1;
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
    }
    return root;
}
export async function clearWeights(hexes, startCol, startHeight) {
    console.log("bfs clearAlgorithm called");
    let q = new Queue();
    let root = new Coordinate(startCol, startHeight, null);
    q.enqueue(root);
    let visited = [];
    for (let i = 0; i < hexes.contents.length; i++) {
        let temparr = Array.apply(0, Array(hexes.contents[0].length)).map(function () { return 0; });
        visited.push(temparr);
    }
    while (!q.isEmpty()) {
        let node = q.pop();
        let col = node.col;
        let height = node.height;
        let hexInfo = hexes.hexInfo(col, height);
        if (hexInfo == -2 || visited[col][height] == 1)
            continue;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = hex.children[0];
        if (hexInfo > 1 && hexInfo != 1000 && hexInfo != -1000) {
            hexes.contents[col][height] = 0;
            innerHex.style.backgroundColor = "transparent";
        }
        visited[col][height] = 1;
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
    }
    return root;
}
