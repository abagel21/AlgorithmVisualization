import React, {useState} from 'react'
import HexMap from '../util/HexMap'
import Hex from "./Hex.jsx"
import PropTypes from 'prop-types'

const HexMapComponent = ({startCol, startHeight, goalWidth, map, sizeValue}) => {
    let [mouseIsDown, setMouseDown] = useState("false");
    let hexWidth = 28 * sizeValue;
     let hexHeight = 24 * sizeValue;
    let hexHor = Math.floor((window.innerWidth - 20) / (hexWidth * .75) - 1)
    let hexVert = Math.floor((window.innerHeight - 222) / (hexHeight) );
    let horizontalOffset = (window.innerWidth - (hexHor+.5) * (hexWidth + 1) * .75)/2;
    let targetHeight = startHeight;
    let targetStartWidth = startCol;
    let targetWidth = goalWidth;
    return (
        <div className = "hexMapWrapper">
            {map.contents.map((item, i) => {
                console.log("remapping");
                return item.map((hex, j) => {
                    return (<Hex key={Math.floor((i + j)*(i + j + 1)/2 + j)}val = {hex} col={i} height={j} hexes={map} hoffset = {horizontalOffset} mouseIsDown = {mouseIsDown} setMouseDown={setMouseDown} isStart={j == targetHeight ? i == targetStartWidth ? true : false : false} isTarget = {j == targetHeight ? i == targetWidth ? true : false : false} sizeValue = {sizeValue}/>)
                })
            })}
        </div>
    )
}

HexMapComponent.propTypes = {

}

export default HexMapComponent
