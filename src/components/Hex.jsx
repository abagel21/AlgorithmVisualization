/* eslint-disable */
import { truncate } from 'lodash';
import React, {useState} from 'react'

const Hex = ({val, col, height, hexes, hoffset, mouseIsDown, setMouseDown, isStart, isTarget, sizeValue, cursorEffect, setTargetWidth, setStartHeight, setGoalHeight, setStartWidth, setDragProperty, dragProperty, goalHeight, startWidth, goalWidth, startHeight, drag, setDrag}) => {
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
    const [inc, addInc] = useState(0);

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

    const handleDrag = e => {
        setDrag(true);
        console.log("DRAG STARTED")
        if(isStart) {
            setDragProperty("start");
            isStart = false;
            e.target.classList.remove("start")
        } else {
            setDragProperty("target");
            isTarget = false;
            e.target.classList.remove("target")
        }
    }

    const handleDrop = e => {
        setDrag(false);
        console.log("DROPPED")
        console.log(e.target);
        // if they try to drag the start onto the target or target onto the start
        if(dragProperty == "start" && isTarget) {
            const start = document.querySelector(`.hex-${startWidth}-${startHeight}`);
            start.classList.add("start");
            return;
        }
        else if (dragProperty == "target" && isStart) {
            const target = document.querySelector(`.hex-${goalWidth}-${goalHeight}`);
            target.classList.add("target")
            return;
        }
        const endHex = e.target.parentNode;
        const height = parseInt(endHex.classList[1].split("-")[2]);
        const col = parseInt(endHex.classList[1].split("-")[1]);
        if(dragProperty=="start") {
            isStart = true;
            hexes.contents[startWidth][startHeight] = 0;
            setStartWidth(col);
            setStartHeight(height);
            e.target.classList.add("start")
        } else {
            isTarget = true;
            hexes.contents[goalWidth][goalHeight] = 0;
            setTargetWidth(col);
            setGoalHeight(height);
            e.target.classList.add("target")
        }
    }
    const onDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onDragEnd = (e) => {
        console.log("DRAG ENDED");
        console.log(drag);
        if(drag) {
            if(dragProperty=="start") {
                const start = document.querySelector(`.hex-${startWidth}-${startHeight}`);
                start.classList.add("start");
            } else {
                const target = document.querySelector(`.hex-${goalWidth}-${goalHeight}`);
                target.classList.add("target")
            }
        }
    }

    return (
        <div onDragEnd = {onDragEnd} onDragOver = {onDragOver} onDrop = {e => handleDrop(e)} onDragStart={e => handleDrag(e)} draggable={isStart || isTarget} data-hexInfo={hexes.contents[col][height]} className = {`hex hex-${col}-${height} ${isStart ? "start" : ""} ${isTarget ? "target" : ""}`} style={{left: leftMargin, top: topMargin, width: hexWidth, height: hexH}} onMouseUp={e => mouseUpHandler(e)} onMouseEnter={e => mouseOverHandler(e)}>
            <div className={`innerHex`} onMouseDown={e => hexClickHandler(e)}></div>
        </div>
    )
}

export default Hex
