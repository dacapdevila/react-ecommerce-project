import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";


const CartIcon = () => {
    return (
        <Badge badgeContent="0" color="secondary">
            <ShoppingCartIcon fontSize="large" />
        </Badge>
    );
}

export default CartIcon;
