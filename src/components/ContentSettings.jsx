import React, { useEffect, useState } from "react";
import createSortableComponents from "../util/createSortableComponents";
import createDuplicateSortableComponents from "../util/createDuplicateSortableComponents"
/* eslint-disable */

const ContentSettings = ({
  setSortableComponents,
  sortableComponents,
  currSelected2,
}) => {
  let setValue = null;
  useEffect(() => {
    setValue = document.querySelector(".settingsNumber");
  });
  useEffect(() => {
    setValue.value =
      2 +
      Math.floor(
        (Math.floor((window.innerWidth - window.innerWidth * 0.1) / 18) - 2) / 2
      );
  }, [setValue]);
  const [sliderValue, setSliderValue] = useState(
    2 +
      Math.floor(
        (Math.floor((window.innerWidth - window.innerWidth * 0.1) / 18) - 2) / 2
      )
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const stop = document.querySelector(".stopSorting");
    stop.dataset.reset = true;
    if (setValue.value < (window.innerWidth - window.innerWidth * 0.1) / 18) {
      switch (currSelected2) {
        case "randomized":
          setSortableComponents(
            createSortableComponents(sliderValue)
          );
          break;
        case "ascending":
          setSortableComponents(
            createSortableComponents(sliderValue).sort((a, b) => {
              return a.value - b.value;
            })
          );
          break;
        case "descending":
          setSortableComponents(
            createSortableComponents(sliderValue)
              .sort((a, b) => {
                return a.value - b.value;
              })
              .reverse()
          );
          break;
        case "randomized w/ duplicates":
          let arr = createDuplicateSortableComponents(
            sliderValue
          );
          console.log(arr);
          setSortableComponents(arr);
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="contentSettings" onSubmit={(e) => onSubmit(e)}>
      <form action="" className="settingsForm">
        {/* <label className="settingsNumberLabel" htmlFor="#settingsRange">
          Set the number of elements
        </label> */}
        <label className="numberLabel" htmlFor="#settingsRange">
          {sliderValue}
        </label>
        <input
          onChange={(e) => {
            setSliderValue(setValue.value);
          }}
          style={{ padding: "0" }}
          className="settingsNumber"
          id="settingsRange"
          type="range"
          min="3"
          max={Math.floor((window.innerWidth - window.innerWidth * 0.1) / 18)}
        />
        <button className="settingsSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContentSettings;
