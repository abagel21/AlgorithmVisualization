import { divide } from "lodash";
import HexMap from "../../util/HexMap";
import speedBlock from "../../util/speedBlock";
import checkForStop from "../../util/checkForStop";
/* eslint-disable */
export async function RecursiveDivision(hexes:HexMap, x:number, y:number, width:number, height:number, bisection: boolean): Promise<null> {
    if (await checkForStop("Graphing")) return null;
    if (await checkForStop("Graphing")) return null;
    if (width < 3 || height < 3) return;
    if(bisection) {
        // the vertical height of the wall
        let wallHeight = x + 1 + Math.floor(Math.random() * (width - 2));
        // the vertical hex break in the wall
        let wallBreak = y + Math.floor(Math.random() * (height));
        // the increasing quantity for drawing the wall
        let dy = y;
        for(let i = 0; i < height; i++) {
            let hex:HTMLDivElement = document.querySelector(`.hex-${dy}-${wallHeight}`) as HTMLDivElement;
            if (hex == null || dy == wallBreak || hex.classList.contains("target") || hex.classList.contains("start")) {
                dy++;
                continue;
            }
            if (i + 1 == height && (dy + 1 < hexes.contents.length && hexes.contents[dy + 1][wallHeight] != -1)) {
                dy++;
                continue;
            }
            if (i == 0 && (dy - 1 > 0 && hexes.contents[dy - 1][wallHeight] != -1)) {
                dy++;
                continue;
            }
            hexes.contents[dy][wallHeight] = -1;
            dy++;
            let innerHex:HTMLDivElement = hex.childNodes[0] as HTMLDivElement;
            innerHex.classList.add("wall");
            await speedBlock("Graph");
        }
        let newWidth = wallHeight - x;
        await RecursiveDivision(hexes, x, y, newWidth, height, chooseSplit(newWidth, height));
        newWidth = x + width - wallHeight - 1;
        await RecursiveDivision(hexes, wallHeight + 1, y, newWidth, height, chooseSplit(newWidth, height));
    } else {
        // the horizontal width of the wall
        let wallWidth = y + 1 + Math.floor(Math.random() * (height - 2));
        // the horizontal hex break in the wall
        let wallBreak = x + Math.floor(Math.random() * (width));
        // the increasing quantity for drawing the wall
        let dx = x;
        for(let i = 0; i < width; i++) {
            let hex:HTMLDivElement = document.querySelector(`.hex-${wallWidth}-${dx}`) as HTMLDivElement;
            if (hex == null || dx == wallBreak || hex.classList.contains("target") || hex.classList.contains("start")) {
                dx++;
                continue;
            }
            if (i + 1 == width && (dx + 1 < hexes.contents[0].length && hexes.contents[wallWidth][dx + 1] != -1)) {
                dx++;
                continue;
            }
            if (i == 0 && (dx - 1 > 0 && hexes.contents[wallWidth][dx - 1] != -1)) {
                dx++;
                continue;
            }
            hexes.contents[wallWidth][dx] = -1;
            dx++;
            let innerHex:HTMLDivElement = hex.childNodes[0] as HTMLDivElement;
            innerHex.classList.add("wall");
            await speedBlock("Graph");
        }
        let newHeight = wallWidth - y;
        await RecursiveDivision(hexes, x, y, width, newHeight, chooseSplit(width, newHeight));
        newHeight = y + height - wallWidth - 1;
        await RecursiveDivision(hexes, x, wallWidth + 1, width, newHeight, chooseSplit(width, newHeight));
    }
}

export function chooseSplit(width : number, height:number):boolean {
    if(width < height) return false;
    else if (height < width) return true;
    else {
        let temp:number = Math.random() * 2
        return temp == 0;
    }
}