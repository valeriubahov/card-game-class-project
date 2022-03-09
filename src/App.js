import './App.css';
import LoginWindow from './Components/Login/login';
import GameDisplay from "./Components/GameDisplay/game-display"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <LoginWindow />
      <Routes>
        <Route path="/GameDisplay" element={<GameDisplay/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
