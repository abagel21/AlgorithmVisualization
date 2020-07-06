import React, { useState, useEffect } from "react";
import insertionSort from "../algorithms/InsertionSort";
import selectionSort from "../algorithms/SelectionSort";
import mergeSort from "../algorithms/MergeSort";
import Quicksort from "../algorithms/Quicksort";
import heapSort from "../algorithms/HeapSort";
import ThreeWayQuicksort from "../algorithms/ThreeWayQuicksort";
import Shellsort from "../algorithms/Shellsort";
import knuth from "../algorithms/KnuthShuffle";
import createSortableComponents from "../util/createSortableComponents";
import createDuplicateSortableComponents from "../util/createDuplicateSortableComponents";

const AlgorithmSettings = ({
  sortableComponents,
  setSortableComponents,
  getStop,
  getOtherStop,
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
  let speedObj = {
    speed: sliderValue,
  };
  const getSpeed = () => {
    let speedEl = document.querySelector(".speedNumber");
    let speed = speedEl.value / 6.25;
    return speed < 8
      ? 25 * (8 - speed)
      : speed === 8
      ? 25
      : (12.5 * 1) / (speed - 8);
  };
  const [currSelected, setCurrSelected] = useState("Select an algorithm");
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
              setSortableComponents,
              getStop,
              getSpeed,
              getOtherStop
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
      <div className="speedSettings">
        <label htmlFor="#speedRange" className="speedLabel">
          Set the speed of the sorting function
        </label>
        <label className="eighthx sliderLabel" htmlFor="speedRange">
          1/8x
        </label>
        <label className="onex sliderLabel" htmlFor="speedRange">
          1x
        </label>
        <label className="eightx sliderLabel" htmlFor="speedRange">
          8x
        </label>
        <input
          onChange={(e) => {
            speedObj.speed = e.target.value;
            setSliderValue(e.target.value);
          }}
          style={{ padding: "0" }}
          list="tickmarks"
          className="speedNumber"
          id="speedRange"
          type="range"
          step="6.25"
        />
      </div>
      <div className="dropdown">
        <label className = "dataTypeLabel" htmlFor="dataType">I want the data to be...</label>
        <p id = "dataType" className="dropdownTop">{currSelected2}</p>
        <div className="dropdownContent2" onClick={(e) => {}}>
          {[
            "randomized",
            "ascending",
            "descending",
            "randomized w/ duplicates",
          ].map((txt) => {
            return <p onClick={(e) => handleDataType(txt)}>{txt}</p>;
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
            "Shellsort",
            "Merge Sort",
            "Knuth Shuffle",
            "Quicksort",
            "3-Way Quicksort",
            "Heap Sort",
          ].map((txt) => {
            return <p onClick={(e) => setCurrSelected(txt)}>{txt}</p>;
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
