import React, {useState} from 'react';
import './App.css';
import AlgorithmPage from './components/AlgorithmPage';
import AlgorithmNavigation from "./components/AlgorithmNavigation";
import IntroModal from "./components/IntroModal"

function App() {
  const [selected, setSelected] = useState("Sorting");
  return (
    <div className="App">
      <IntroModal/>
      <AlgorithmNavigation setSelected={setSelected} selected={selected}/>
      <AlgorithmPage selected={selected}/>
    </div>
  );
}

export default App;
