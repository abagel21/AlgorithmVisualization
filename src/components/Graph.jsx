import React, {useState} from 'react'
import HexMapComponent from "./HexMapComponent";
import PropTypes from 'prop-types'

const Graph = ({selected}) => {
    const [algorithm, setAlgorithm] = useState("Breadth-First Search")
    // const handleGraph = async (e) => {
    //     e.preventDefault();
    //     const stop = document.querySelector(".stopSorting");
    //     stop.dataset.visibility = "true";
    //     stop.dataset.reset = "false";
    //     stop.dataset.status = "false";
    //     let res;
    //     switch (selected) {
    //       case "Depth-First Search":
    //         res = await new Promise((resolve, reject) => {
    //           resolve(
    //             // DFS
    //           );
    //         });
    //         stop.dataset.visibility = "false";
    //         if (res) setSortableComponents(res);
    //         break;
    //         case "Breadth-First Search":
    //             res = await new Promise((resolve, reject) => {
    //               resolve(
    //                 // BFS
    //               );
    //             });
    //             stop.dataset.visibility = "false";
    //             if (res) setSortableComponents(res);
    //             break;
    //         case "Dijkstra's":
    //             res = await new Promise((resolve, reject) => {
    //                 resolve(
    //                 // Dijkstra's
    //                 );
    //             });
    //             stop.dataset.visibility = "false";
    //             if (res) setSortableComponents(res);
    //             break;
    //         case "A* Search":
    //             res = await new Promise((resolve, reject) => {
    //                 resolve(
    //                 // A* Search
    //                 );
    //             });
    //             stop.dataset.visibility = "false";
    //             if (res) setSortableComponents(res);
    //             break;
    //       default:
    //         return;
    //     }
    //   };
    const handleGraph = () => {
        console.log("HI");
    }
    return (
        <div>
            <div className="topBar" data-status={selected == "Graphs" ? "graphSettings" : "false"}>
                <div className="graphSettings">
                    <div className="dropdown">
                    <p className="dropdownTop">{algorithm}</p>
                    <div
                    className="dropdownContent4"
                    onClick={(e) => {
                        //also dropdown?
                    }}
                    >
                    {[
                        "Depth-First Search",
                        "Breadth-First Search",
                        "Dijkstra's",
                        "A* Search",
                    ].map((txt) => {
                        return <p onClick={(e) => setAlgorithm(txt)}>{txt}</p>;
                    })}
                    </div>
                </div>
                <div className="graphTrigger" onClick={(e) => handleGraph(e)}>
                        Graph
                    </div>
            </div>
        </div>
            <HexMapComponent />
        </div>
    )
}

Graph.propTypes = {

}

export default Graph
