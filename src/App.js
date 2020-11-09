import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
                <Router>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/">
                            <Home greeting={greeting} />
                        </Route>
                    </Switch>

                    <ItemList/>

                </Router>
            </CartContext.Provider>
        </div>
    );
}

export default App;
