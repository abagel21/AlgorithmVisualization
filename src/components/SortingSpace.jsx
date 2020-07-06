import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SortingGrid from "./SortingGrid";
import ContentSettings from "./ContentSettings";
import createSortableComponents from "../util/createSortableComponents";
import AlgorithmSettings from "./AlgorithmSettings";
import copyArr from "../util/copyArr";
import { set } from "lodash";

const SortingSpace = (props) => {
  useEffect(() => {
    setRenderedArray(createSortableComponents(30));
  }, []);
  //for array of components to be sorted
  const [renderedArray, setRenderedArray] = useState([]);
  //for type of data (randomized, ascending, descending, etc)
  const [currSelected2, setCurrSelected2] = useState("randomized");
  //for information an algorithm specifies at run time (such as shuffling vs sorting for quicksort)
  const [algInfo, setAlgInfo] = useState("Using Knuth Shuffle for Probabilistic Guarantee of Speed");
  function getStop() {
    const stop = document.querySelector(".stopSorting")
    return stop.dataset.status === "true";
  }
  function getOtherStop() {
    const stop = document.querySelector(".stopSorting")
    return stop.dataset.reset === "true";
  }
  const handleReset = async (e) => {
    const stop = document.querySelector(".stopSorting")
    stop.dataset.reset = "true";
    stop.dataset.visibility = "false";
    stop.dataset.status = "false";
    stop.textContent = "Stop"
    setRenderedArray([]);
    setRenderedArray(copyArr(createSortableComponents(renderedArray.length)));
    setTimeout(() => {
        
    }, 10000)
  };
  return (
    <div className="sortingWrapper">
      <AlgorithmSettings
        sortableComponents={renderedArray}
        setSortableComponents={setRenderedArray}
        getStop={getStop}
        getOtherStop={getOtherStop}
        currSelected2 = {currSelected2}
        setCurrSelected2 = {setCurrSelected2}
        setAlgInfo = {setAlgInfo}
      />
      <div className="stopSorting" data-status = "false" data-visibility = "false" data-reset = "false" onClick={(e) => {
        if(e.target.dataset.status === "true") {
          e.target.dataset.status = "false";
          e.target.textContent = "Stop";
        } else {
          e.target.dataset.status = "true";
          e.target.textContent = "Start";
        }
      }}>
        Stop
      </div>
      <div className="resetSorting" onClick={(e) => handleReset(e)}>
        Reset
      </div>
    <div className="algorithmInformation">{algInfo}</div>
      <SortingGrid
        sortableComponents={renderedArray}
        setSortableComponents={setRenderedArray}
      />

      <ContentSettings
        setSortableComponents={setRenderedArray}
        currSelected2 = {currSelected2}
        sortableComponents={renderedArray}
      />
    </div>
  );
};

SortingSpace.propTypes = {};

export default SortingSpace;
