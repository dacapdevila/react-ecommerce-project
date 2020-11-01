import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemCount from './components/ItemCount/ItemCount';
import Home from "./components/Home/Home";

function App() {
    const greeting = "Bienvenido a React Store :)";
    const [quantity, setQuantity] = useState(1);

    return (
    <div className="App">
      <NavBar/>
      <Home gretting={greeting}/>
      <ItemCount
          initial={1} // valor de inicio del contador
          min={0} // valor minimo permitido
          max={10}  // valor maximo permitido -> esto deberia ser el stock de cada producto
          setQuantity={setQuantity}
      />

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
