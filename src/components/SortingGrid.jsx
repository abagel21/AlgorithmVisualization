import React, { useRef, useEffect } from "react";
import ContentSettings from "./ContentSettings";
import copyArr from "../util/copyArr";
import createSortableComponents from "../util/createSortableComponents";

/* eslint-disable */

const SortingGrid = ({ sortableComponents, setSortableComponents, currSelected2 }) => {
  useEffect(() => {
    topLevelElement.current.innerHTML = "";
    sortableComponents.map((sortableComponent) => {
      topLevelElement.current.appendChild(sortableComponent.div.cloneNode());
    });
    return;
  }, [sortableComponents]);
  const topLevelElement = useRef(null);
  const handleReset = async (e) => {
    const stop = document.querySelector(".stopSorting")
    stop.dataset.reset = "true";
    stop.dataset.visibility = "false";
    stop.dataset.status = "false";
    stop.textContent = "Stop"
    setSortableComponents([]);
    setSortableComponents(copyArr(createSortableComponents(sortableComponents.length)));
    setTimeout(() => {
        
    }, 10000)
  };
  // console.log(sortableComponents[0].div)
  return (<div className="spaceWrapper">
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
          <div className="sortingSpace" ref={topLevelElement}>
          </div>
          <ContentSettings
          setSortableComponents={setSortableComponents}
          currSelected2 = {currSelected2}
          sortableComponents={sortableComponents}
        />
        </div>)
};

SortingGrid.propTypes = {};

export default SortingGrid;
