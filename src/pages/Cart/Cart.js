import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartTable from "../../components/CartTable/CartTable";
import Checkout from "../../components/CheckOut/CheckOut";
import CartContext from "../../globals/cartContext";

const Cart = () => {
    const { cart } = useContext(CartContext);

    const messageConditional = (
        <div className="card text-center cart-message">
            <div className="card-header">
                El carrito esta vacio
            </div>
            <div className="card-body">
                <p className="card-text">
                    Agrega productos y luego podrás finalizar la compra
                </p>
                <Link to="/" className="btn btn-primary">
                    Ir al home para continuar comprando
                </Link>
            </div>
        </div>
    );

    return (
        <div className="cart">
            {cart.length === 0 ? (
                messageConditional
            ) : (
                <div>
                    <CartTable />
                    <Checkout />
                </div>
            )}
        </div>
    );
};

export default Cart;
