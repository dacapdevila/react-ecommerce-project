import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import CartIcon from "../CartIcon/CartIcon";

class NavBar extends Component {
    render() {
        return (
            <ul id="button">
                <li>

                </li>
                <li>
                    <Link to="/">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Productos
                    </Link>
                </li>
                <li>
                    <Link to="/cart">
                        <CartIcon />
                    </Link>
                </li>
            </ul>
        );
    }
}

export default NavBar;
