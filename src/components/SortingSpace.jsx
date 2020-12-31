import React, { useState, useEffect } from "react";
import SortingGrid from "./SortingGrid";
import createSortableComponents from "../util/createSortableComponents";
import AlgorithmSettings from "./AlgorithmSettings";
import copyArr from "../util/copyArr";

/* eslint-disable */

const SortingSpace = ({selected}) => {
  useEffect(() => {
    setRenderedArray(createSortableComponents(30));
  }, []);
  //for array of components to be sorted
  const [renderedArray, setRenderedArray] = useState([]);
  //for type of data (randomized, ascending, descending, etc)
  const [currSelected2, setCurrSelected2] = useState("randomized");
  //for information an algorithm specifies at run time (such as shuffling vs sorting for quicksort)
  const [algInfo, setAlgInfo] = useState("Using Knuth Shuffle First for Probabilistic Guarantee of Speed");
  // function getStop() {
  //   const stop = document.querySelector(".stopSorting")
  //   return stop.dataset.status === "true";
  // }
  // function getOtherStop() {
  //   const stop = document.querySelector(".stopSorting")
  //   return stop.dataset.reset === "true";
  // }
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
      <div className="topBar" data-status={selected == "Sorting" ? "sortingSettings" : "false"}>
        <AlgorithmSettings
          sortableComponents={renderedArray}
          setSortableComponents={setRenderedArray}
          currSelected2 = {currSelected2}
          setCurrSelected2 = {setCurrSelected2}
          setAlgInfo = {setAlgInfo}
        />
      </div>
      
    <div className="algorithmInformation">{algInfo}</div>
    <div className="flexWrapper">
        <SortingGrid
          sortableComponents={renderedArray}
          setSortableComponents={setRenderedArray}
          currSelected2={currSelected2}
        />
      </div>
    </div>
  );
};

SortingSpace.propTypes = {};

export default SortingSpace;
