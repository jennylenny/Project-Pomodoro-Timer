import React from "react";
import './App.css';
import Pomodoro from './pomodoro/Pomodoro'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://images.wallpaperscraft.com/image/tomatoes_tomato_vegetables_harvest_116462_3840x2160.jpg" alt="Tomato Timer" className="App-logo" />
          <Pomodoro/>
      </header>
      
    </div>
  );
}

export default App;