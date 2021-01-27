import speedBlock from "../../util/speedBlock";
import checkForStop from "../../util/checkForStop";
/* eslint-disable */
export async function weightRecursiveDivision(hexes, x, y, width, height, bisection) {
    if (await checkForStop("Graphing"))
        return null;
    if (await checkForStop("Graphing"))
        return null;
    if (width < 3 || height < 3)
        return;
    if (bisection) {
        // the vertical height of the wall
        let wallHeight = x + 1 + Math.floor(Math.random() * (width - 2));
        // the vertical hex break in the wall
        let wallBreak = y + Math.floor(Math.random() * (height));
        // the increasing quantity for drawing the wall
        let dy = y;
        for (let i = 0; i < height; i++) {
            let hex = document.querySelector(`.hex-${dy}-${wallHeight}`);
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
            let innerHex = hex.childNodes[0];
            let weight = Math.floor(Math.random() * 11) * 10;
            hexes.contents[dy][wallHeight] = weight;
            innerHex.style.opacity = "1";
            if (hexes.contents[dy][wallHeight] > 0)
                innerHex.style.backgroundColor = `rgba(194,12,12,${(hexes.contents[dy][wallHeight] / 200 + .5)})`;
            dy++;
            await speedBlock("Graph");
        }
        let newWidth = wallHeight - x;
        await weightRecursiveDivision(hexes, x, y, newWidth, height, chooseSplit(newWidth, height));
        newWidth = x + width - wallHeight - 1;
        await weightRecursiveDivision(hexes, wallHeight + 1, y, newWidth, height, chooseSplit(newWidth, height));
    } else {
        // the horizontal width of the wall
        let wallWidth = y + 1 + Math.floor(Math.random() * (height - 2));
        // the horizontal hex break in the wall
        let wallBreak = x + Math.floor(Math.random() * (width));
        // the increasing quantity for drawing the wall
        let dx = x;
        for (let i = 0; i < width; i++) {
            let hex = document.querySelector(`.hex-${wallWidth}-${dx}`);
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
            let innerHex = hex.childNodes[0];
            let weight = Math.floor(Math.random() * 11) * 10;
            hexes.contents[wallWidth][dx] = weight;
            innerHex.style.opacity = "1";
            if (hexes.contents[wallWidth][dx] > 0)
                innerHex.style.backgroundColor = `rgba(194,12,12,${(hexes.contents[wallWidth][dx] / 200 + .5)})`;
            dx++;
            await speedBlock("Graph");
        }
        let newHeight = wallWidth - y;
        await weightRecursiveDivision(hexes, x, y, width, newHeight, chooseSplit(width, newHeight));
        newHeight = y + height - wallWidth - 1;
        await weightRecursiveDivision(hexes, x, wallWidth + 1, width, newHeight, chooseSplit(width, newHeight));
    }
}
export function chooseSplit(width, height) {
    if (width < height)
        return false;
    else if (height < width)
        return true;
    else {
        let temp = Math.random() * 2;
        return temp == 0;
    }
}