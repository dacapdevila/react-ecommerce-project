import React, { useState, useEffect, useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import Item from "../Item/Item";
import CartContext from "../../globals/cartContext";
import { Button } from "@material-ui/core";

const ItemDetail = ({ product }) => {
    const { setCart, setQnt } = useContext(CartContext);
    const [article, setArticle] = useState();

    useEffect(() => {
        setArticle(product);
    }, [product]);

    const style = {
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    };

    const [quantity, setQuantity] = useState(1);

    const handleClick = () => {
        setQnt((value) => value + quantity);
        article.quantity = quantity;

        const prod = {
            id: article.id,
            name: article.name,
            description: article.description,
            image: article.image,
            stock: article.stock,
            price: article.price,
            quantity: article.quantity
        };

        setCart((value) => [...value, prod]);
    };

    return (
        <div style={style} className="item-detail">
            <Item product={product} />
            <ItemCount
                initial={1}
                min={0}
                max={product.stock}
                setQuantity={setQuantity}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                className="item-detail__btn"
            >
                Comprar {quantity} {quantity > 1 ? 'unidades' : 'unidad' } de {product.name}
            </Button>
        </div>
    );
};

export default ItemDetail;
