import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <ul id="button">
                <li>
                    <a href="#">
                        Inicio
                    </a>
                </li>
                <li>
                    <a href="#">
                        Sobre nosotros
                    </a>
                </li>
                <li>
                    <a href="#">
                        Servicios
                    </a>
                </li>
                <li>
                    <a href="#">
                        Productos
                    </a>
                </li>
                <li>
                    <a href="#">
                        Contacto
                    </a>
                </li>
            </ul>
        );
    }
}

export default NavBar;
