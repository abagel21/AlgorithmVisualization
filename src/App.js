import React, {useState} from 'react';
import './App.css';
import AlgorithmPage from './components/AlgorithmPage';
import AlgorithmNavigation from "./components/AlgorithmNavigation";

function App() {
  const [selected, setSelected] = useState("Sorting");
  return (
    <div className="App">
      <AlgorithmNavigation setSelected={setSelected} />
      <AlgorithmPage selected={selected}/>
    </div>
  );
}

export default App;
