import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../globals/cartContext";

const Summary = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart } = useContext(CartContext);

    console.log(cart);

    useEffect(() => {
        if (cart.length > 0) {
            setTotalPrice(
                cart
                    .map((product) => product.price * product.quantity)
                    .reduce((total, valor) => total + valor)
            );
        }
    }, [cart]);

    return (
        <div className="checkout container">
            <div className="card text-center">
                <div className="card-header">
                    Resumen de productos en el carrito
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        Total: ${totalPrice}
                    </h5>
                    <Link to="/checkout" className="btn btn-primary">
                        Confirmar compra
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;
