import React from 'react'
/* eslint-disable */
const AlgorithmNavigation = ({setSelected}) => {
    const onClick = (e) => {
        e.target.parentNode.childNodes.forEach(child => child.classList.remove("selected"))
        e.target.classList.add("selected");
        setSelected(e.target.innerHTML)
        const stop1 = document.querySelector(".stopSorting")
        const stop2 = document.querySelector(".stopGraphing")
        stop1.dataset.reset="true";
        stop2.dataset.reset="true";
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
