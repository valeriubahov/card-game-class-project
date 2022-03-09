import './App.css';
import LoginWindow from './Components/Login/login';
import GameDisplay from "./Components/GameDisplay/game-display"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './Components/Nav/nav';
import UserSearch from './Components/UserSearch/user-search';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className='App-header'>
          <Nav />
        </header>
        <div className="gamePage">
          <Routes>
            <Route path="/" element={<LoginWindow />}></Route>
            <Route path="/login" element={<LoginWindow />}></Route>
            <Route path="/game-display" element={<GameDisplay />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;