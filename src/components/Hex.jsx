import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Hex = ({val, col, height, hexes, hoffset, mouseIsDown, setMouseDown, isStart, isTarget, sizeValue}) => {
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
    let topMargin = 50 + offset + (height) * (hexHeight);

    // for adding weight or walls when clicking
    let hexClickHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        setMouseDown("true")
        let innerHex = document.querySelector(`.hex-${col}-${height}`).children[0];
        if(hexes.contents[col][height] == 0) {
            hexes.contents[col][height] = -1;
            innerHex.classList.add("wall");
        } else if(hexes.contents[col][height] == -1) {
            hexes.contents[col][height] = 0;
            innerHex.classList.remove("wall");
        }
    }
    // for adding weight or walls when dragging
    let mouseOverHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        if(mouseIsDown=="true") {
            let innerHex = document.querySelector(`.hex-${col}-${height}`).children[0];
            if(hexes.contents[col][height] == 0) {
                hexes.contents[col][height] = -1;
                innerHex.classList.add("wall");
            } else if(hexes.contents[col][height] == -1) {
                hexes.contents[col][height] = 0;
                innerHex.classList.remove("wall");
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

Hex.propTypes = {

}

export default Hex
