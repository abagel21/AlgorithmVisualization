/* eslint-disable */
import React, {useState} from 'react'

const Hex = ({val, col, height, hexes, hoffset, mouseIsDown, setMouseDown, isStart, isTarget, sizeValue, cursorEffect}) => {
    let hexWidth = 28 * sizeValue;
    let hexH = 24 * sizeValue;
    let hexSize = hexWidth/2
    let hexHeight = hexSize * Math.sqrt(3);
    let leftMargin = hoffset + col * (hexSize * 1.5 + 1);
    let offset = 0;
    if(col % 2 == 1) {
        offset = hexHeight/2;
    } else {
        offset = hexHeight;
    }
    let topMargin = offset + (height) * (hexHeight);

    // for adding weight or walls when clicking
    let hexClickHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        setMouseDown("true")
        let hex = document.querySelector(`.hex-${col}-${height}`);
        let innerHex = document.querySelector(`.hex-${col}-${height}`).children[0];
        console.log(cursorEffect)
        switch(cursorEffect) {
            case "Toggle Wall":
                console.log("adding wall");
                if(hexes.contents[col][height] == 0) {
                    console.log("adding")
                    hexes.contents[col][height] = -1;
                    innerHex.classList.add("wall");
                } else if(hexes.contents[col][height] == -1) {
                    hexes.contents[col][height] = 0;
                    innerHex.classList.remove("wall");
                }
                console.log(hexes.contents[col][height])
                break;
            case "Add Weight":
                console.log("Trying to add weight")
                if(hexes.contents[col][height] == 0) {
                    hexes.contents[col][height] = 10;
                    innerHex.style.backgroundColor = "rgba(194,12,12,.5)";
                    innerHex.style.opacity= 1;
                } else if(hexes.contents[col][height] > 1 && hexes.contents[col][height] != 1000) {
                    hexes.contents[col][height] = (hexes.contents[col][height] + 10);
                    if(hexes.contents[col][height] > 100) {
                        hexes.contents[col][height] = 0
                        innerHex.style.opacity= 0;
                    } else {
                        innerHex.style.opacity= 1;
                        innerHex.style.backgroundColor = `rgba(194,12,12,${(hexes.contents[col][height]/200 + .5)})`;
                    }
                }
                break;
            case "Remove Weight":
                if(hexes.contents[col][height] > 1 && hexes.contents[col][height] != 1000) {
                    innerHex.style.backgroundColor = "transparent";
                    innerHex.style.opacity = 0;
                    hexes.contents[col][height] = 0;
                } else if (hexes.contents[col][height] == 0) {
                    innerHex.style.backgroundColor = "transparent";
                    innerHex.style.opacity = 0;
                }
                break;
            default:
                console.log("NONE");
                break;
        }
    }
    // for adding weight or walls when dragging
    let mouseOverHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        if(mouseIsDown=="true") {
            let innerHex = document.querySelector(`.hex-${col}-${height}`).children[0];
            switch(cursorEffect) {
                case "Toggle Wall":
                    console.log("adding wall");
                    if(hexes.contents[col][height] == 0) {
                        console.log("adding")
                        hexes.contents[col][height] = -1;
                        innerHex.classList.add("wall");
                    } else if(hexes.contents[col][height] == -1) {
                        hexes.contents[col][height] = 0;
                        innerHex.classList.remove("wall");
                    }
                    console.log(hexes.contents[col][height])
                    break;
                case "Add Weight":
                    console.log("Trying to add weight")
                    if(hexes.contents[col][height] == 0) {
                        hexes.contents[col][height] = 10;
                        innerHex.style.backgroundColor = "rgba(194,12,12,.5)";
                        innerHex.style.opacity= 1;
                    } else if(hexes.contents[col][height] > 1 && hexes.contents[col][height] != 1000) {
                        hexes.contents[col][height] = (hexes.contents[col][height] + 10);
                        if(hexes.contents[col][height] > 100) {
                            hexes.contents[col][height] = 0
                            innerHex.style.opacity= 0;
                        } else {
                            innerHex.style.opacity= 1;
                            innerHex.style.backgroundColor = `rgba(194,12,12,${(hexes.contents[col][height]/200 + .5)})`;
                        }
                    }
                    break;
                case "Remove Weight":
                    if(hexes.contents[col][height] > 1 && hexes.contents[col][height] != 1000) {
                        innerHex.style.backgroundColor = "transparent";
                        innerHex.style.opacity = 0;
                        hexes.contents[col][height] = 0;
                    } else if (hexes.contents[col][height] == 0) {
                        innerHex.style.backgroundColor = "transparent";
                        innerHex.style.opacity = 0;
                    }
                    break;
                default:
                    console.log("NONE");
                    break;
            }
        }
    }
    // for adding weight or walls when lifting mouse
    let mouseUpHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        setMouseDown("false")
    }

    return (
        <div data-hexInfo={hexes.contents[col][height]}className = {`hex hex-${col}-${height} ${isStart ? "start" : ""} ${isTarget ? "target" : ""}`} style={{left: leftMargin, top: topMargin, width: hexWidth, height: hexH}} onMouseUp={e => mouseUpHandler(e)} onMouseEnter={e => mouseOverHandler(e)}>
            <div className={`innerHex`} onMouseDown={e => hexClickHandler(e)}></div>
        </div>
    )
}

export default Hex
