import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from "./components/Home/Home";
import ItemList from "./components/ItemList/ItemList";
import CartContext from "./globals/cartContext";

function App() {
    const greeting = "Bienvenido a React Store :)";
    const [qnt, setQnt] = useState(0);
    const [cart, setCart] = useState([]);

    return (
        <div className="App">
            <CartContext.Provider value={{ qnt, setQnt, cart, setCart }}>
                <NavBar/>
                <Home gretting={greeting}/>
                <ItemList/>
            </CartContext.Provider>
        </div>
    );
}

export default App;
