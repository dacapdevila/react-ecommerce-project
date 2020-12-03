import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import CartIcon from "../CartIcon/CartIcon";

class NavBar extends Component {
    render() {
        return (
            <ul id="button">
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
                    <Link to="/register">
                        Crear Cuenta
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        Iniciar sesión
                    </Link>
                </li>
                <li>
                    <Link to="/contact">
                        Contacto
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
