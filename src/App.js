import logo from './logo.svg';
import './App.css';
import LoginWindow from './Components/Login/login';
import UserSearch from './Components/UserSearch/user-search';

function App() {
  return (
    <div className="App">
      <LoginWindow />
      <UserSearch />
    </div>
  );
}

export default App;
