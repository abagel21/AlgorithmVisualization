/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'

const Help = ({}) => {
    const handleClick = (e) => {
        console.log(e.target)
        let node = e.target.parentNode.childNodes[1];
        if(e.target.classList.contains("dropArrow"))
            node = e.target.parentNode.parentNode.childNodes[1];
        if(node.classList.contains("droppedAnswer"))
            node.classList.remove("droppedAnswer")
        else
            node.classList.add("droppedAnswer")
    }
    return (
        <div className='support'>
            <div className="support__faq">
            <ul className="support__faq-list">
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I use the Sorting page?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">The focus of the Sorting page is on the group of bars in the middle. The number of bars (sortable objects) is controlled by a slider at the bottom. You can also set the way the data is ordered--randomized, ascending, descending, or randomized with an emphasis on generating duplicates--at the top. The speed and type of algorithm is also in the top navbar. Click "Sort" to begin the visualization once an algorithm is selected. Algorithms can be paused during runtime and the speed can be adjusted for different granularity. Click "Reset" once an algorithm is finished to try another algorithm.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I use the Graphs page?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">The Graphs page has been constructed to act as a visualization sandbox. The first thing you will see is a hexagonal grid. On this grid, brown represents the starting square, and red represents the target square in a search. At the top, you can set the size of the hexes (increasing or decreasing the number of hexes), set the speed for algorithms to run at, and select which algorithm you wish to see. Click "Graph" to begin the visualization once an algorithm is selected. You can edit the map under the navbar with the "Toggle Wall" button where you can select adding or removing weights for weighted algorithms such as Dijkstra's and A* Search. You can click hexes or drag around the hex map to add the respective item. Each "level" of weight is equivalent to 10 hexes. You can change speed, pause, and play algorithms while they are running. After they are finished or if you wish to clear walls or weights, the "Clear" dropdown provides different erasing functionality. </p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I use the Trees page?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">The Trees page has not been completed yet. Check back soon for a visualization of binary heaps, binary search trees, AVL trees, tree traversals, and DFS/BFS.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I use the Strings page?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">The Strings page has not been completed yet. Check back soon for a visualization of common substring search algorithms like Knuth-Morris-Pratt, Boyer-Moore, and Rabin Karp.</p>
                </div>
            </ul>
            </div>
            <div className="support__contact-us">
                <h3 className="support__contact-us-heading subheading">Contact Us</h3>
                <p>For any further questions or issues, you can contact me <a href="mailto:alexander.nagel21@gmail.com" className="support__contact-us-email">here</a>.</p>
            </div>
        </div>
    )
}

Help.propTypes = {

}

export default Help
