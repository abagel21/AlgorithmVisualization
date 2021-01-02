import React from 'react'
import Graph from './Graph'
import SortingSpace from "./SortingSpace"
import PropTypes from 'prop-types'

const AlgorithmPage = ({selected}) => {
    return (
        <div className="contentWrapper">
            <div className="sorting" style = {{visibility: selected == "Sorting" ? "visible" : "hidden", height: selected == "Sorting" ? 1 : 0}}>
                <SortingSpace selected={selected}/>
            </div>
            <div className="string" style = {{visibility: selected == "Strings" ? "visible" : "hidden", height: selected == "Strings" ? 1 : 0, display: selected == "Strings" ? "block" : "none"}}>
                <h1>WIP</h1>
            </div>
            <div className="graph" style = {{visibility: selected == "Graphs" ? "visible" : "hidden", height: selected == "Graphs" ? 1 : 0}}>
                <Graph selected={selected}/>
            </div>
        </div>
    )
}

AlgorithmPage.propTypes = {

}

export default AlgorithmPage
