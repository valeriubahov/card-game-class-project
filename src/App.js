import './App.css';
import LoginWindow from './Components/Login/login';
import GameDisplay from "./Components/GameDisplay/game-display"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './Components/Nav/nav';
import Result from './Components/Results/result';
import Search from './Components/Search/search';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <header className='App-header'>
            <Nav />
          </header>
          <div className="gamePage">
            <Routes>
              <Route path="/" element={<LoginWindow />}></Route>
              <Route path="/login" element={<LoginWindow />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/play" element={<GameDisplay />}></Route>
              <Route path="/game-display" element={<GameDisplay />}></Route>
              <Route path="/result" element={<Result />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
    </div >
  );
}