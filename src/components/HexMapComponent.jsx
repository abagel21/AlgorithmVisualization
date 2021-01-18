/* eslint-disable */
import React, {useState} from 'react'
import HexMap from '../util/HexMap'
import Hex from "./Hex.jsx"
import PropTypes from 'prop-types'
const HexMapComponent = ({startCol, startHeight, goalHeight, goalWidth, map, sizeValue, cursorEffect, setCol, setHeight, setGoalWidth, setGoalHeight, setDragProperty, dragProperty}) => {
    let [mouseIsDown, setMouseDown] = useState("false");
    let hexWidth = 24 * 1.1547005 * sizeValue;
     let hexHeight = 24 * sizeValue;
     let otherLength = ((hexHeight + 2)/2)/Math.tan(60 * Math.PI / 180);
    let hexHor = Math.floor((window.innerWidth - 20) / (otherLength * 3)) - 1;
    let hexVert = Math.floor((window.innerHeight*.6) / (hexHeight) );
    console.log(hexHor)
    console.log(map.contents.length)
    console.log(hexWidth)
    let rectLength=2* otherLength
    let horizontalOffset = (window.innerWidth - (rectLength * hexHor + (hexHor + 1) * otherLength))/2;
    console.log(otherLength)
    console.log(otherLength/hexWidth)
    const [drag, setDrag] = useState(false);
    return (
        <div className = "hexMapWrapper" style={{height: `${(hexVert)*(hexHeight + 1) + hexHeight/2 - 1}px`, width: `${rectLength * hexHor + (hexHor + 1) * otherLength}px`}}>
            {map.contents.map((item, i) => {
                return item.map((hex, j) => {
                    return (<Hex key={Math.floor((i + j)*(i + j + 1)/2 + j)} val = {hex} col={i} height={j} hexes={map} hoffset = {horizontalOffset} mouseIsDown = {mouseIsDown} setMouseDown={setMouseDown} isStart={j == startHeight ? i == startCol ? true : false : false} isTarget = {j == goalHeight ? i == goalWidth ? true : false : false} sizeValue = {sizeValue} cursorEffect={cursorEffect} setStartWidth = {setCol} setStartHeight = {setHeight} setTargetWidth={setGoalWidth} setDragProperty= {setDragProperty} dragProperty={dragProperty} startWidth={startCol} startHeight={startHeight} goalWidth={goalWidth} goalHeight={goalHeight} setGoalHeight={setGoalHeight} drag={drag} setDrag={setDrag}/>)
                })
            })}
        </div>
    )
}

export default HexMapComponent
