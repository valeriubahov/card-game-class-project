import './App.css';
import LoginWindow from './Components/Login/login';
import GameDisplay from "./Components/GameDisplay/game-display"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import UserSearch from './Components/UserSearch/user-search';

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<LoginWindow/>}></Route>
        <Route path="/game-display" element={<GameDisplay/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
