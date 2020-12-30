import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const AlgorithmNavigation = ({setSelected}) => {
    const onClick = (e) => {
        e.target.parentNode.childNodes.forEach(child => child.classList.remove("selected"))
        e.target.classList.add("selected");
        setSelected(e.target.innerHTML)
    }
    return (
        <nav className="navbar">
            <div className="header">Algorithm Visualizer</div>
            <ul>
                <li className="navlink selected" onClick = {e => onClick(e)}>Sorting</li>
                <li className="navlink" onClick = {e => onClick(e)}>Graphs</li>
                <li className="navlink" onClick = {e => onClick(e)}>Strings</li>
            </ul>
        </nav>
    )
}

AlgorithmNavigation.propTypes = {

}

export default AlgorithmNavigation
