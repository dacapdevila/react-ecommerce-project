import React, { Component } from 'react';
import './NavBar.css';
import CartIcon from "../CartIcon/CartIcon";

class NavBar extends Component {
    render() {
        return (
            <ul id="button">
                <li>

                </li>
                <li>
                    <a href="#">
                        Inicio
                    </a>
                </li>
                <li>
                    <a href="#">
                        Productos
                    </a>
                </li>
                <li>
                    <a href="#">
                        <CartIcon/>
                    </a>
                </li>
            </ul>
        );
    }
}

export default NavBar;
