import React from 'react'
import logo from "../util/algorithm_logo.png"
import logosvg from "../Component 1.svg"
/* eslint-disable */
const AlgorithmNavigation = ({selected, setSelected}) => {
    const onClick = (e) => {
        if(selected == "Help" ) {
            let p = document.querySelector(".support__faq-list");
            p.childNodes.forEach(div => {
                if(div.childNodes[1].classList.contains("droppedAnswer")) {
                    div.childNodes[1].classList.remove("droppedAnswer")
                }
            })
        }
        const stop1 = document.querySelector(".stopSorting")
        const stop2 = document.querySelector(".stopGraphing")
        stop1.dataset.reset="true";
        stop2.dataset.reset="true";
        if(e.target.classList.contains("navlink-inner")) {
            e.target.parentNode.parentNode.childNodes.forEach(child => child.childNodes[0].classList.remove("selected"))
            e.target.classList.add("selected");
            e.target.parentNode.parentNode.childNodes.forEach(child => child.classList.remove("selectedWrapper"))
            e.target.parentNode.classList.add("selectedWrapper");
            setSelected(e.target.innerHTML)
            if(e.target.innerHTML == "Help") {
                let toDrop = document.querySelector(".support__faq-answer")
                toDrop.classList.add("droppedAnswer")
            }
        } else {
            e.target.parentNode.childNodes.forEach(child => child.childNodes[0].classList.remove("selected"))
            e.target.childNodes[0].classList.add("selected");
            e.target.parentNode.childNodes.forEach(child => child.classList.remove("selectedWrapper"))
            e.target.classList.add("selectedWrapper");
            setSelected(e.target.childNodes[0].innerHTML)
            if(e.target.childNodes[0].innerHTML == "Help") {
                let toDrop = document.querySelector(".support__faq-answer")
                toDrop.classList.add("droppedAnswer")
            }
        }
    }
    return (
        <nav className="navbar">
            <div className="headerWrapper">
                {/* <img src={logo} alt="LOGO" className="logo"/> */}
                <img src={logosvg} alt="LOGO" className="logo"/>
                <div className="header">Algorithm Visualizer</div>
            </div>
            <ul>
                <li className="navlink s" onClick = {e => onClick(e)}>
                    <p className="navlink-inner selected" onClick = {e => onClick(e)}>Sorting</p>
                </li>
                <li className="navlink g" onClick = {e => onClick(e)}>
                    <p className="navlink-inner" onClick = {e => onClick(e)}>Graphs</p>
                </li>
                <li className="navlink t" onClick = {e => onClick(e)}>
                    <p className="navlink-inner" onClick = {e => onClick(e)}>Trees</p>
                </li>
                <li className="navlink st" onClick = {e => onClick(e)}>
                    <p className="navlink-inner" onClick = {e => onClick(e)}>Strings</p>
                </li>
                <li className="navlink h" onClick = {e => onClick(e)}>
                    <p className="navlink-inner" onClick = {e => onClick(e)}>Help</p>
                </li>
            </ul>
        </nav>
    )
}

AlgorithmNavigation.propTypes = {

}

export default AlgorithmNavigation
