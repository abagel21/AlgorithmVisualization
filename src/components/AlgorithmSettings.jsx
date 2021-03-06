import React, { useState, useEffect } from "react";
import insertionSort from "../algorithms/sorting/InsertionSort";
import selectionSort from "../algorithms/sorting/SelectionSort";
import mergeSort from "../algorithms/sorting/MergeSort";
import Quicksort from "../algorithms/sorting/Quicksort";
import heapSort from "../algorithms/sorting/HeapSort";
import ThreeWayQuicksort from "../algorithms/sorting/ThreeWayQuicksort";
import Shellsort from "../algorithms/sorting/Shellsort";
import knuth from "../algorithms/sorting/KnuthShuffle";
import createSortableComponents from "../util/createSortableComponents";
import createDuplicateSortableComponents from "../util/createDuplicateSortableComponents";
import bubbleSort from "../algorithms/sorting/BubbleSort"

/* eslint-disable */

const AlgorithmSettings = ({
  sortableComponents,
  setSortableComponents,
  currSelected2,
  setCurrSelected2,
  setAlgInfo
}) => {
  let setValue = null;
  useEffect(() => {
    setValue = document.querySelector(".settingsNumber");
  });
  useEffect(() => {
    setValue.value = 1;
  }, [setValue]);
  const [sliderValue, setSliderValue] = useState(50);
  const [currSelected, setCurrSelected] = useState("Algorithm");
  const handleDataType = async (txt) => {
    setCurrSelected2(txt);
    switch (txt) {
      case "randomized":
        setSortableComponents(
          createSortableComponents(sortableComponents.length)
        );
        break;
      case "ascending":
        setSortableComponents(
          createSortableComponents(sortableComponents.length).sort((a, b) => {
            return a.value - b.value;
          })
        );
        break;
      case "descending":
        setSortableComponents(
          createSortableComponents(sortableComponents.length).sort((a, b) => {
            return a.value - b.value;
          }).reverse()
        );
        break;
      case "randomized w/ duplicates":
        let arr = createDuplicateSortableComponents(sortableComponents.length);
        console.log(arr);
        setSortableComponents(
          arr
        );
        break;
      default:
        break;
    }
  };
  const handleSort = async (e) => {
    e.preventDefault();
    const stop = document.querySelector(".stopSorting");
    stop.dataset.visibility = "true";
    stop.dataset.reset = "false";
    stop.dataset.status = "false";
    let res;
    switch (currSelected) {
      case "Insertion Sort":
        res = await new Promise((resolve, reject) => {
          resolve(
            insertionSort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Selection Sort":
        res = await new Promise((resolve, reject) => {
          resolve(
            selectionSort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        if (stop.dataset.status === "false") stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Bubble Sort":
        res = await new Promise((resolve, reject) => {
          resolve(
            bubbleSort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        if (stop.dataset.status === "false") stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Merge Sort":
        res = await new Promise((resolve, reject) => {
          resolve(
            mergeSort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        setSortableComponents(res);
        break;
      case "Knuth Shuffle":
        res = await new Promise((resolve, reject) => {
          resolve(
            knuth(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Quicksort":
        res = await new Promise((resolve, reject) => {
          resolve(
            Quicksort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "3-Way Quicksort":
        res = await new Promise((resolve, reject) => {
          resolve(
            ThreeWayQuicksort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Shellsort":
        res = await new Promise((resolve, reject) => {
          resolve(
            Shellsort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      case "Heap Sort":
        res = await new Promise((resolve, reject) => {
          resolve(
            heapSort(
              sortableComponents,
              setSortableComponents
            )
          );
        });
        stop.dataset.visibility = "false";
        if (res) setSortableComponents(res);
        break;
      default:
        return;
    }
  };
  return (
    <div className="settings">
      <div className="dropdown">
        <p className="dropdownTop">{window.innerWidth < 500 ? "Speed":"Set Speed"}</p>
        <div className="dropdownContent3">
          <div className="dc3Wrapper">
            <input
              onChange={(e) => {
                setSliderValue(e.target.value);
              }}
              style={{ padding: "0" }}
              list="tickmarks"
              className="speedSorting"
              id="speedRange"
              type="range"
              step="6.25"
            />
        </div>
        </div>
      </div>
      <div className="dropdown">
        <p id = "dataType" className="dropdownTop">{currSelected2}</p>
        <div className="dropdownContent2" onClick={(e) => {}}>
          {[
            "randomized",
            "ascending",
            "descending",
            "randomized w/ duplicates",
          ].map((txt, index) => {
            return <p key={index} onClick={(e) => handleDataType(txt)}>{txt}</p>;
          })}
        </div>
      </div>
      <div className="dropdown">
        <p className="dropdownTop">{currSelected}</p>
        <div
          className="dropdownContent"
          onClick={(e) => {
            //also dropdown?
          }}
        >
          {[
            "Insertion Sort",
            "Selection Sort",
            "Bubble Sort",
            "Shellsort",
            "Merge Sort",
            "Knuth Shuffle",
            "Quicksort",
            "3-Way Quicksort",
            "Heap Sort",
          ].map((txt, index) => {
            return <p key={index} onClick={(e) => setCurrSelected(txt)}>{txt}</p>;
          })}
        </div>
      </div>
      <div className="sort" onClick={(e) => handleSort(e)}>
        Sort
      </div>
    </div>
  );
};

AlgorithmSettings.propTypes = {};

export default AlgorithmSettings;
