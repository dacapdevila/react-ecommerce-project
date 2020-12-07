import React, { useContext } from "react";
import CartContext from "../../globals/cartContext";
import CartTable from "../../components/CartTable/CartTable";
import Summary from "../../components/Summary/Summary";
import CartMessage from "../../components/CartMessage/CartMessage";

const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart">
            { cart.length === 0 ? (
                <CartMessage />
            ) : (
                <div>
                    <CartTable />
                    <Summary />
                </div>
            )}
        </div>
    );
};

export default Cart;

