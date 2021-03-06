import React, {useState, useRef} from 'react'
import HexMapComponent from "./HexMapComponent";
import BreadthFirst from "../algorithms/graph/BreadthFirst"
import DepthFirst from "../algorithms/graph/DepthFirst"
import Dijkstra from "../algorithms/graph/Dijkstra"
import AStar from "../algorithms/graph/AStar"
import Coordinate from "../algorithms/datastructures/Coordinate"
import HexMap from '../util/HexMap'
import {RecursiveDivision, chooseSplit} from "../algorithms/graph/RecursiveDivision"
import addWeights from "../util/addWeights"
import {weightRecursiveDivision} from "../algorithms/graph/WeightRecursiveDivision"
import {clearAll, clearAlgorithm, clearWeights} from '../util/BFSClear'
/* eslint-disable */
const Graph = ({selected}) => {
    //TODO hex pause, play, moveable hexes, other algs, maze algorithms
    const [algorithm, setAlgorithm] = useState("Algorithm")
    const [sliderValue, setSliderValue] = useState(50);
    const [cursorEffect, setCursorEffect] = useState("Toggle Wall");
    // set size calculations
    const [sizeValue, _setSizeValue] = useState(3);
    const windowResize = () => {
        clearAlgorithm(hexMap, startCol, startHeight);
        clearAll(hexMap, startCol, startHeight);
        let hexWidth = 24 * 1.1547005 * sizeRef.current;
        let hexHeight = 24 * sizeRef.current;
        let otherLength = ((hexHeight + 2)/2)/Math.tan(60 * Math.PI / 180);
        let hexHor = Math.floor((window.innerWidth - 20) / (otherLength * 3)) - 1;
        let hexVert = Math.floor((window.innerHeight*.6) / (hexHeight) );
        let horizontalOffset = (window.innerWidth - ((hexHor + 1) * (hexWidth) * .75 - hexWidth))/2;
        setHexMap(new HexMap(hexVert, hexHor))
        let targetHeight = Math.floor((hexVert + 1)/2) - 1;
        let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
        let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
        if(targetStartWidth%2 != targetWidth%2) {
            targetWidth++;
        }
        setGoalWidth(targetWidth);
        setCol(targetStartWidth);
        setHeight(targetHeight)
        setGoalHeight(targetHeight)
    }
    window.onresize = windowResize;
    const sizeRef = useRef(sizeValue);
    const setSizeValue = (data) => {
        sizeRef.current = data;
        _setSizeValue(data);
    }
     // figure out starting calculations
     let hexWidth = 24 * 1.1547005 * sizeValue;
     let hexHeight = 24 * sizeValue;
     let otherLength = ((hexHeight + 2)/2)/Math.tan(60 * Math.PI / 180);
     let hexHor = Math.floor((window.innerWidth - 20) / (otherLength * 3)) - 1;
     let hexVert = Math.floor((window.innerHeight*.6) / (hexHeight) );
    let horizontalOffset = (window.innerWidth - ((hexHor + 1) * (hexWidth) * .75 - hexWidth))/2;
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
     if(goalWidth<hexMap.contents.length && goalHeight < hexMap.contents[0].length)
        hexMap.contents[goalWidth][goalHeight] = -1000;
    if(startCol<hexMap.contents.length && startHeight < hexMap.contents[0].length)
        hexMap.contents[startCol][startHeight] = 1000;

     // handles calling the requisite algorithm when the graph button is pressed
    const handleGraph = async (e) => {
        e.preventDefault();
        clearAlgorithm(hexMap, startCol, startHeight)
        // adjust the data status of stop, graph, and size toggling
        const graphButton = document.querySelector(".graphTrigger");
        if(graphButton.dataset.readonly == "true") return;
        graphButton.dataset.visibility="false";
        const sizeToggle = document.querySelector(".sizeGraph")
        sizeToggle.readonly = true;
        const stop = document.querySelector(".stopGraphing");
        stop.dataset.visibility = "true";
        stop.dataset.status = "false";
        stop.dataset.reset = "false";
        const sizeTop = document.querySelector(".size");
        sizeTop.style.backgroundColor = "#D3D3D3"
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
        hexMap.contents[startCol][startHeight] = 1000;
        stop.dataset.visibility = "false";
        graphButton.dataset.visibility="true";
        sizeToggle.readonly = false;
        sizeTop.style.backgroundColor = "white"
      };

      // sets the minimum value of the resizing slider
      const calculateMinimumHexMultiplier= () => {
        let width = window.innerWidth;
        return "1";
        if(width > 2100) return "1.25";
        else if (width > 1500) return "1";
        else if (width > 1200) return ".75";
        else if (width > 900) return ".5";
        else return ".25"
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
        clearAll(hexMap, startCol, startHeight);
    }

    const generateObstacle = async (txt) => {
        // set graphing and clearing to readonly
        const graph = document.querySelector(".graphTrigger")
        graph.dataset.readonly = "true"
        graph.style.backgroundColor="#D3D3D3";
        const setSize = document.querySelector(".size");
        setSize.style.backgroundColor="#D3D3D3";
        const sizeToggle = document.querySelector(".sizeGraph")
        sizeToggle.readonly = true;
        const stop = document.querySelector(".stopGraphing");
        stop.dataset.reset = "false";
        switch(txt) {
            case "Maze":
                await clearAll(hexMap, startCol, startHeight);
                await RecursiveDivision(hexMap, 0, 0, hexMap.contents[0].length, hexMap.contents.length, chooseSplit(hexMap.contents[0].length, hexMap.contents.length))
                break;
            case "Random Weights":
                await clearAll(hexMap, startCol, startHeight);
                await addWeights(hexMap, startCol, startHeight);
                break;
            case "Weight Maze":
                await clearAll(hexMap, startCol, startHeight);
                await weightRecursiveDivision(hexMap, 0, 0, hexMap.contents[0].length, hexMap.contents.length, chooseSplit(hexMap.contents[0].length, hexMap.contents.length))
                break;
            default: 
                break;
        }
        graph.dataset.readonly = "false"
        graph.style.backgroundColor="#eee";
        setSize.style.backgroundColor="white";
        sizeToggle.readonly = false;
        stop.dataset.reset = "true";
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
                        <p className="dropdownTop size">{window.innerWidth < 500 ? "Size":"Set Size"}</p>
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
                                    let hexWidth = 24 * 1.1547005 * sizeRef.current;
                                    let hexHeight = 24 * sizeRef.current;
                                    let otherLength = ((hexHeight + 2)/2)/Math.tan(60 * Math.PI / 180);
                                    let hexHor = Math.floor((window.innerWidth - 20) / (otherLength * 3)) - 1;
                                    let hexVert = Math.floor((window.innerHeight*.6) / (hexHeight) );
                                    let horizontalOffset = (window.innerWidth - ((hexHor + 1) * (hexWidth) * .75 - hexWidth))/2;
                                    setHexMap(new HexMap(hexVert, hexHor))
                                    let targetHeight = Math.floor((hexVert + 1)/2) - 1;
                                    let targetStartWidth = Math.floor((hexHor + 1)/4) - 1;
                                    let targetWidth = Math.floor((hexHor + 1)*3/4) - 1;
                                    if(targetStartWidth%2 != targetWidth%2) {
                                        targetWidth++;
                                    }
                                    setGoalWidth(targetWidth);
                                    setCol(targetStartWidth);
                                    setHeight(targetHeight)
                                    setGoalHeight(targetHeight)
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
                        <p className="dropdownTop">{window.innerWidth < 600 ? "Speed":"Set Speed"}</p>
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
                        {window.innerWidth < 450 ? [
                            "DFS",
                            "BFS",
                            "Dijkstra's",
                            "A*",
                        ].map((txt) => {
                            return <p onClick={(e) => setAlgorithm(txt)}>{txt}</p>;
                        }):[
                            "DFS",
                            "BFS",
                            "Dijkstra's",
                            "A* Search",
                        ].map((txt, index) => {
                            return <p key={index} onClick={(e) => setAlgorithm(txt)}>{txt}</p>;
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
                                ].map((txt, index) => {
                                    return <p key={index} onClick={(e) => setCursorEffect(txt)}>{txt}</p>;
                                })}
                                </div>
                        </div>
                    </div>
                    <div className="dropdownMedium">
                    <div className="dropdownTop obstacle">Obstacles</div>
                    <div
                                className="dropdownContent9"
                                onClick={(e) => {
                                    //nothing
                                }}
                                >
                                {[
                                    "Maze", 
                                    "Random Weights",
                                    "Weight Maze"
                                ].map((txt, index) => {
                                    return <p key={index} onClick={(e) => generateObstacle(txt)}>{txt}</p>;
                                })}
                                </div>
                </div>
                </div>
            <HexMapComponent startCol={startCol} startHeight={startHeight} goalHeight={goalHeight} goalWidth={goalWidth} map={hexMap} sizeValue={sizeValue} cursorEffect={cursorEffect} setCol = {setCol} setHeight = {setHeight} setGoalWidth={setGoalWidth} setGoalHeight={setGoalHeight} setDragProperty= {setDragProperty} dragProperty={dragProperty}/>
            <div className="info">
                <div className="startWrapper infoItem">
                    <div className="hexExample startExample"></div>
                    <p className="startDescriptor">Start Hex</p>
                </div>
                <div className="endWrapper infoItem">
                    <div className="hexExample endExample"></div>
                    <p className="endDescriptor">End Hex</p>
                </div>
                <div className="wallWrapper infoItem">
                    <div className="hexExample wallExample"></div>
                    <p className="wallDescriptor">Wall</p>
                </div>
                <div className="weightWrapper infoItem">
                    <div className="hexExample weightExample"></div>
                    <p className="weightDescriptor">Weight Hex</p>
                </div>
                <div className="visitedWrapper infoItem">
                    <div className="hexExample visitedExample"></div>
                    <p className="visitedDescriptor">Visited Hex</p>
                </div>
                <div className="pathWrapper infoItem">
                    <div className="hexExample pathExample"></div>
                    <p className="pathDescriptor">Path Hex</p>
                </div>
            </div>
        </div>
    )
}

Graph.propTypes = {

}

export default Graph
