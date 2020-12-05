import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import CartIcon from "../CartIcon/CartIcon";
import { FirebaseContext } from '../../firebase';

const NavBar = () => {

    const { user, firebase } = useContext( FirebaseContext );

    return(
        <ul id="button">
            {user ? (
                <li style={{ color: "white", fontWeight: "700"}}>
                    Hola {user.displayName}
                </li>
            ) : (
                <li></li>
            )}
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
            { user ? (
                <li style={{ color: "white" }} onClick={ () => firebase.logoutUser() }>
                    <Link to="/">
                        Cerrar sesión
                    </Link>
                </li>
            ) : (
                <>
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
                </>
            )}
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

export default NavBar;
