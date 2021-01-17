import React, {useState, useRef} from 'react'
import HexMapComponent from "./HexMapComponent";
import BreadthFirst from "../algorithms/graph/BreadthFirst"
import DepthFirst from "../algorithms/graph/DepthFirst"
import Dijkstra from "../algorithms/graph/Dijkstra"
import AStar from "../algorithms/graph/AStar"
import Coordinate from "../algorithms/datastructures/Coordinate"
import HexMap from '../util/HexMap'
import {clearAll, clearAlgorithm, clearWeights} from '../util/BFSClear'
/* eslint-disable */
const Graph = ({selected}) => {
    //TODO hex pause, play, moveable hexes, other algs, maze algorithms
    const [algorithm, setAlgorithm] = useState("Algorithm")
    const [sliderValue, setSliderValue] = useState(50);
    const [cursorEffect, setCursorEffect] = useState("Toggle Wall");
    // set size calculations
    const [sizeValue, _setSizeValue] = useState(3);
    const sizeRef = useRef(sizeValue);
    const setSizeValue = (data) => {
        sizeRef.current = data;
        console.log(data)
        _setSizeValue(data);
    }
     // figure out starting calculations
     let hexWidth = 28 * sizeValue;
     let hexHeight = 24 * sizeValue;
     let hexHor = Math.floor((window.innerWidth - 20) / (hexWidth * .75) - 1) - 1;
     let hexVert = Math.floor((window.innerHeight*.75) / (hexHeight) );
     let horizontalOffset = (window.innerWidth - (hexHor+.5) * (hexWidth + 1) * .75)/2;
     let targetHeight = Math.floor((hexVert + 1)/2) - 1;
     let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
     let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
     if(targetStartWidth%2 != targetWidth%2) {
        targetWidth++;
    }
     const [startCol, setCol] = useState(targetStartWidth);
     const [startHeight, setHeight] = useState(targetHeight)
     const [goalHeight, setGoalHeight] = useState(targetHeight);
     const [goalWidth, setGoalWidth] = useState(targetWidth);
     const [hexMap, setHexMap] = useState(new HexMap(hexVert, hexHor));
     const [dragProperty, setDragProperty] = useState("start");
     hexMap.contents[goalWidth][goalHeight] = -1000;
     hexMap.contents[startCol][startHeight] = 1000;

     // handles calling the requisite algorithm when the graph button is pressed
    const handleGraph = async (e) => {
        e.preventDefault();
        clearAlgorithm(hexMap, startCol, startHeight)
        // adjust the data status of stop, graph, and size toggling
        const stop = document.querySelector(".stopGraphing");
        stop.dataset.visibility = "true";
        stop.dataset.status = "false";
        stop.dataset.reset = "false";
        const graphButton = document.querySelector(".graphTrigger");
        graphButton.dataset.visibility="false";
        const sizeToggle = document.querySelector(".sizeGraph")
        sizeToggle.readonly = true;
        const sizeTop = document.querySelector(".size");
        sizeTop.style.backgroundColor = "#D3D3D3"
        const reset = document.querySelector(".resetGraphing");
        reset.readonly = true;
        reset.style.backgroundColor = "#D3D3D3"
        let res;

        // perform the algorithm
        switch (algorithm) {
          case "DFS":
            clearWeights(hexMap, startCol, startHeight)
            res = await new Promise((resolve, reject) => {
              resolve(
                DepthFirst(hexMap, startCol, startHeight)
              );
            });
            break;
            case "BFS":
                console.log("bfs")
                clearWeights(hexMap, startCol, startHeight)
                res = await new Promise((resolve, reject) => {
                  resolve(
                    BreadthFirst(hexMap, startCol, startHeight)
                  );
                });
                break;
            case "Dijkstra's":
                res = await new Promise((resolve, reject) => {
                    resolve(
                        Dijkstra(hexMap, startCol, startHeight)
                    );
                });
                break;
            case "A* Search":
                res = await new Promise((resolve, reject) => {
                    resolve(
                        AStar(hexMap, startCol, startHeight, new Coordinate(targetWidth, targetHeight))
                    );
                });
                break;
          default:
              
            break;
        }
        stop.dataset.visibility = "false";
        graphButton.dataset.visibility="true";
        sizeToggle.readonly = false;
        sizeTop.style.backgroundColor = "white"
        reset.readonly = false;
        reset.style.backgroundColor = "#eee"
      };

      // sets the minimum value of the resizing slider
      const calculateMinimumHexMultiplier= () => {
        let width = window.innerWidth;
        if(width > 2100) return "2.25";
        else if (width > 1500) return "2";
        else if (width > 1200) return "1.75";
        else if (width > 900) return "1.5";
        else return "1"
      }
    // forces a redraw of the dom
    const refresh = () => {
        let parent = document.querySelector(".hexMapWrapper")
        parent.style.display = 'none'
        parent.style.display = 'block'
        var n = document.createTextNode(' ');
        var disp = parent.style.display;  // don't worry about previous display style

        parent.appendChild(n);
        parent.style.display = 'none';

        setTimeout(function(){
            parent.style.display = disp;
            n.parentNode.removeChild(n);
        },5); // you can play with this timeout to make it as short as possible
    }

    // for resetting from the button
    const handleReset = (e) => {
        const stop = document.querySelector(".stopGraphing")
        if(stop.dataset.visibility == "true" && stop.dataset.status != "true") return;
        console.log("reset");
        clearAll(hexMap, startCol, startHeight);
    }
    return (
        <div>
            <div className="topBar" data-status={selected == "Graphs" ? "graphSettings" : "false"}>
                <div className="graphSettings">
                <div className="dropdownSmall">
                        <p className="dropdownTop resetGraphing">Clear</p>
                        <div className="dropdownContent7">
                            <p onClick={(e) => {
                                const stop = document.querySelector(".stopGraphing")
                                const graphButton = document.querySelector(".graphTrigger");
                                stop.textContent = "Stop";
                                stop.dataset.status="false"
                                stop.dataset.reset="true";
                                stop.dataset.visibility = "false";
                                graphButton.dataset.visibility="true";
                                clearAll(hexMap, startCol, startHeight)
                                }}>
                                All
                            </p>
                            <p onClick={(e) => {
                                const stop = document.querySelector(".stopGraphing")
                                const graphButton = document.querySelector(".graphTrigger");
                                stop.textContent = "Stop";
                                stop.dataset.status="false"
                                stop.dataset.reset="true";
                                stop.dataset.visibility = "false";
                                graphButton.dataset.visibility="true";
                                clearAlgorithm(hexMap, startCol, startHeight)
                                }}>
                                Path
                            </p>
                            <p onClick={(e) => {
                                clearWeights(hexMap, startCol, startHeight)
                                }}>
                                Weights
                            </p>
                        </div>
                    </div>
                    <div className="dropdown">
                        <p className="dropdownTop size">Set Size</p>
                        <div className="dropdownContent6">
                            <div className="dc3Wrapper">
                                <input
                                onChange={(e) => {
                                    if(e.target.readonly) {
                                        return;
                                    }
                                    clearAlgorithm(hexMap, startCol, startHeight);
                                    clearAll(hexMap, startCol, startHeight);
                                    // recalculate core state when size is changed
                                    setSizeValue(e.target.value);
                                    let hexWidth = 28 * sizeRef.current;
                                    let hexHeight = 24 * sizeRef.current;
                                    let hexHor = Math.floor((window.innerWidth - 20) / (hexWidth * .75)) - 1;
                                    let hexVert = Math.floor((window.innerHeight - 222) / (hexHeight) );
                                    setHexMap(new HexMap(hexVert, hexHor))
                                    let horizontalOffset = (window.innerWidth - (hexHor+.5) * (hexWidth + 1) * .75)/2;
                                    let targetHeight = Math.floor((hexVert + 1)/2) - 1;
                                    let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
                                    let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
                                    if(targetStartWidth%2 != targetWidth%2) {
                                        targetWidth++;
                                    }
                                    setGoalWidth(targetWidth);
                                    setCol(targetStartWidth);
                                    setHeight(targetHeight)
                                }}
                                style={{ padding: "0" }}
                                list="tickmarks"
                                className="sizeGraph"
                                type="range"
                                step="0.25"
                                min = {calculateMinimumHexMultiplier()}
                                max="6"
                                value={sizeValue}
                                />
                            </div>
                        </div>
                    </div>
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
                            // nothing
                        }}
                        >
                        {[
                            "DFS",
                            "BFS",
                            "Dijkstra's",
                            "A* Search",
                        ].map((txt) => {
                            return <p onClick={(e) => setAlgorithm(txt)}>{txt}</p>;
                        })}
                        </div>
                    </div>
                    <div className="graphTrigger" data-visibility="true" onClick={(e) => handleGraph(e)}>
                            Graph
                        </div>
                        <div className="stopGraphing" data-status = "false" data-visibility = "false" data-reset = "false" onClick={(e) => {
                            const reset = document.querySelector(".resetGraphing");
                            const sizeTop = document.querySelector(".size");
                            const sizeToggle = document.querySelector(".sizeGraph");
                            if(e.target.dataset.status === "true") {
                                e.target.dataset.status = "false";
                                e.target.textContent = "Stop";
                                reset.readonly = true;
                                reset.style.backgroundColor = "#D3D3D3"
                            } else {
                                e.target.dataset.status = "true";
                                e.target.textContent = "Start";
                                reset.readonly = false;
                                reset.style.backgroundColor = "#eee"
                            }
                }}>
                    Stop
                </div>
                </div>
            </div>
            <div className="clickTypeSelector">
                    <div className="cursorWrapper">
                        {/*rgba(194,12,12,0.5)*/}
                        <div className="currentCursor" style={{backgroundColor:cursorEffect=="Toggle Wall" ? "black" : cursorEffect=="+Weight" ? "#c20c0c" : "#81adc8"}}></div>
                        <div className="dropdownMedium">
                                <p className="dropdownTop">{cursorEffect}</p>
                                <div
                                className="dropdownContent8"
                                onClick={(e) => {
                                    //nothing
                                }}
                                >
                                {[
                                    "Toggle Wall", 
                                    "+Weight",
                                    "-Weight"
                                ].map((txt) => {
                                    return <p onClick={(e) => setCursorEffect(txt)}>{txt}</p>;
                                })}
                                </div>
                        </div>
                    </div>
                </div>
            <HexMapComponent startCol={startCol} startHeight={startHeight} goalHeight={goalHeight} goalWidth={goalWidth} map={hexMap} sizeValue={sizeValue} cursorEffect={cursorEffect} setCol = {setCol} setHeight = {setHeight} setGoalWidth={setGoalWidth} setGoalHeight={setGoalHeight} setDragProperty= {setDragProperty} dragProperty={dragProperty}/>
            <div className="info">
                <div className="startWrapper infoItem">
                    <div className="startExample"></div>
                    <p className="startDescriptor">Start Hex</p>
                </div>
                <div className="endWrapper infoItem">
                    <div className="endExample"></div>
                    <p className="endDescriptor">End Hex</p>
                </div>
                <div className="wallWrapper infoItem">
                    <div className="wallExample"></div>
                    <p className="wallDescriptor">Wall</p>
                </div>
                <div className="weightWrapper infoItem">
                    <div className="weightExample"></div>
                    <p className="weightDescriptor">Weight Hex</p>
                </div>
                <div className="visitedWrapper infoItem">
                    <div className="visitedExample"></div>
                    <p className="visitedDescriptor">Visited Hex</p>
                </div>
                <div className="pathWrapper infoItem">
                    <div className="pathExample"></div>
                    <p className="pathDescriptor">Path Hex</p>
                </div>
            </div>
        </div>
    )
}

Graph.propTypes = {

}

export default Graph
