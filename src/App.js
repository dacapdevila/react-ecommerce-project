import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import Categories from "./pages/Categories/Categories";
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
                        <Route path="/item/:id">
                            <ItemDetailPage />
                        </Route>
                        {/*<Route path="/categories/:categoryId">*/}
                        {/*    <Categories />*/}
                        {/*</Route>*/}
                        <Route>
                            <Cart />
                        </Route>
                    </Switch>

                </Router>
            </CartContext.Provider>
        </div>
    );
}

export default App;
