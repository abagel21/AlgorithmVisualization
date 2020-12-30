import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Hex = ({val, col, height, hexes, hoffset, mouseIsDown, setMouseDown, isStart, isTarget}) => {
    let [hexClass, setClass] = useState("innerHex")
    let hexSize = 56/2
    let hexHeight = hexSize * Math.sqrt(3);
    let leftMargin = hoffset + col * (hexSize * 1.5 + 1);
    let offset = 0;
    if(col % 2 == 1) {
        offset = hexHeight/2;
    } else {
        offset = hexHeight;
    }
    let topMargin = offset + (height) * (hexHeight);

    let hexClickHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        setMouseDown("true")
        if(hexes.contents[col][height] == 0) {
            hexes.contents[col][height] = -1;
            setClass("innerHex wall")
        } else if(hexes.contents[col][height] == -1) {
            hexes.contents[col][height] = 0;
            setClass("innerHex")
        }
    }

    let mouseOverHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        if(mouseIsDown=="true") {
            if(hexes.contents[col][height] == 0) {
                hexes.contents[col][height] = -1;
                setClass("innerHex wall")
            } else if(hexes.contents[col][height] == -1) {
                hexes.contents[col][height] = 0;
                setClass("innerHex")
            }
        }
    }
    let mouseUpHandler = (e) => {
        if(isStart || isTarget) return;
        e.preventDefault();
        setMouseDown("false")
    }

    return (
        <div className = {`hex hex-${col}-${height} ${isStart ? "start" : ""} ${isTarget ? "target" : ""}`} style={{left: leftMargin, top: topMargin}} onMouseUp={e => mouseUpHandler(e)} onMouseEnter={e => mouseOverHandler(e)}>
            <div className={hexClass} onMouseDown={e => hexClickHandler(e)}></div>
        </div>
    )
}

Hex.propTypes = {

}

export default Hex
