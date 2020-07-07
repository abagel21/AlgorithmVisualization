import React, { useRef, useEffect } from "react";

/* eslint-disable */

const SortingGrid = ({ sortableComponents, setSortableComponents }) => {
  useEffect(() => {
    topLevelElement.current.innerHTML = "";
    sortableComponents.map((sortableComponent) => {
      topLevelElement.current.appendChild(sortableComponent.div.cloneNode());
    });
    return;
  }, [sortableComponents]);
  const topLevelElement = useRef(null);
  // console.log(sortableComponents[0].div)
  return <div className="sortingSpace" ref={topLevelElement}></div>;
};

SortingGrid.propTypes = {};

export default SortingGrid;
