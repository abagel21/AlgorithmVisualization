import React from 'react';
import './App.css';
import SortingSpace from './components/SortingSpace'

function App() {
  return (
    <div className="App">
      <h2 className="heading">Algorithm Visualization</h2>
      <div className = 'spaceWrapper'>
      <SortingSpace />
      </div>
    </div>
  );
}

export default App;
