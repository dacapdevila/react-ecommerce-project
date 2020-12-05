import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase, { FirebaseContext } from './firebase';
import useAuthentication from "./hooks/useAuthentication";
import CartContext from "./globals/cartContext";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar/NavBar';
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import Categories from "./pages/Categories/Categories";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact/Contact";
import CheckOut from "./pages/CheckOut/CheckOut";

function App() {
    const greeting = "Bienvenido a React Store :)";
    const [ qnt, setQnt ] = useState(0);
    const [ cart, setCart ] = useState([]);
    const user = useAuthentication();
    console.log('User');
    console.log(user);

    return (
        <div className="App">
            <FirebaseContext.Provider value={{ firebase, user }}>
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
                            <Route path="/categories/:categoryId">
                                <Categories />
                            </Route>
                            <Route path="/checkout">
                                <CheckOut />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/contact">
                                <Contact />
                            </Route>
                            <Route>
                                <Cart />
                            </Route>
                        </Switch>
                    </Router>
                </CartContext.Provider>
            </FirebaseContext.Provider>
        </div>
    );
}

export default App;
