/* eslint-disable */
import React, {useState} from 'react'
import HexMap from '../util/HexMap'
import Hex from "./Hex.jsx"
import PropTypes from 'prop-types'
const HexMapComponent = ({startCol, startHeight, goalHeight, goalWidth, map, sizeValue, cursorEffect, setCol, setHeight, setGoalWidth, setGoalHeight, setDragProperty, dragProperty}) => {
    let [mouseIsDown, setMouseDown] = useState("false");
    let hexWidth = 28 * sizeValue;
     let hexHeight = 24 * sizeValue;
    let hexHor = Math.floor((window.innerWidth - 20) / (hexWidth * .75) - 1)
    let hexVert = Math.floor((window.innerHeight*.6) / (hexHeight) );
    let horizontalOffset = (window.innerWidth - ((hexHor + 1) * (hexWidth) * .75 - hexWidth))/2;
    console.log(window.innerWidth)
    console.log((hexHor + 1) * (hexWidth) * .75 - hexWidth)
    console.log(hexVert)
    const [drag, setDrag] = useState(false);
    return (
        <div className = "hexMapWrapper" style={{height: `${(hexVert + 1)*(hexHeight + 1) + hexHeight/2 - 1}px`, width: `${(hexHor + 1) * (hexWidth) * .75 - hexWidth}px`}}>
            {map.contents.map((item, i) => {
                return item.map((hex, j) => {
                    return (<Hex key={Math.floor((i + j)*(i + j + 1)/2 + j)} val = {hex} col={i} height={j} hexes={map} hoffset = {horizontalOffset} mouseIsDown = {mouseIsDown} setMouseDown={setMouseDown} isStart={j == startHeight ? i == startCol ? true : false : false} isTarget = {j == goalHeight ? i == goalWidth ? true : false : false} sizeValue = {sizeValue} cursorEffect={cursorEffect} setStartWidth = {setCol} setStartHeight = {setHeight} setTargetWidth={setGoalWidth} setDragProperty= {setDragProperty} dragProperty={dragProperty} startWidth={startCol} startHeight={startHeight} goalWidth={goalWidth} goalHeight={goalHeight} setGoalHeight={setGoalHeight} drag={drag} setDrag={setDrag}/>)
                })
            })}
        </div>
    )
}

export default HexMapComponent
