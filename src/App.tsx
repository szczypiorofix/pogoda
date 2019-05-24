import React from 'react';
import './App.css';
import Mainheader from './components/Mainheader'
import Othercities from './components/Othercities'
import Currentcity from './components/Currentcity'




function App() {
  return (
    
    <div className="App">
        <Mainheader />
        <Othercities />
        <Currentcity />
    </div>
    
  );
}

export default App;
