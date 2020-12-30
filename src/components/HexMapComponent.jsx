import React, {useState} from 'react'
import HexMap from '../util/HexMap'
import Hex from "./Hex.jsx"
import PropTypes from 'prop-types'

const HexMapComponent = props => {
    let [mouseIsDown, setMouseDown] = useState("false");
    let hexHor = Math.floor((window.innerWidth - 20) / (56 * .75) - 1)
    let hexVert = Math.floor((window.innerHeight - 222) / (48) );
    let horizontalOffset = (window.innerWidth - (hexHor+.5) * 57 * .75)/2;
    let targetHeight = Math.floor((hexVert + 1)/2) - 1;
    let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
    let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
    let [map, setMap] = useState(new HexMap(hexVert, hexHor))
    map.contents[targetWidth][targetHeight] = -100;
    map.contents[targetStartWidth][targetHeight] = 100;
    return (
        <div className = "hexMapWrapper">
            {map.contents.map((item, i) => {
                return item.map((hex, j) => {
                    return (<Hex val = {hex} col={i} height={j} hexes={map} hoffset = {horizontalOffset} mouseIsDown = {mouseIsDown} setMouseDown={setMouseDown} isStart={j == targetHeight ? i == targetStartWidth ? true : false : false} isTarget = {j == targetHeight ? i == targetWidth ? true : false : false}/>)
                })
            })}
        </div>
    )
}

HexMapComponent.propTypes = {

}

export default HexMapComponent
