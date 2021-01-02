import Queue from "../algorithms/datastructures/Queue";
import Coordinate from "../algorithms/datastructures/Coordinate";
export default async function BreadthFirst(hexes, startCol, startHeight) {
    console.log("bfs clear called");
    let q = new Queue();
    // let startRow = hexes.convertToRow(startCol, startHeight);
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
        hexes.contents[col][height] = 0;
        visited[col][height] = 1;
        let hex = document.querySelector(`.hex-${col}-${height}`);
        if (hexInfo != 100)
            hex.classList.remove("visited_hex");
        if (hex.classList.contains("shortestPath"))
            hex.classList.remove("shortestPath");
        if(hex.children[0].classList.contains("wall")) hex.children[0].classList.remove("wall")
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
    // while(root.prev != null) {
    //     let col:number = root.col;
    //     let height:number = root.height;
    //     let hex:Element|null = document.querySelector(`.hex-${col}-${height}`);
    //     hex!.classList.remove("shortestPath")
    //     root = root.prev;
    // }
    return root;
}
