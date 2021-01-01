import React, {useState} from 'react'
import HexMapComponent from "./HexMapComponent";
import PropTypes from 'prop-types'
import BreadthFirst from "../algorithms/graph/BreadthFirst"
import HexMap from '../util/HexMap'

const Graph = ({selected}) => {
    const [algorithm, setAlgorithm] = useState("Breadth-First Search")
    const [sliderValue, setSliderValue] = useState(50);
     // figure out starting calculations
     // TODO make hex numbers adjustable
     let hexHor = Math.floor((window.innerWidth - 20) / (56 * .75) - 1)
     let hexVert = Math.floor((window.innerHeight - 222) / (48) );
     let horizontalOffset = (window.innerWidth - (hexHor+.5) * 57 * .75)/2;
     let targetHeight = Math.floor((hexVert + 1)/2) - 1;
     let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
     let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
     const [startCol, setCol] = useState(targetStartWidth);
     const [startHeight, setHeight] = useState(targetHeight)
     const [hexMap, setHexMap] = useState(new HexMap(hexVert, hexHor));
     hexMap.contents[targetWidth][targetHeight] = -100;
     hexMap.contents[targetStartWidth][targetHeight] = 100;
    const handleGraph = async (e) => {
        e.preventDefault();
        console.log(algorithm)
        let res;
        switch (algorithm) {
          case "Depth-First Search":
            res = await new Promise((resolve, reject) => {
              resolve(
                // DFS
              );
            });
            break;
            case "Breadth-First Search":
                console.log("bfs")
                res = await new Promise((resolve, reject) => {
                  resolve(
                    BreadthFirst(hexMap, startCol, startHeight)
                  );
                });
                break;
            case "Dijkstra's":
                res = await new Promise((resolve, reject) => {
                    resolve(
                    // Dijkstra's
                    );
                });
                break;
            case "A* Search":
                res = await new Promise((resolve, reject) => {
                    resolve(
                    // A* Search
                    );
                });
                break;
          default:
            return;
        }
      };

    return (
        <div>
            <div className="topBar" data-status={selected == "Graphs" ? "graphSettings" : "false"}>
                <div className="graphSettings">
                <div className="dropdown">
                    <p className="dropdownTop">Set Speed</p>
                    <div className="dropdownContent5">
                        <div className="dc3Wrapper">
                            <input
                            onChange={(e) => {
                                setSliderValue(e.target.value);
                            }}
                            style={{ padding: "0" }}
                            list="tickmarks"
                            className="speedGraph"
                            id="speedRange"
                            type="range"
                            step="6.25"
                            />
                        </div>
                    </div>
                </div>
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
            <HexMapComponent startCol={startCol} startHeight={startHeight} map={hexMap} />
        </div>
    )
}

Graph.propTypes = {

}

export default Graph
