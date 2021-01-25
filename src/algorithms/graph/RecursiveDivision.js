import speedBlock from "../../util/speedBlock";
/* eslint-disable */
export async function RecursiveDivision(hexes, x, y, width, height, bisection) {
    if (width < 2 || height < 2)
        return;
    console.log("x=" + x + " y=" + y + " width=" + width + " height=" + height);
    if (bisection) {
        let wallHeight = x + 1 + Math.floor(Math.random() * (width - 2));
        let wallBreak = y + Math.floor(Math.random() * (height));
        for (let i = 0; i < width; i++) {
            let hex = document.querySelector(`.hex-${i}-${wallHeight}`);
            if (hex == null || i == wallBreak || hex.classList.contains("target") || hex.classList.contains("start"))
                continue;
            hexes.contents[i][wallHeight] = -1;
            let innerHex = hex.childNodes[0];
            innerHex.classList.add("wall");
            await speedBlock("Graph");
            await speedBlock("Graph");
        }
        let newHeight = height - wallHeight - 1;
        RecursiveDivision(hexes, x, y, width, newHeight, chooseSplit(width, newHeight));
        RecursiveDivision(hexes, x + wallHeight + 1, y, width, height - newHeight - 1, chooseSplit(width, height - newHeight - 1));
    } else {
        let wallWidth = y + 1 + Math.floor(Math.random() * (height - 2));
        let wallBreak = x + Math.floor(Math.random() * (width));
        for (let i = 0; i < width; i++) {
            let hex = document.querySelector(`.hex-${wallWidth}-${i}`);
            if (hex == null || i == wallBreak || hex.classList.contains("target") || hex.classList.contains("start"))
                continue;
            hexes.contents[wallWidth][i] = -1;
            let innerHex = hex.childNodes[0];
            innerHex.classList.add("wall");
            await speedBlock("Graph");
            await speedBlock("Graph");
        }
        let newWidth = width - wallWidth - 1;
        RecursiveDivision(hexes, x, y, newWidth, height, chooseSplit(newWidth, height));
        RecursiveDivision(hexes, x, y + wallWidth + 1, width - newWidth - 1, height, chooseSplit(width - newWidth - 1, height));
    }
}
export function chooseSplit(width, height) {
    if (width < height)
        return true;
    else if (height < width)
        return false;
    else {
        let temp = Math.random() * 2;
        return temp == 0;
    }
}