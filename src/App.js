import React from 'react';
import logo from './logo.svg';
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from "./components/Home/Home";

function App() {
    const greeting = "Bienvenido a React Store :)";
  return (
    <div className="App">
      <NavBar/>
      <Home gretting={greeting}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
