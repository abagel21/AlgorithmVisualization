import React from 'react'
import Graph from './Graph'
import Help from "./Help"
import SortingSpace from "./SortingSpace"
/* eslint-disable */
const AlgorithmPage = ({selected}) => {
    return (
        <div className="contentWrapper">
            <div className="sorting" style = {{visibility: selected == "Sorting" ? "visible" : "hidden", height: selected == "Sorting" ? 1 : 0}}>
                <SortingSpace selected={selected}/>
            </div>
            <div className="string" style = {{visibility: selected == "Strings" ? "visible" : "hidden", height: selected == "Strings" ? 1 : 0, display: selected == "Strings" ? "block" : "none"}}>
                <h1 className="CS">Coming Soon!</h1>
            </div>
            <div className="graph" style = {{visibility: selected == "Graphs" ? "visible" : "hidden", height: selected == "Graphs" ? 1 : 0}}>
                <Graph selected={selected}/>
            </div>
            <div className="tree" style = {{visibility: selected == "Trees" ? "visible" : "hidden", height: selected == "Trees" ? 1 : 0, display: selected == "Trees" ? "block" : "none"}}>
                <h1 className="CS">Coming Soon!</h1>
            </div>
            <div className="help" style = {{visibility: selected == "Help" ? "visible" : "hidden", height: selected == "Help" ? 1 : 0}}>
                <Help selected={selected}/>
            </div>
        </div>
    )
}


export default AlgorithmPage
